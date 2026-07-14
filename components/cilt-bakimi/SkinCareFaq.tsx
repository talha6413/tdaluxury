"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = readonly [string, string];

export default function SkinCareFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#f4eee4] px-6 py-24 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[.28em] text-[#a87938]">
            MERAK EDİLENLER
          </p>
          <h2 className="mt-4 max-w-[10ch] font-serif text-[48px] leading-[1.03] md:text-[64px]">
            Cilt bakımı hakkında sık sorulan sorular
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-8 text-black/62">
            Cildinizin durumu kişiye özeldir. Buradaki bilgiler genel
            bilgilendirmedir; kesin değerlendirme için ön görüşme gerekir.
          </p>
        </div>

        <div className="space-y-3">
          {items.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={question}
                className="overflow-hidden rounded-[18px] border border-black/8 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-extrabold md:text-[17px]">
                    {question}
                  </span>
                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-[#a87938] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-black/6 px-6 py-5 text-[15px] leading-7 text-black/62">
                    {answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
