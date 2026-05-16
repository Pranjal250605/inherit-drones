import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Dot, Mono, SectionFrame, Tag } from "../primitives";
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

  const initial: FormState = {
    name: "",
    email: "",
    organisation: "",
    location: "",
    pillar: t.contact.pillars[0]?.id ?? "Logistics",
    brief: "",
  };

  const validate = (form: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = t.contact.err_name;
    if (!form.email.trim()) errors.email = t.contact.err_email_required;
    else if (!EMAIL_RE.test(form.email.trim()))
      errors.email = t.contact.err_email_invalid;
    if (!form.organisation.trim()) errors.organisation = t.contact.err_org;
    if (!form.location.trim()) errors.location = t.contact.err_loc;
    if (!form.brief.trim()) errors.brief = t.contact.err_brief;
    else if (form.brief.trim().length < 10)
      errors.brief = t.contact.err_brief_short;
    return errors;
  };

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const handleChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      const next = { ...form, [key]: value };
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
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initial);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <SectionFrame id="contact" className="overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 micro-grid opacity-50" />
      <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="mx-auto flex max-w-fit">
          <Tag live>{t.contact.tag}</Tag>
        </div>
        <h2
          data-anim="title-up"
          className="mx-auto mt-8 max-w-3xl text-balance text-center font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] md:text-5xl"
        >
          {t.contact.h2_line1}
          <br />
          <span className="italic text-orange-400">{t.contact.h2_emph}</span>
        </h2>
        <div className="mt-5 text-center font-jp text-[11px] tracking-[0.05em] text-fg/30">
          {t.contact.subtitle_jp}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-pretty text-center text-sm leading-loose text-muted">
          {t.contact.lead}
        </p>

        {submitted ? (
          <SuccessPanel
            onReset={handleReset}
            pillar={form.pillar}
            t={t.contact}
          />
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-2xl border border-fg/15 bg-bg-alt/60 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-fg/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
              <div className="flex items-center gap-3">
                <Dot /> {t.contact.form_header}
              </div>
              <div>{t.contact.form_secure}</div>
            </div>

            <div className="grid grid-cols-12 gap-3 p-5">
              <FormField
                className="col-span-12 md:col-span-6"
                label={t.contact.field_name_label}
                placeholder={t.contact.field_name_placeholder}
                value={form.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                autoComplete="name"
                required
              />
              <FormField
                className="col-span-12 md:col-span-6"
                label={t.contact.field_email_label}
                placeholder={t.contact.field_email_placeholder}
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                autoComplete="email"
                required
              />
              <FormField
                className="col-span-12 md:col-span-6"
                label={t.contact.field_org_label}
                placeholder={t.contact.field_org_placeholder}
                value={form.organisation}
                onChange={handleChange("organisation")}
                onBlur={handleBlur("organisation")}
                error={errors.organisation}
                autoComplete="organization"
                required
              />
              <FormField
                className="col-span-12 md:col-span-6"
                label={t.contact.field_loc_label}
                placeholder={t.contact.field_loc_placeholder}
                value={form.location}
                onChange={handleChange("location")}
                onBlur={handleBlur("location")}
                error={errors.location}
                autoComplete="address-level1"
                required
              />

              <div className="col-span-12 grid grid-cols-3 gap-2">
                {t.contact.pillars.map((opt) => {
                  const active = form.pillar === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={handlePillar(opt.id)}
                      aria-pressed={active}
                      className={
                        "flex items-center gap-3 border bg-bg/60 px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] transition " +
                        (active
                          ? "border-orange-400 bg-orange-500/10 text-orange-400"
                          : "border-fg/15 text-fg/60 hover:border-fg/30")
                      }
                    >
                      <span className="grid h-3 w-3 place-items-center border border-current">
                        <span
                          className={
                            "h-1 w-1 bg-current transition " +
                            (active ? "opacity-100" : "opacity-0")
                          }
                        />
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="col-span-12 relative">
                <label
                  htmlFor="contact-brief"
                  className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40"
                >
                  {t.contact.field_brief_label}
                </label>
                <textarea
                  id="contact-brief"
                  rows={3}
                  value={form.brief}
                  onChange={handleChange("brief")}
                  onBlur={handleBlur("brief")}
                  required
                  aria-invalid={Boolean(errors.brief)}
                  aria-describedby={errors.brief ? "contact-brief-error" : undefined}
                  className={
                    "w-full border bg-bg/60 px-4 pb-3 pt-9 text-sm text-fg placeholder:text-fg/40 focus:outline-none " +
                    (errors.brief
                      ? "border-orange-500 focus:border-orange-500"
                      : "border-fg/15 focus:border-orange-400")
                  }
                />
                {errors.brief && (
                  <p
                    id="contact-brief-error"
                    className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400"
                  >
                    {errors.brief}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-fg/10 px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
                {t.contact.form_reply}
              </span>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 whitespace-nowrap bg-orange-500 px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bg transition hover:bg-orange-400 cut-corner-sm"
              >
                {t.contact.submit} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </form>
        )}

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-px bg-fg/10 md:grid-cols-3">
          {t.contact.info.map(([k, v]) => (
            <div key={k} className="bg-bg p-4">
              <Mono>{k}</Mono>
              <div className="mt-2 font-mono text-sm text-fg">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

type FormFieldProps = {
  className?: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
};

function FormField({
  className = "",
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  required,
}: FormFieldProps) {
  const id = `contact-field-${label}`;
  return (
    <div className={"relative " + className}>
      <label
        htmlFor={id}
        className="absolute left-3 top-2 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/40"
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
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          "w-full border bg-bg/60 px-4 pb-2.5 pt-6 text-sm text-fg placeholder:text-fg/40 focus:outline-none " +
          (error
            ? "border-orange-500 focus:border-orange-500"
            : "border-fg/15 focus:border-orange-400")
        }
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({
  onReset,
  pillar,
  t,
}: {
  onReset: () => void;
  pillar: PillarId;
  t: Dict["contact"];
}) {
  const pillarLabel =
    t.pillars.find((p) => p.id === pillar)?.label ?? pillar;
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto mt-12 max-w-2xl border border-orange-400/40 bg-bg-alt/60 p-10 text-center backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400">
        <Dot /> {t.success_status}
      </div>
      <h3 className="mt-6 font-display text-2xl font-light leading-tight tracking-[-0.01em] md:text-3xl">
        {t.success_title}
      </h3>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-loose text-muted">
        {t.success_body_pre}
        <span className="text-orange-400">{pillarLabel}</span>
        {t.success_body_post}
      </p>
      <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
        {t.success_ref_prefix}
        {new Date().getTime().toString(36).toUpperCase()}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-3 border border-fg/20 bg-fg/[0.04] px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/80 transition hover:border-orange-400/60 hover:text-orange-400"
      >
        {t.success_again}
      </button>
    </div>
  );
}
