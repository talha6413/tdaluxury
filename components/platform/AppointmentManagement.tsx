"use client";

import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Clock3,
  DoorOpen,
  LoaderCircle,
  RefreshCw,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./AppointmentManagement.module.css";

type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

type Customer = {
  id: string;
  full_name: string;
  phone: string;
};

type Service = {
  id: string;
  title: string;
  duration: string;
};

type Staff = {
  id: string;
  display_name: string;
  title: string;
};

type Room = {
  id: string;
  name: string;
};

type Appointment = {
  id: string;
  customer_id: string;
  staff_id: string | null;
  service_id: string | null;
  room_id: string | null;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  notes: string;
  customers: { full_name: string; phone: string } | null;
  services: { title: string } | null;
  staff_members: { display_name: string } | null;
  treatment_rooms: { name: string } | null;
};

type AppointmentForm = {
  customer_id: string;
  service_id: string;
  staff_id: string;
  room_id: string;
  date: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  notes: string;
};

const initialForm: AppointmentForm = {
  customer_id: "",
  service_id: "",
  staff_id: "",
  room_id: "",
  date: "",
  time: "",
  duration: "60",
  status: "pending",
  notes: "",
};

const statusLabels: Record<AppointmentStatus, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  completed: "Tamamlandı",
  cancelled: "İptal",
  no_show: "Gelmedi",
};

function dayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

function parseDuration(value: string) {
  const match = value.match(/\d+/);
  return match ? Math.max(15, Number(match[0])) : 60;
}

function createDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AppointmentStatus>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<AppointmentForm>({
    ...initialForm,
    date: dayKey(new Date()),
  });

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const from = startOfDay(selectedDate).toISOString();
      const to = endOfDay(selectedDate).toISOString();

      const [
        appointmentsResult,
        customersResult,
        servicesResult,
        staffResult,
        roomsResult,
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select(
            "id, customer_id, staff_id, service_id, room_id, starts_at, ends_at, status, notes, customers(full_name, phone), services(title), staff_members(display_name), treatment_rooms(name)"
          )
          .gte("starts_at", from)
          .lte("starts_at", to)
          .order("starts_at", { ascending: true }),
        supabase
          .from("customers")
          .select("id, full_name, phone")
          .eq("active", true)
          .order("full_name"),
        supabase
          .from("services")
          .select("id, title, duration")
          .eq("published", true)
          .order("sort_order"),
        supabase
          .from("staff_members")
          .select("id, display_name, title")
          .eq("active", true)
          .order("display_name"),
        supabase
          .from("treatment_rooms")
          .select("id, name")
          .eq("active", true)
          .order("name"),
      ]);

      const firstError =
        appointmentsResult.error ||
        customersResult.error ||
        servicesResult.error ||
        staffResult.error ||
        roomsResult.error;

      if (firstError) throw firstError;

      setAppointments((appointmentsResult.data || []) as Appointment[]);
      setCustomers((customersResult.data || []) as Customer[]);
      setServices((servicesResult.data || []) as Service[]);
      setStaff((staffResult.data || []) as Staff[]);
      setRooms((roomsResult.data || []) as Room[]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Randevu kayıtları yüklenemedi."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const filteredAppointments = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");

    return appointments.filter((appointment) => {
      const matchesStatus = status === "all" || appointment.status === status;
      const haystack = [
        appointment.customers?.full_name,
        appointment.customers?.phone,
        appointment.services?.title,
        appointment.staff_members?.display_name,
        appointment.treatment_rooms?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return matchesStatus && (!normalized || haystack.includes(normalized));
    });
  }, [appointments, query, status]);

  const summary = useMemo(
    () => ({
      total: appointments.length,
      pending: appointments.filter((item) => item.status === "pending").length,
      confirmed: appointments.filter((item) => item.status === "confirmed").length,
      completed: appointments.filter((item) => item.status === "completed").length,
    }),
    [appointments]
  );

  function previousDay() {
    setSelectedDate((current) => new Date(current.getTime() - 86400000));
  }

  function nextDay() {
    setSelectedDate((current) => new Date(current.getTime() + 86400000));
  }

  function openCreateForm() {
    setForm({
      ...initialForm,
      date: dayKey(selectedDate),
    });
    setError("");
    setShowForm(true);
  }

  function handleServiceChange(serviceId: string) {
    const service = services.find((item) => item.id === serviceId);
    setForm((current) => ({
      ...current,
      service_id: serviceId,
      duration: String(parseDuration(service?.duration || "60")),
    }));
  }

  async function createAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.customer_id || !form.date || !form.time) {
      setError("Müşteri, tarih ve saat alanları zorunludur.");
      return;
    }

    const startsAt = createDateTime(form.date, form.time);
    const duration = Math.max(15, Number(form.duration) || 60);
    const endsAt = new Date(startsAt.getTime() + duration * 60000);

    if (Number.isNaN(startsAt.getTime())) {
      setError("Geçerli bir tarih ve saat seçin.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = getSupabaseBrowserClient();

    let conflictQuery = supabase
      .from("appointments")
      .select("id, starts_at, ends_at, staff_id, room_id")
      .lt("starts_at", endsAt.toISOString())
      .gt("ends_at", startsAt.toISOString())
      .not("status", "in", '("cancelled","no_show")');

    const { data: conflictsData, error: conflictError } = await conflictQuery;

    if (conflictError) {
      setSaving(false);
      setError(conflictError.message);
      return;
    }

    const conflicts = (conflictsData || []) as Array<{
      id: string;
      staff_id: string | null;
      room_id: string | null;
    }>;

    const staffConflict =
      form.staff_id &&
      conflicts.some((item) => item.staff_id === form.staff_id);

    const roomConflict =
      form.room_id &&
      conflicts.some((item) => item.room_id === form.room_id);

    if (staffConflict || roomConflict) {
      setSaving(false);
      setError(
        staffConflict && roomConflict
          ? "Seçilen personel ve oda bu saat aralığında dolu."
          : staffConflict
            ? "Seçilen personel bu saat aralığında dolu."
            : "Seçilen oda bu saat aralığında dolu."
      );
      return;
    }

    const newAppointment = {
      customer_id: form.customer_id,
      service_id: form.service_id || null,
      staff_id: form.staff_id || null,
      room_id: form.room_id || null,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: form.status,
      notes: form.notes.trim(),
    };

    const { error: insertError } = await supabase
      .from("appointments")
      .insert([newAppointment] as never[]);

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setShowForm(false);
    await load(true);
  }

  async function updateStatus(id: string, nextStatus: AppointmentStatus) {
    setError("");
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status: nextStatus } as never)
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await load(true);
  }

  if (loading) {
    return (
      <PlatformShell title="Randevu Yönetimi">
        <div className={styles.loading}>
          <LoaderCircle className={styles.spin} />
          <span>Randevu takvimi yükleniyor…</span>
        </div>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell title="Randevu Yönetimi" eyebrow="TAKVİM & ODALAR">
      <div className={styles.datebar}>
        <button onClick={previousDay} aria-label="Önceki gün">
          <ChevronLeft size={19} />
        </button>
        <div>
          <span>SEÇİLİ GÜN</span>
          <h2>{formatDate(selectedDate)}</h2>
        </div>
        <button onClick={nextDay} aria-label="Sonraki gün">
          <ChevronRight size={19} />
        </button>
        <button
          className={styles.today}
          onClick={() => setSelectedDate(startOfDay(new Date()))}
        >
          Bugün
        </button>
        <button
          className={styles.refresh}
          onClick={() => void load(true)}
          disabled={refreshing}
        >
          <RefreshCw className={refreshing ? styles.spin : ""} size={17} />
          Yenile
        </button>
        <button className={styles.add} onClick={openCreateForm}>
          <CirclePlus size={18} />
          Yeni randevu
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      <section className={styles.stats}>
        <article><CalendarDays /><span>Toplam</span><b>{summary.total}</b></article>
        <article><Clock3 /><span>Bekleyen</span><b>{summary.pending}</b></article>
        <article><CheckCircle2 /><span>Onaylı</span><b>{summary.confirmed}</b></article>
        <article><UserRound /><span>Tamamlanan</span><b>{summary.completed}</b></article>
      </section>

      <div className={styles.filters}>
        <div className={styles.search}>
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Müşteri, hizmet, personel veya oda ara"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "all" | AppointmentStatus)
          }
        >
          <option value="all">Tüm durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="confirmed">Onaylandı</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal</option>
          <option value="no_show">Gelmedi</option>
        </select>
      </div>

      <section className={styles.timeline}>
        {filteredAppointments.length ? (
          filteredAppointments.map((appointment) => (
            <article className={styles.appointment} key={appointment.id}>
              <time>
                <b>{formatTime(appointment.starts_at)}</b>
                <span>{formatTime(appointment.ends_at)}</span>
              </time>

              <div className={styles.main}>
                <div>
                  <h3>{appointment.customers?.full_name || "Müşteri"}</h3>
                  <p>{appointment.services?.title || "Hizmet seçilmedi"}</p>
                </div>

                <div className={styles.meta}>
                  <span><Users size={14} /> {appointment.staff_members?.display_name || "Personel atanmadı"}</span>
                  <span><DoorOpen size={14} /> {appointment.treatment_rooms?.name || "Oda atanmadı"}</span>
                </div>
              </div>

              <select
                className={`${styles.status} ${styles[appointment.status]}`}
                value={appointment.status}
                onChange={(event) =>
                  void updateStatus(
                    appointment.id,
                    event.target.value as AppointmentStatus
                  )
                }
              >
                <option value="pending">Bekliyor</option>
                <option value="confirmed">Onaylandı</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal</option>
                <option value="no_show">Gelmedi</option>
              </select>
            </article>
          ))
        ) : (
          <div className={styles.empty}>
            <CalendarDays size={34} />
            <b>Bu gün için randevu bulunmuyor.</b>
            <span>Yeni randevu oluşturarak takvime ekleyebilirsiniz.</span>
          </div>
        )}
      </section>

      {showForm ? (
        <div className={styles.overlay} onMouseDown={() => setShowForm(false)}>
          <form
            className={styles.modal}
            onSubmit={createAppointment}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>YENİ RANDEVU</span>
                <h2>Takvime randevu ekle</h2>
              </div>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </header>

            <label>
              Müşteri
              <select
                value={form.customer_id}
                onChange={(event) =>
                  setForm({ ...form, customer_id: event.target.value })
                }
                required
              >
                <option value="">Müşteri seçin</option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.full_name} · {customer.phone}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.formGrid}>
              <label>
                Hizmet
                <select
                  value={form.service_id}
                  onChange={(event) => handleServiceChange(event.target.value)}
                >
                  <option value="">Hizmet seçin</option>
                  {services.map((service) => (
                    <option value={service.id} key={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Süre (dakika)
                <input
                  type="number"
                  min="15"
                  step="5"
                  value={form.duration}
                  onChange={(event) =>
                    setForm({ ...form, duration: event.target.value })
                  }
                />
              </label>
            </div>

            <div className={styles.formGrid}>
              <label>
                Tarih
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm({ ...form, date: event.target.value })
                  }
                  required
                />
              </label>

              <label>
                Saat
                <input
                  type="time"
                  value={form.time}
                  onChange={(event) =>
                    setForm({ ...form, time: event.target.value })
                  }
                  required
                />
              </label>
            </div>

            <div className={styles.formGrid}>
              <label>
                Personel
                <select
                  value={form.staff_id}
                  onChange={(event) =>
                    setForm({ ...form, staff_id: event.target.value })
                  }
                >
                  <option value="">Personel seçin</option>
                  {staff.map((member) => (
                    <option value={member.id} key={member.id}>
                      {member.display_name} · {member.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Oda
                <select
                  value={form.room_id}
                  onChange={(event) =>
                    setForm({ ...form, room_id: event.target.value })
                  }
                >
                  <option value="">Oda seçin</option>
                  {rooms.map((room) => (
                    <option value={room.id} key={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Durum
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as AppointmentStatus,
                  })
                }
              >
                <option value="pending">Bekliyor</option>
                <option value="confirmed">Onaylandı</option>
              </select>
            </label>

            <label>
              Not
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
              />
            </label>

            <button className={styles.save} disabled={saving}>
              {saving ? (
                <LoaderCircle className={styles.spin} size={18} />
              ) : (
                <CirclePlus size={18} />
              )}
              Randevuyu kaydet
            </button>
          </form>
        </div>
      ) : null}
    </PlatformShell>
  );
}
