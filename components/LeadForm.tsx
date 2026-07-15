'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TrackingFields } from '@/components/TrackingFields';
import { CalendlyModal } from '@/components/CalendlyModal';
import { useFormErrors } from '@/lib/useFormErrors';
import { submitLead } from '@/lib/submitLead';
import { COUNTRIES } from '@/lib/countries';

/**
 * The consultation lead form — THE single implementation, rendered by both
 * HeroSection and FinalSection. It was duplicated (~90 lines each) and the
 * copies had already drifted: the hero's input-listener effect bound
 * document-wide onto the other form's fields, and the guarantee line had two
 * sources of truth. Field ids are `${prefix}-…` (submitLead strips the prefix,
 * and lib/submitLead.ts maps the stripped names to Zoho Lead fields — keep all
 * three in step when fields change).
 */

const FORM_FIELDS = [
  { type: 'text', label: 'First Name', autoComplete: 'given-name' },
  { type: 'text', label: 'Last Name', autoComplete: 'family-name' },
  { type: 'email', label: 'Work Email', autoComplete: 'email' },
  { type: 'tel', label: 'Phone', autoComplete: 'tel' },
  { type: 'text', label: 'Company Name', autoComplete: 'organization' },
  { type: 'select', label: 'Country', autoComplete: 'country-name' },
];

const CtaSvg = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
    <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
  </svg>
);

interface LeadFormProps {
  /** Field-id prefix — also what submitLead strips ('hero' | 'final'). */
  prefix: 'hero' | 'final';
  /** form_placement value carried by the lead + the GTM event. */
  source: 'hero' | 'section';
  /** Guarantee line under the CTA; content-driven with a shared default. */
  guarantee?: string;
  /** The hero form is in the LCP viewport — its trust image loads eagerly. */
  eager?: boolean;
}

export function LeadForm({ prefix, source, guarantee, eager }: LeadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { errors, validate, clearError } = useFormErrors();
  const [showCalendly, setShowCalendly] = useState(false);
  const [lead, setLead] = useState<Record<string, string> | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Once the booking modal is open the form is done: a stray second Enter
    // (focus stays on the background input — the overlay only blocks clicks)
    // would send a duplicate lead, double-fire the GTM conversion, and
    // re-initialise the Calendly widget mid-load.
    if (showCalendly) return;
    if (!validate(formRef.current)) return;
    // Held in state (not passed inline) so its identity is stable — CalendlyModal
    // re-initialises the widget whenever `lead` changes.
    setLead(submitLead(formRef.current!, source) ?? null);
    setShowCalendly(true);
  };

  // Floating-label behaviour + tel digit-stripping, scoped to THIS form only.
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      '.form-main-input-wrap input, .form-main-input-wrap select',
    );
    if (!inputs) return;
    const cleanups: Array<() => void> = [];
    inputs.forEach((input) => {
      const onFocus = () => input.nextElementSibling?.classList.add('active');
      const onBlur = () => {
        if (input.value.trim() === '') input.nextElementSibling?.classList.remove('active');
      };
      input.addEventListener('focus', onFocus);
      input.addEventListener('blur', onBlur);
      cleanups.push(() => {
        input.removeEventListener('focus', onFocus);
        input.removeEventListener('blur', onBlur);
      });

      // Phone field: accept digits only — strip other characters as they're
      // typed or pasted.
      if (input.type === 'tel') {
        const onDigitsOnly = () => {
          input.value = input.value.replace(/\D/g, '');
        };
        input.addEventListener('input', onDigitsOnly);
        cleanups.push(() => input.removeEventListener('input', onDigitsOnly));
      }
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <form className="form" ref={formRef} noValidate onSubmit={handleSubmit}>
        <TrackingFields />
        <div className="form-main-wrap">
          <div className="form-main-wrap-inner">
            {FORM_FIELDS.map(({ type, label, autoComplete }) => {
              const id = `${prefix}-${label.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div className={`form-main-input-wrap${errors[id] ? ' error' : ''}`} key={label}>
                  {type === 'select' ? (
                    <select
                      id={id}
                      name={id}
                      autoComplete={autoComplete}
                      required
                      defaultValue=""
                      aria-invalid={errors[id] ? true : undefined}
                      onChange={() => clearError(id)}
                    >
                      <option value="" disabled></option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={id}
                      name={id}
                      autoComplete={autoComplete}
                      required
                      aria-invalid={errors[id] ? true : undefined}
                      onChange={() => clearError(id)}
                    />
                  )}
                  <label className="text-body-regular" htmlFor={id}>{label}</label>
                </div>
              );
            })}
          </div>
          {Object.keys(errors).length > 0 && (
            <p className="form-error-message" role="alert">
              Please fill in all required fields.
            </p>
          )}
          <button className="cta-main" type="submit">
            <span className="title-h5">Book Your Free Consultation</span>
            <CtaSvg />
          </button>
          <div className="form-main-info-bot">
            <div className="form-main-info-image">
              {eager ? (
                <img src="/images/sections/hero/Frame 2147261038.avif" fetchPriority="high" width={378} height={79} alt="" />
              ) : (
                <img src="/images/sections/hero/Frame 2147261038.avif" width={378} height={79} alt="" loading="lazy" decoding="async" />
              )}
            </div>
            <svg width="1" height="29" viewBox="0 0 1 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="28.2285" x2="0.5" y2="0" stroke="black" strokeOpacity="0.25" />
            </svg>
            <p className="text-label-extra-small secondary">
              {guarantee || 'Every Hire Is Backed By Our Lifetime Replacement Guarantee'}
            </p>
          </div>
        </div>
      </form>
      <CalendlyModal open={showCalendly} lead={lead} />
    </>
  );
}
