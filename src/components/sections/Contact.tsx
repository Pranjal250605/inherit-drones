import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";

type PillarId = Dict["contact"]["pillars"][number]["id"];

type FormState = {
  name: string;
  email: string;
  organisation: string;
  location: string;
  pillar: PillarId;
  brief: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useT();

  return (
    <SectionFrame id="contact" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel>{t.contact.tag}</SectionLabel>
          <h2
            data-anim="title-up"
            className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
          >
            {t.contact.h2_line1} {t.contact.h2_emph}
          </h2>
          <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
            {t.contact.subtitle_jp}
          </div>
          <p className="mt-8 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
            {t.contact.lead}
          </p>
        </div>

        <div
          data-anim="card-stagger"
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3"
        >
          <div
            data-anim-item
            className="card-lift rounded-2xl border border-fg/10 bg-bg p-8 shadow-sm hover:shadow-lg"
          >
            <NewsletterCard />
          </div>
          <div
            data-anim-item
            className="card-lift rounded-2xl border border-fg/10 bg-bg p-8 shadow-sm hover:shadow-lg"
          >
            <DownloadsCard />
          </div>
          <div
            data-anim-item
            className="card-lift rounded-2xl border border-fg/10 bg-bg p-8 shadow-sm hover:shadow-lg"
          >
            <BriefCard />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-8 border-t-2 border-fg/10 pt-10 sm:grid-cols-3">
          {t.contact.info.map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
                {k}
              </div>
              <div className="mt-2 text-[15px] font-medium text-fg">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

/* =====================================================================
   Column 1 — Newsletter signup
===================================================================== */

function NewsletterCard() {
  const { t } = useT();
  const c = t.contact.newsletter;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(c.err_email);
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <ColumnShell title={c.title} titleJp={c.title_jp}>
      <p className="mt-3 text-pretty text-[14px] leading-relaxed text-muted">
        {c.body}
      </p>

      {sent ? (
        <div className="mt-auto pt-8">
          <div className="border-l-2 border-orange-500 pl-3 text-[14px] text-fg">
            {c.success}
          </div>
          <div className="mt-2 pl-3 text-[13px] text-muted">{email}</div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-auto pt-8" noValidate>
          <label
            htmlFor="news-email"
            className="block text-[11px] uppercase tracking-[0.2em] text-fg/45"
          >
            Email
          </label>
          <input
            id="news-email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder={c.placeholder}
            autoComplete="email"
            className="mt-2 w-full border-0 border-b border-fg/20 bg-transparent py-2.5 text-[15px] text-fg placeholder:text-fg/40 focus:border-fg/60 focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-[13px] text-orange-500">{error}</p>
          )}
          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[13px] font-semibold tracking-[0.02em] text-white transition hover:bg-orange-400"
          >
            {c.submit} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      )}
    </ColumnShell>
  );
}

/* =====================================================================
   Column 2 — Resource downloads
===================================================================== */

function DownloadsCard() {
  const { t } = useT();
  const c = t.contact.downloads;

  return (
    <ColumnShell title={c.title} titleJp={c.title_jp}>
      <p className="mt-3 text-pretty text-[14px] leading-relaxed text-muted">
        {c.body}
      </p>

      <ul className="mt-auto flex flex-col divide-y divide-fg/10 border-t border-fg/10 pt-2">
        {c.items.map((item) => (
          <li key={item.title}>
            <a
              href="#contact"
              className="group flex items-center gap-3 py-3.5 transition hover:text-orange-500"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] text-fg group-hover:text-orange-500">
                  {item.title}
                </span>
                <span className="mt-1 block text-[12px] text-fg/45">
                  {item.format}
                </span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-fg/30 transition group-hover:translate-x-1 group-hover:text-orange-500" />
            </a>
          </li>
        ))}
      </ul>
    </ColumnShell>
  );
}

/* =====================================================================
   Column 3 — Brief form (compact version of the original)
===================================================================== */

