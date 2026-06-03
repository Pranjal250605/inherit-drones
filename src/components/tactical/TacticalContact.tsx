import { useState, type ChangeEvent, type FormEvent } from "react";
import { useT, type Dict } from "../../i18n";
import { Mono, Eyebrow, TSection, Brackets, ArrowRight } from "./primitives";

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

/* TacticalContact (S.09) — full-width brief form with left rail (newsletter +
   downloads + info), bordered brief form panel with HUD brackets. */
export function TacticalContact() {
  const { t } = useT();
  const c = t.contact;

  return (
    <TSection id="contact" index="09">
      {/* header */}
      <div data-tac="up">
        <Eyebrow>{c.tag}</Eyebrow>

        <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.0] tracking-[-0.02em] text-white md:text-6xl">
          {c.h2_line1}{" "}
          <span className="text-orange-500">{c.h2_emph}</span>
        </h2>

        <div className="mt-5 font-jp text-[12px] tracking-[0.24em] text-white/45">
          {c.subtitle_jp}
        </div>

        <p className="mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-white/55">
          {c.lead}
        </p>
      </div>

      {/* body grid */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">

        {/* ── LEFT RAIL ── */}
        <div data-tac="stagger" className="flex flex-col gap-10">

          {/* newsletter */}
          <div data-tac-item>
            <NewsletterBlock />
          </div>

          {/* downloads */}
          <div data-tac-item>
            <DownloadsBlock />
          </div>

          {/* info rows */}
          <div data-tac-item className="mt-auto border-t border-white/10 pt-8">
            <div className="flex flex-col gap-4">
              {c.info.map(([k, v]) => (
                <div key={k}>
                  <Mono className="text-orange-500/80">{k}</Mono>
                  <div className="mt-1 text-[14px] text-white/70">{v}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── BRIEF FORM ── */}
        <div data-tac="up">
          <BriefForm />
        </div>

      </div>
    </TSection>
  );
}

/* ======================================================================
   Newsletter block
====================================================================== */

function NewsletterBlock() {
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
    <div>
      <div className="flex items-baseline justify-between">
        <Mono className="text-orange-500/70">{c.code}</Mono>
        <span className="font-jp text-[11px] tracking-[0.16em] text-white/35">
          {c.title_jp}
        </span>
      </div>
      <h4 className="mt-2 text-[14px] font-bold uppercase tracking-[0.08em] text-white">
        {c.title}
      </h4>
      <p className="mt-2 text-[13px] leading-relaxed text-white/45">{c.body}</p>

      {sent ? (
        <div className="mt-5 border-l-2 border-orange-500 pl-3 text-[13px] text-white/70">
          {c.success}
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-5">
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder={c.placeholder}
            autoComplete="email"
            className="w-full border-b border-white/15 bg-transparent py-2 text-[14px] text-white placeholder-white/30 focus:border-orange-500 focus:outline-none"
          />
          {error && (
            <p className="mt-1.5 text-[12px] text-orange-500">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {c.submit}
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      )}
    </div>
  );
}

/* ======================================================================
   Downloads block
====================================================================== */

function DownloadsBlock() {
  const { t } = useT();
  const c = t.contact.downloads;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Mono className="text-orange-500/70">{c.code}</Mono>
        <span className="font-jp text-[11px] tracking-[0.16em] text-white/35">
          {c.title_jp}
        </span>
      </div>
      <h4 className="mt-2 text-[14px] font-bold uppercase tracking-[0.08em] text-white">
        {c.title}
      </h4>
      <p className="mt-2 text-[13px] leading-relaxed text-white/45">{c.body}</p>

      <ul className="mt-4 flex flex-col divide-y divide-white/[0.07]">
        {c.items.map((item) => (
          <li key={item.title}>
            <a
              href="#contact"
              className="group flex items-center gap-3 py-3 transition"
            >
              <span className="flex-1 min-w-0">
                <span className="block truncate text-[13px] text-white/70 transition group-hover:text-white">
                  {item.title}
                </span>
                <Mono className="mt-0.5 block text-white/30">{item.format}</Mono>
              </span>
              {/* download arrow */}
              <ArrowRight className="h-3 w-3 shrink-0 rotate-90 text-white/25 transition group-hover:text-orange-500" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ======================================================================
   Brief form panel
====================================================================== */

function BriefForm() {
  const { t } = useT();
  const c = t.contact;
  const col = c.brief_col;

  const initial: FormState = {
    name: "",
    email: "",
    organisation: "",
    location: "",
    pillar: c.pillars[0]?.id ?? ("Logistics" as PillarId),
    brief: "",
  };

  const validate = (form: FormState): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = c.err_name;
    if (!form.email.trim()) errs.email = c.err_email_required;
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = c.err_email_invalid;
    if (!form.organisation.trim()) errs.organisation = c.err_org;
    if (!form.location.trim()) errs.location = c.err_loc;
    if (!form.brief.trim()) errs.brief = c.err_brief;
    else if (form.brief.trim().length < 10) errs.brief = c.err_brief_short;
    return errs;
  };

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [ref] = useState(() => String(Date.now()).slice(-6));

  const handleChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...form, [key]: e.target.value };
      setForm(next);
      if (touched[key]) setErrors(validate(next));
    };

  const handleBlur = (key: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(form));
  };

  const handlePillar = (p: PillarId) => () => {
    setForm((prev) => ({ ...prev, pillar: p }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, email: true, organisation: true, location: true, brief: true });
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initial);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const pillarLabel = c.pillars.find((p) => p.id === form.pillar)?.label ?? form.pillar;

  /* ── success state ── */
  if (submitted) {
    return (
      <div className="relative border border-white/10 p-8 md:p-12" role="status" aria-live="polite">
        <Brackets />

        <div className="flex items-center gap-3">
          <Mono className="text-orange-500">{c.success_status}</Mono>
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" aria-hidden="true" />
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-snug tracking-[-0.02em] text-white md:text-3xl">
          {c.success_title}
        </h3>

        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
          {c.success_body_pre}
          <span className="text-white">{pillarLabel}</span>
          {c.success_body_post}
        </p>

        <div className="mt-6">
          <Mono className="text-white/35">
            {c.success_ref_prefix}
            {ref}
          </Mono>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-10 text-[13px] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:text-orange-500"
        >
          {c.success_again}
        </button>
      </div>
    );
  }

  /* ── form state ── */
  return (
    <div className="relative border border-white/10 p-8 md:p-12">
      <Brackets />

      {/* form header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <Mono>{c.brief_col.code}</Mono>
          <span className="font-jp text-[11px] tracking-[0.16em] text-white/35">
            {col.title_jp}
          </span>
        </div>
        <span className="ml-auto flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" aria-hidden="true" />
          <Mono className="text-white/35">{c.form_secure}</Mono>
        </span>
      </div>

      <div className="mb-4">
        <Mono className="text-orange-500/80">{c.form_header}</Mono>
        <h3 className="mt-1 text-[15px] font-bold uppercase tracking-[0.06em] text-white">
          {col.title}
        </h3>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* name */}
          <TacField
            id="tc-name"
            label={c.field_name_label}
            placeholder={c.field_name_placeholder}
            value={form.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
            autoComplete="name"
          />

          {/* email */}
          <TacField
            id="tc-email"
            type="email"
            label={c.field_email_label}
            placeholder={c.field_email_placeholder}
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            autoComplete="email"
          />

          {/* organisation */}
          <TacField
            id="tc-org"
            label={c.field_org_label}
            placeholder={c.field_org_placeholder}
            value={form.organisation}
            onChange={handleChange("organisation")}
            onBlur={handleBlur("organisation")}
            error={errors.organisation}
            autoComplete="organization"
          />

          {/* location */}
          <TacField
            id="tc-loc"
            label={c.field_loc_label}
            placeholder={c.field_loc_placeholder}
            value={form.location}
            onChange={handleChange("location")}
            onBlur={handleBlur("location")}
            error={errors.location}
            autoComplete="address-level1"
          />

        </div>

        {/* pillar selector */}
        <div className="mt-6">
          <Mono className="mb-3 block text-white/35">Pillar</Mono>
          <div className="grid grid-cols-3 gap-2">
            {c.pillars.map((opt) => {
              const active = form.pillar === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={handlePillar(opt.id)}
                  aria-pressed={active}
                  className={
                    "border py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] transition " +
                    (active
                      ? "border-orange-500 bg-orange-500/[0.06] text-orange-500"
                      : "border-white/15 text-white/45 hover:border-white/35 hover:text-white/70")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* brief textarea */}
        <div className="mt-6">
          <label
            htmlFor="tc-brief"
            className="block font-mono text-[10px] uppercase tracking-[0.32em] text-white/40"
          >
            {c.field_brief_label}
          </label>
          <textarea
            id="tc-brief"
            rows={4}
            value={form.brief}
            onChange={handleChange("brief")}
            onBlur={handleBlur("brief")}
            aria-invalid={Boolean(errors.brief)}
            aria-describedby={errors.brief ? "tc-brief-error" : undefined}
            className={
              "mt-2 w-full resize-none border-b bg-transparent py-2 text-[14px] text-white placeholder-white/30 focus:outline-none " +
              (errors.brief
                ? "border-orange-500 focus:border-orange-500"
                : "border-white/15 focus:border-orange-500")
            }
          />
          {errors.brief && (
            <p id="tc-brief-error" className="mt-1 text-[12px] text-orange-500">
              {errors.brief}
            </p>
          )}
        </div>

        {/* footer row */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Mono className="text-white/30">{c.form_reply}</Mono>
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 bg-orange-500 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-orange-400"
          >
            {c.submit}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ======================================================================
   Tactical form field — bottom-border only, no rounding
====================================================================== */

type TacFieldProps = {
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

function TacField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
}: TacFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.32em] text-white/40"
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
          "mt-2 w-full border-b bg-transparent py-2 text-[14px] text-white placeholder-white/30 focus:outline-none " +
          (error
            ? "border-orange-500 focus:border-orange-500"
            : "border-white/15 focus:border-orange-500")
        }
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-orange-500">
          {error}
        </p>
      )}
    </div>
  );
}
