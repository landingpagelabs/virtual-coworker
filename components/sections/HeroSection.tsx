'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TrackingFields } from '@/components/TrackingFields';
import { CalendlyModal } from '@/components/CalendlyModal';
import { useFormErrors } from '@/lib/useFormErrors';
import { submitLead } from '@/lib/submitLead';
import { COUNTRIES } from '@/lib/countries';

interface HeroSectionProps {
  section: {
    heading?: string;
    subtitle?: string;
    formTitle?: string;
    guarantee?: string;
  };
}

export default function HeroSection({ section }: HeroSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { errors, validate, clearError } = useFormErrors();
  const [showCalendly, setShowCalendly] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate(formRef.current);
    if (!isValid) return;
    submitLead(formRef.current!, 'hero');
    setShowCalendly(true);
  };

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      '.form-main-input-wrap input, .form-main-input-wrap select',
    );
    const cleanups: Array<() => void> = [];
    inputs.forEach((input) => {
      const onFocus = () => {
        input.nextElementSibling?.classList.add('active');
      };
      const onBlur = () => {
        if (input.value.trim() === '') {
          input.nextElementSibling?.classList.remove('active');
        }
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
    <section className="hero">
      <div className="padding-global">
        <div className="container-large">
          <div className="hero_wrapper">
            <div className="hero_title-wrap">
              <h1 className="title-h1 white">
                {section.heading || 'Hire a virtual assistant who\'s so good, you forget they\'re offshore'}
              </h1>
            </div>
            <div className="hero_subtitle-wrap">
              <p className="text-body-large off-white">
                {section.subtitle ||
                  'We hand-pick the Philippines\' best talent for your role and handle all the HR. They work your hours, use AI to get more done and cost a fraction of a local salary.'}
              </p>
            </div>

            <div className="hero_form-wrap">
              <div className="hero_form-title-wrap">
                <div className="text-label-medium white">
                  {section.formTitle || 'Complete The Form Below To Book Your Free Consultation'}
                </div>
              </div>
              <form className="form" ref={formRef} noValidate onSubmit={handleSubmit}>
                <TrackingFields />
                <div className="form-main-wrap">
                  <div className="form-main-wrap-inner">
                    {[
                      { type: 'text', label: 'First Name', autoComplete: 'given-name' },
                      { type: 'text', label: 'Last Name', autoComplete: 'family-name' },
                      { type: 'email', label: 'Work Email', autoComplete: 'email' },
                      { type: 'tel', label: 'Phone', autoComplete: 'tel' },
                      { type: 'text', label: 'Company Name', autoComplete: 'organization' },
                      { type: 'select', label: 'Country', autoComplete: 'country-name' },
                    ].map(({ type, label, autoComplete }) => {
                      const id = `hero-${label.toLowerCase().replace(/\s+/g, '-')}`;
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
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9775 4.30176H2.22266L7.24452 12.9999L2.22266 21.698H7.9775L12.9994 12.9999L7.9775 4.30176Z" fill="black" />
                      <path d="M18.7548 4.30176H13L18.0219 12.9999L13 21.698H18.7548L23.7767 12.9999L18.7548 4.30176Z" fill="black" />
                    </svg>
                  </button>
                  <div className="form-main-info-bot">
                    <div className="form-main-info-image">
                      <img src="/images/sections/hero/Frame 2147261038.avif" alt="" />
                    </div>
                    <svg width="1" height="29" viewBox="0 0 1 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0.5" y1="28.2285" x2="0.5" y2="0" stroke="black" strokeOpacity="0.25" />
                    </svg>
                    <p className="text-label-extra-small secondary">
                      {section.guarantee || 'Every Hire Is Backed By Our Lifetime Replacement Guarantee'}
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <CalendlyModal open={showCalendly} />
          </div>
        </div>
      </div>
    </section>
  );
}
