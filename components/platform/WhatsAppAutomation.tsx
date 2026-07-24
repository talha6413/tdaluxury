"use client";

import {
  BellRing,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageCircle,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Smartphone,
  Trash2,
  Users,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./WhatsAppAutomation.module.css";

type QueueStatus = "pending" | "opened" | "sent" | "cancelled" | "failed";

type Template = {
  id: string;
  template_key: string;
  name: string;
  category: string;
  message: string;
  active: boolean;
};

type Rule = {
  id: string;
  rule_key: string;
  name: string;
  description: string | null;
  template_key: string;
  trigger_type: string;
  trigger_offset_minutes: number;
  active: boolean;
};

type QueueItem = {
  id: string;
  customer_id: string | null;
  appointment_id: string | null;
  phone: string;
  customer_name: string;
  message: string;
  category: string;
  status: QueueStatus;
  scheduled_for: string;
  opened_at: string | null;
  sent_at: string | null;
  error_message: string | null;
  created_at: string;
};

type Customer = {
  id: string;
  full_name: string;
  phone: string;
};

const statusLabels: Record<QueueStatus, string> = {
  pending: "Bekliyor",
  opened: "WhatsApp açıldı",
  sent: "Gönderildi",
  cancelled: "İptal",
  failed: "Hata",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function localDateTimeInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 16);
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("90")) return digits;
  if (digits.startsWith("0")) return `9${digits}`;
  if (digits.length === 10) return `90${digits}`;
  return digits;
}

