'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TrackingFields } from '@/components/TrackingFields';
import { CalendlyModal } from '@/components/CalendlyModal';
import { useFormErrors } from '@/lib/useFormErrors';
import { submitLead } from '@/lib/submitLead';
import { COUNTRIES } from '@/lib/countries';

interface FinalSectionProps {
  section: {
    title?: string;
    subtitle?: string;
    formTitle?: string;
  };
}

const CtaSvg = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
    <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
  </svg>
);

const FORM_FIELDS = [
  { type: 'text', label: 'First Name', autoComplete: 'given-name' },
  { type: 'text', label: 'Last Name', autoComplete: 'family-name' },
  { type: 'email', label: 'Work Email', autoComplete: 'email' },
  { type: 'tel', label: 'Phone', autoComplete: 'tel' },
  { type: 'text', label: 'Company Name', autoComplete: 'organization' },
  { type: 'select', label: 'Country', autoComplete: 'country-name' },
];

export default function FinalSection({ section }: FinalSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [month, setMonth] = useState('');
  const { errors, validate, clearError } = useFormErrors();
  const [showCalendly, setShowCalendly] = useState(false);
  const [lead, setLead] = useState<Record<string, string> | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Guard against a second Enter after the modal opens — it would send a
    // duplicate lead and double-fire the GTM conversion (see HeroSection).
    if (showCalendly) return;
    const isValid = validate(formRef.current);
    if (!isValid) return;
    // Held in state (not passed inline) so its identity is stable — CalendlyModal
    // re-initialises the widget whenever `lead` changes.
    setLead(submitLead(formRef.current!, 'section') ?? null);
    setShowCalendly(true);
  };

  // Resolve the current month on the client (avoids SSR/hydration mismatch).
  useEffect(() => {
    setMonth(new Date().toLocaleString('en-US', { month: 'long' }));
  }, []);

  // Floating-label behaviour for the form inputs, scoped to this section.
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

      // Phone field: accept digits only — strip letters/other characters as they're typed or pasted.
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
    <section className="final" id="consultation">
      <div className="padding-global">
        <div className="container-large">
          <div className="final_wrapper">
            <div className="final_head">
              <div className="final_strapline-wrap">
                <div className="pointer-wrap is-white">
                  <div className="pointer-wrap-flashing">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3.5" cy="3.5" r="3.5" fill="#008000" />
                    </svg>
                  </div>
                  <div className="pointer_text-wrap">
                    <p className="text-label-extra-small">
                      Free Consultations Still Available For {month}
                    </p>
                  </div>
                </div>
              </div>
              <div className="final_title-wrap">
                <h2 className="title-h2">
                  {section.title || 'Your next US-quality team member is waiting to help... and for a fraction of the price'}
                </h2>
              </div>
              <div className="final_text-wrap">
                <p className="text-body-regular">
                  {section.subtitle ||
                    'If your team has more work than hands, this is for you. Book your free call today, interview pre-vetted candidates within days, and your new team member could be clearing the backlog in less than two weeks. You don’t pay anything until they start, and there’s no lock-in. Claim your spot below while this month’s free consultations last.'}
                </p>
              </div>
            </div>

            <div className="final-form">
              <div className="hero_form-title-wrap">
                <div className="text-label-large">
                  {section.formTitle || 'Complete The Form Below To Get Pricing And Book Your Free Consultation'}
                </div>
              </div>
              <form className="form" ref={formRef} noValidate onSubmit={handleSubmit}>
                <TrackingFields />
                <div className="form-main-wrap">
                  <div className="form-main-wrap-inner">
                    {FORM_FIELDS.map(({ type, label, autoComplete }) => {
                      const id = `final-${label.toLowerCase().replace(/\s+/g, '-')}`;
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
                      <img src="/images/sections/hero/Frame 2147261038.avif" width={378} height={79} alt="" loading="lazy" decoding="async" />
                    </div>
                    <svg width="1" height="29" viewBox="0 0 1 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0.5" y1="28.2285" x2="0.5" y2="0" stroke="black" strokeOpacity="0.25" />
                    </svg>
                    <p className="text-label-extra-small secondary">
                      Every Hire Is Backed By Our Lifetime Replacement Guarantee
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="final_down">
              <div className="final-down_image">
                <img className="final-down_img" src="/images/sections/final/final_1.avif" width={1060} height={632} alt="bottom image" loading="lazy" decoding="async" />
              </div>
              <div className="final-down_image">
                <img className="final-down_img" src="/images/sections/final/final_2.avif" width={1060} height={630} alt="bottom image" loading="lazy" decoding="async" />
              </div>
            </div>
            <CalendlyModal open={showCalendly} lead={lead} />
          </div>
        </div>
      </div>
    </section>
  );
}
