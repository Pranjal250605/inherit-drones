import { useState, type ChangeEvent, type FormEvent } from "react";
import { useT, type Dict } from "../../i18n";
import { Mono, SectionHead, TSection, ArrowRight } from "./primitives";

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

/* TacticalContact (#contact) — calm brief form. Newsletter + dossiers + contact
   details in a quiet left rail; the brief form to the right. No HUD chrome. */
export function TacticalContact() {
  const { t } = useT();
  const c = t.contact;

  return (
    <TSection id="contact">
      <SectionHead eyebrow={c.tag} jp={c.subtitle_jp} lead={c.lead}>
        {c.h2_line1} <span className="text-orange-500">{c.h2_emph}</span>
      </SectionHead>

      <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[300px_1fr]">
        <div data-tac="stagger" className="flex flex-col gap-12">
          <div data-tac-item>
            <NewsletterBlock />
          </div>
          <div data-tac-item>
            <DownloadsBlock />
          </div>
          <div data-tac-item className="border-t border-white/10 pt-8">
            <div className="flex flex-col gap-4">
              {c.info.map(([k, v]) => (
                <div key={k}>
                  <Mono className="text-white/40">{k}</Mono>
                  <div className="mt-1 text-[14px] text-white/70">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-tac="up">
          <BriefForm />
        </div>
      </div>
    </TSection>
  );
}

/* ── Newsletter ── */
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
      <h4 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
        {c.title}
      </h4>
      <p className="mt-2 text-[14px] leading-relaxed text-white/45">{c.body}</p>

      {sent ? (
        <div className="mt-5 border-l-2 border-orange-500 pl-3 text-[14px] text-white/70">
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
          {error && <p className="mt-1.5 text-[12px] text-orange-500">{error}</p>}
          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-orange-400"
          >
            {c.submit}
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      )}
    </div>
  );
}

/* ── Dossiers ── */
function DownloadsBlock() {
  const { t } = useT();
  const c = t.contact.downloads;

  return (
    <div>
      <h4 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
        {c.title}
      </h4>
      <ul className="mt-4 flex flex-col">
        {c.items.map((item) => (
          <li key={item.title}>
            <a
              href="#contact"
              className="group flex items-center gap-3 border-b border-white/[0.07] py-3"
            >
              <span className="flex-1 text-[14px] text-white/70 transition group-hover:text-white">
                {item.title}
              </span>
              <ArrowRight className="h-3 w-3 shrink-0 rotate-90 text-white/25 transition group-hover:text-orange-500" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Brief form ── */
function BriefForm() {
  const { t } = useT();
  const c = t.contact;

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

  if (submitted) {
    return (
      <div className="border-l-2 border-orange-500 pl-8" role="status" aria-live="polite">
        <Mono className="text-orange-500">{c.success_status}</Mono>
        <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-snug tracking-[-0.02em] text-white md:text-3xl">
          {c.success_title}
        </h3>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/55">
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

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TacField
          id="tc-name"
          label={c.field_name_placeholder}
          value={form.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          error={errors.name}
          autoComplete="name"
        />
        <TacField
          id="tc-email"
          type="email"
          label={c.field_email_placeholder}
          value={form.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          autoComplete="email"
        />
        <TacField
          id="tc-org"
          label={c.field_org_placeholder}
          value={form.organisation}
          onChange={handleChange("organisation")}
          onBlur={handleBlur("organisation")}
          error={errors.organisation}
          autoComplete="organization"
        />
        <TacField
          id="tc-loc"
          label={c.field_loc_placeholder}
          value={form.location}
          onChange={handleChange("location")}
          onBlur={handleBlur("location")}
          error={errors.location}
          autoComplete="address-level1"
        />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 gap-3">
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
                    ? "border-orange-500 text-orange-500"
                    : "border-white/15 text-white/45 hover:border-white/35 hover:text-white/70")
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <textarea
          id="tc-brief"
          rows={3}
          placeholder={c.field_brief_label}
          value={form.brief}
          onChange={handleChange("brief")}
          onBlur={handleBlur("brief")}
          aria-invalid={Boolean(errors.brief)}
          aria-describedby={errors.brief ? "tc-brief-error" : undefined}
          className={
            "w-full resize-none border-b bg-transparent py-2 text-[15px] text-white placeholder-white/30 focus:outline-none " +
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

      <div className="mt-10 flex items-center justify-between gap-4">
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
  );
}

/* ── Field: bottom-border input ── */
type TacFieldProps = {
  id: string;
  label: string;
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
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
}: TacFieldProps) {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          "w-full border-b bg-transparent py-2 text-[15px] text-white placeholder-white/35 focus:outline-none " +
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