function buildWhatsAppUrl(phone: string, message: string) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppAutomation() {
  const [tab, setTab] = useState<"queue" | "templates" | "rules">("queue");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | QueueStatus>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"new" | "template" | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [messageForm, setMessageForm] = useState({
    customer_id: "",
    phone: "",
    customer_name: "",
    template_key: "campaign",
    message: "",
    scheduled_for: localDateTimeInput(),
  });

  const [templateForm, setTemplateForm] = useState({
    name: "",
    category: "general",
    message: "",
    active: true,
  });

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const [templateResult, ruleResult, queueResult, customerResult] =
        await Promise.all([
          supabase
            .from("whatsapp_templates")
            .select("id, template_key, name, category, message, active")
            .order("name"),
          supabase
            .from("whatsapp_automation_rules")
            .select(
              "id, rule_key, name, description, template_key, trigger_type, trigger_offset_minutes, active"
            )
            .order("name"),
          supabase
            .from("whatsapp_message_queue")
            .select(
              "id, customer_id, appointment_id, phone, customer_name, message, category, status, scheduled_for, opened_at, sent_at, error_message, created_at"
            )
            .order("scheduled_for", { ascending: false })
            .limit(300),
          supabase
            .from("customers")
            .select("id, full_name, phone")
            .eq("active", true)
            .order("full_name"),
        ]);

      const firstError =
        templateResult.error ||
        ruleResult.error ||
        queueResult.error ||
        customerResult.error;

      if (firstError) throw firstError;

      setTemplates((templateResult.data || []) as Template[]);
      setRules((ruleResult.data || []) as Rule[]);
      setQueue((queueResult.data || []) as QueueItem[]);
      setCustomers((customerResult.data || []) as Customer[]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "WhatsApp kayıtları yüklenemedi."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const totals = useMemo(() => {
    return {
      pending: queue.filter((item) => item.status === "pending").length,
      opened: queue.filter((item) => item.status === "opened").length,
      sent: queue.filter((item) => item.status === "sent").length,
      activeRules: rules.filter((item) => item.active).length,
    };
  }, [queue, rules]);

  const filteredQueue = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");

    return queue.filter((item) => {
      const statusMatch = status === "all" || item.status === status;
      const haystack = `${item.customer_name} ${item.phone} ${item.message}`
        .toLocaleLowerCase("tr-TR");
      return statusMatch && (!normalized || haystack.includes(normalized));
    });
  }, [queue, query, status]);

  function openNewMessage() {
    const campaignTemplate = templates.find(
      (item) => item.template_key === "campaign"
    );

    setMessageForm({
      customer_id: "",
      phone: "",
      customer_name: "",
      template_key: campaignTemplate?.template_key || "",
      message: campaignTemplate?.message || "",
      scheduled_for: localDateTimeInput(),
    });
    setError("");
    setModal("new");
  }

  function selectCustomer(customerId: string) {
    const selected = customers.find((item) => item.id === customerId);
    setMessageForm((current) => ({
      ...current,
      customer_id: customerId,
      phone: selected?.phone || "",
      customer_name: selected?.full_name || "",
    }));
  }

  function selectMessageTemplate(templateKey: string) {
    const selected = templates.find((item) => item.template_key === templateKey);
    setMessageForm((current) => ({
      ...current,
      template_key: templateKey,
      message: selected?.message || "",
    }));
  }

  async function saveMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !messageForm.phone.trim() ||
      !messageForm.customer_name.trim() ||
      !messageForm.message.trim()
    ) {
      setError("Müşteri adı, telefon ve mesaj zorunludur.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = getSupabaseBrowserClient();
    const selected = templates.find(
      (item) => item.template_key === messageForm.template_key
    );

    const { error: insertError } = await supabase
      .from("whatsapp_message_queue")
      .insert([
        {
          customer_id: messageForm.customer_id || null,
          phone: messageForm.phone.trim(),
          customer_name: messageForm.customer_name.trim(),
          message: messageForm.message.trim(),
          category: selected?.category || "general",
          status: "pending",
          scheduled_for: new Date(messageForm.scheduled_for).toISOString(),
        },
      ] as never[]);

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setModal(null);
    await load(true);
  }

  async function openWhatsApp(item: QueueItem) {
    window.open(buildWhatsAppUrl(item.phone, item.message), "_blank", "noopener,noreferrer");

    const supabase = getSupabaseBrowserClient();
    await supabase
      .from("whatsapp_message_queue")
      .update({
        status: "opened",
        opened_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", item.id);

    await load(true);
  }

  async function markSent(item: QueueItem) {
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("whatsapp_message_queue")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await load(true);
  }

  async function cancelMessage(item: QueueItem) {
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("whatsapp_message_queue")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await load(true);
  }

  async function toggleRule(rule: Rule) {
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("whatsapp_automation_rules")
      .update({
        active: !rule.active,
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", rule.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await load(true);
  }

  function openTemplate(template: Template) {
    setSelectedTemplate(template);
    setTemplateForm({
      name: template.name,
      category: template.category,
      message: template.message,
      active: template.active,
    });
    setModal("template");
    setError("");
  }

  async function saveTemplate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTemplate || !templateForm.name.trim() || !templateForm.message.trim()) {
      setError("Şablon adı ve mesaj zorunludur.");
      return;
    }

    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("whatsapp_templates")
      .update({
        name: templateForm.name.trim(),
        category: templateForm.category.trim() || "general",
        message: templateForm.message.trim(),
        active: templateForm.active,
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", selectedTemplate.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setModal(null);
    setSelectedTemplate(null);
    await load(true);
  }

  return (
    <PlatformShell title="WhatsApp Otomasyon Merkezi">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              <MessageCircle size={15} />
              TDA Communication
            </span>
            <h1>Mesajları tek merkezden yönet</h1>
            <p>
              Randevu, ödeme, doğum günü ve kampanya mesajlarını sıraya al;
              WhatsApp Web üzerinden aç, gönderimi işaretle ve geçmişi takip et.
            </p>
          </div>
          <div className={styles.heroActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => void load(true)}
              disabled={refreshing}
            >
              <RefreshCw size={17} className={refreshing ? styles.spin : ""} />
              Yenile
            </button>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={openNewMessage}
            >
              <Send size={17} />
              Yeni mesaj
            </button>
          </div>
        </section>

        {error ? <div className={styles.error}>{error}</div> : null}

        <section className={styles.metrics}>
          <article>
            <Clock3 size={20} />
            <span>Bekleyen</span>
            <strong>{loading ? "—" : totals.pending}</strong>
          </article>
          <article>
            <Smartphone size={20} />
            <span>WhatsApp açıldı</span>
            <strong>{loading ? "—" : totals.opened}</strong>
          </article>
          <article>
            <CheckCircle2 size={20} />
            <span>Gönderildi</span>
            <strong>{loading ? "—" : totals.sent}</strong>
          </article>
          <article>
            <BellRing size={20} />
            <span>Aktif otomasyon</span>
            <strong>{loading ? "—" : totals.activeRules}</strong>
          </article>
        </section>

        <section className={styles.panel}>
          <div className={styles.tabs}>
            <button
              className={tab === "queue" ? styles.activeTab : ""}
              type="button"
              onClick={() => setTab("queue")}
            >
              Mesaj kuyruğu
            </button>
            <button
              className={tab === "templates" ? styles.activeTab : ""}
              type="button"
              onClick={() => setTab("templates")}
            >
              Şablonlar
            </button>
            <button
              className={tab === "rules" ? styles.activeTab : ""}
              type="button"
              onClick={() => setTab("rules")}
            >
              Otomasyonlar
            </button>
          </div>

          {tab === "queue" ? (
            <>
              <div className={styles.filters}>
                <label className={styles.searchBox}>
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Müşteri, telefon veya mesaj ara"
                  />
                </label>
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "all" | QueueStatus)
                  }
                >
                  <option value="all">Tüm durumlar</option>
                  <option value="pending">Bekliyor</option>
                  <option value="opened">WhatsApp açıldı</option>
                  <option value="sent">Gönderildi</option>
                  <option value="cancelled">İptal</option>
                  <option value="failed">Hata</option>
                </select>
              </div>

              <div className={styles.queueList}>
                {loading ? (
                  <div className={styles.empty}>
                    <LoaderCircle size={22} className={styles.spin} />
                    Kayıtlar yükleniyor...
                  </div>
                ) : filteredQueue.length ? (
                  filteredQueue.map((item) => (
                    <article className={styles.queueCard} key={item.id}>
                      <div className={styles.queueMain}>
                        <div className={styles.avatar}>
                          <Users size={19} />
                        </div>
                        <div>
                          <div className={styles.queueTitle}>
                            <strong>{item.customer_name}</strong>
                            <span className={`${styles.status} ${styles[item.status]}`}>
                              {statusLabels[item.status]}
                            </span>
                          </div>
                          <span className={styles.phone}>{item.phone}</span>
                          <p>{item.message}</p>
                          <small>
                            Planlanan: {formatDate(item.scheduled_for)}
                          </small>
                        </div>
                      </div>

                      <div className={styles.queueActions}>
                        <button
                          type="button"
                          onClick={() => void openWhatsApp(item)}
                          disabled={item.status === "cancelled"}
                        >
                          <MessageCircle size={16} />
                          WhatsApp aç
                        </button>
                        <button
                          type="button"
                          onClick={() => void markSent(item)}
                          disabled={item.status === "sent" || item.status === "cancelled"}
                        >
                          <CheckCircle2 size={16} />
                          Gönderildi
                        </button>
                        <button
                          className={styles.dangerButton}
                          type="button"
                          onClick={() => void cancelMessage(item)}
                          disabled={item.status === "cancelled"}
                        >
                          <Trash2 size={16} />
                          İptal
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className={styles.empty}>Bu filtreye uygun mesaj bulunamadı.</div>
                )}
              </div>
            </>
          ) : null}

          {tab === "templates" ? (
            <div className={styles.cardGrid}>
              {templates.map((template) => (
                <article className={styles.templateCard} key={template.id}>
                  <div>
                    <span>{template.category}</span>
                    <h3>{template.name}</h3>
                  </div>
                  <p>{template.message}</p>
                  <button type="button" onClick={() => openTemplate(template)}>
                    <Settings2 size={16} />
                    Düzenle
                  </button>
                </article>
              ))}
            </div>
          ) : null}

          {tab === "rules" ? (
            <div className={styles.ruleList}>
              {rules.map((rule) => (
                <article className={styles.ruleCard} key={rule.id}>
                  <div>
                    <h3>{rule.name}</h3>
                    <p>{rule.description || "Açıklama bulunmuyor."}</p>
                    <small>
                      Tetikleyici: {rule.trigger_type} · Ofset:{" "}
                      {rule.trigger_offset_minutes} dakika
                    </small>
                  </div>
                  <button
                    className={rule.active ? styles.activeRule : styles.passiveRule}
                    type="button"
                    onClick={() => void toggleRule(rule)}
                  >
                    {rule.active ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                    {rule.active ? "Aktif" : "Pasif"}
                  </button>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>

      {modal === "new" ? (
        <div className={styles.modalBackdrop}>
          <form className={styles.modal} onSubmit={saveMessage}>
            <div className={styles.modalHeader}>
              <div>
                <span>Yeni mesaj</span>
                <h2>Mesaj kuyruğuna ekle</h2>
              </div>
              <button type="button" onClick={() => setModal(null)}>
                ×
              </button>
            </div>

            <label>
              Müşteri
              <select
                value={messageForm.customer_id}
                onChange={(event) => selectCustomer(event.target.value)}
              >
                <option value="">Müşteri seç veya manuel gir</option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.full_name} — {customer.phone}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.twoColumns}>
              <label>
                Müşteri adı
                <input
                  value={messageForm.customer_name}
                  onChange={(event) =>
                    setMessageForm((current) => ({
                      ...current,
                      customer_name: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Telefon
                <input
                  value={messageForm.phone}
                  onChange={(event) =>
                    setMessageForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <label>
              Şablon
              <select
                value={messageForm.template_key}
                onChange={(event) => selectMessageTemplate(event.target.value)}
              >
                {templates
                  .filter((item) => item.active)
                  .map((template) => (
                    <option value={template.template_key} key={template.id}>
                      {template.name}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Mesaj
              <textarea
                rows={6}
                value={messageForm.message}
                onChange={(event) =>
                  setMessageForm((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Planlanan zaman
              <input
                type="datetime-local"
                value={messageForm.scheduled_for}
                onChange={(event) =>
                  setMessageForm((current) => ({
                    ...current,
                    scheduled_for: event.target.value,
                  }))
                }
              />
            </label>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setModal(null)}>
                Vazgeç
              </button>
              <button type="submit" disabled={saving}>
                {saving ? <LoaderCircle size={17} className={styles.spin} /> : <Send size={17} />}
                Kuyruğa ekle
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {modal === "template" && selectedTemplate ? (
        <div className={styles.modalBackdrop}>
          <form className={styles.modal} onSubmit={saveTemplate}>
            <div className={styles.modalHeader}>
              <div>
                <span>Mesaj şablonu</span>
                <h2>{selectedTemplate.name}</h2>
              </div>
              <button type="button" onClick={() => setModal(null)}>
                ×
              </button>
            </div>

            <label>
              Şablon adı
              <input
                value={templateForm.name}
                onChange={(event) =>
                  setTemplateForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Kategori
              <input
                value={templateForm.category}
                onChange={(event) =>
                  setTemplateForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Mesaj
              <textarea
                rows={7}
                value={templateForm.message}
                onChange={(event) =>
                  setTemplateForm((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
              />
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={templateForm.active}
                onChange={(event) =>
                  setTemplateForm((current) => ({
                    ...current,
                    active: event.target.checked,
                  }))
                }
              />
              Şablon aktif
            </label>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setModal(null)}>
                Vazgeç
              </button>
              <button type="submit" disabled={saving}>
                {saving ? <LoaderCircle size={17} className={styles.spin} /> : <CheckCircle2 size={17} />}
                Kaydet
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </PlatformShell>
  );
}