function BriefCard() {
  const { t } = useT();
  const c = t.contact;
  const col = c.brief_col;

  const initial: FormState = {
    name: "",
    email: "",
    organisation: "",
    location: "",
    pillar: c.pillars[0]?.id ?? "Logistics",
    brief: "",
  };

  const validate = (form: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = c.err_name;
    if (!form.email.trim()) errors.email = c.err_email_required;
    else if (!EMAIL_RE.test(form.email.trim()))
      errors.email = c.err_email_invalid;
    if (!form.organisation.trim()) errors.organisation = c.err_org;
    if (!form.location.trim()) errors.location = c.err_loc;
    if (!form.brief.trim()) errors.brief = c.err_brief;
    else if (form.brief.trim().length < 10) errors.brief = c.err_brief_short;
    return errors;
  };

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  const handleChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...form, [key]: e.target.value };
      setForm(next);
      if (touched[key]) setErrors(validate(next));
    };

  const handleBlur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  };

  const handlePillar = (p: PillarId) => () => {
    setForm((f) => ({ ...f, pillar: p }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    setTouched({
      name: true,
      email: true,
      organisation: true,
      location: true,
      brief: true,
    });
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initial);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    const pillarLabel =
      c.pillars.find((p) => p.id === form.pillar)?.label ?? form.pillar;
    return (
      <ColumnShell title={col.title} titleJp={col.title_jp}>
        <div
          role="status"
          aria-live="polite"
          className="mt-3 flex flex-1 flex-col"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-orange-500">
            {c.success_status}
          </div>
          <h4 className="mt-4 font-display text-lg font-light leading-tight tracking-[-0.005em] text-fg">
            {c.success_title}
          </h4>
          <p className="mt-3 text-pretty text-[14px] leading-relaxed text-muted">
            {c.success_body_pre}
            <span className="text-fg">{pillarLabel}</span>
            {c.success_body_post}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-auto pt-8 text-left text-[14px] text-fg/60 transition hover:text-orange-500"
          >
            {c.success_again}
          </button>
        </div>
      </ColumnShell>
    );
  }

  return (
    <ColumnShell title={col.title} titleJp={col.title_jp}>
      <form noValidate onSubmit={handleSubmit} className="mt-3 flex flex-1 flex-col">
        <div className="mt-2 grid grid-cols-1 gap-4">
          <CompactField
            id="bc-name"
            label={c.field_name_label}
            placeholder={c.field_name_placeholder}
            value={form.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
            autoComplete="name"
          />
          <CompactField
            id="bc-email"
            type="email"
            label={c.field_email_label}
            placeholder={c.field_email_placeholder}
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            autoComplete="email"
          />
          <CompactField
            id="bc-org"
            label={c.field_org_label}
            placeholder={c.field_org_placeholder}
            value={form.organisation}
            onChange={handleChange("organisation")}
            onBlur={handleBlur("organisation")}
            error={errors.organisation}
            autoComplete="organization"
          />
          <CompactField
            id="bc-loc"
            label={c.field_loc_label}
            placeholder={c.field_loc_placeholder}
            value={form.location}
            onChange={handleChange("location")}
            onBlur={handleBlur("location")}
            error={errors.location}
            autoComplete="address-level1"
          />

          <div className="grid grid-cols-3 gap-2 pt-1">
            {c.pillars.map((opt) => {
              const active = form.pillar === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={handlePillar(opt.id)}
                  aria-pressed={active}
                  className={
                    "flex items-center justify-center border px-2 py-2.5 text-[12px] tracking-[0.02em] transition " +
                    (active
                      ? "border-orange-500 bg-orange-500/5 text-orange-500"
                      : "border-fg/15 text-fg/60 hover:border-fg/40")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="relative pt-1">
            <label
              htmlFor="bc-brief"
              className="block text-[11px] uppercase tracking-[0.2em] text-fg/45"
            >
              {c.field_brief_label}
            </label>
            <textarea
              id="bc-brief"
              rows={3}
              value={form.brief}
              onChange={handleChange("brief")}
              onBlur={handleBlur("brief")}
              aria-invalid={Boolean(errors.brief)}
              aria-describedby={errors.brief ? "bc-brief-error" : undefined}
              className={
                "mt-2 w-full border-0 border-b bg-transparent py-2.5 text-[15px] text-fg placeholder:text-fg/40 focus:outline-none " +
                (errors.brief
                  ? "border-orange-500 focus:border-orange-500"
                  : "border-fg/20 focus:border-fg/60")
              }
            />
            {errors.brief && (
              <p
                id="bc-brief-error"
                className="mt-1 text-[13px] text-orange-500"
              >
                {errors.brief}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="hidden text-[12px] text-fg/45 sm:inline">
            {c.form_reply}
          </span>
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[13px] font-semibold tracking-[0.02em] text-white transition hover:bg-orange-400"
          >
            {c.submit} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </ColumnShell>
  );
}

/* =====================================================================
   Shared column shell
===================================================================== */

function ColumnShell({
  title,
  titleJp,
  children,
}: {
  title: string;
  titleJp: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-xl font-bold leading-[1.2] tracking-[-0.01em] text-fg">
          {title}
        </h3>
        <span className="font-jp text-[12px] tracking-[0.08em] text-fg/45">
          {titleJp}
        </span>
      </div>
      {children}
    </div>
  );
}

/* =====================================================================
   Compact form field (single-column variant of FormField)
===================================================================== */

type CompactFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
};

function CompactField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
}: CompactFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.2em] text-fg/45"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          "mt-2 w-full border-0 border-b bg-transparent py-2.5 text-[15px] text-fg placeholder:text-fg/40 focus:outline-none " +
          (error
            ? "border-orange-500 focus:border-orange-500"
            : "border-fg/20 focus:border-fg/60")
        }
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-orange-500">
          {error}
        </p>
      )}
    </div>
  );
}
