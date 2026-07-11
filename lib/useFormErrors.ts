import { useCallback, useState } from 'react';

/**
 * Required-field validation for the consultation forms.
 *
 * `validate` scans every `.form-main-input-wrap input` in the given form and
 * flags the ones left empty, returning true only when all are filled.
 * `clearError` drops a field's error as soon as the user starts fixing it.
 * `errors` is keyed by input id so the UI can mark individual fields.
 */
export function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = useCallback((form: HTMLFormElement | null): boolean => {
    if (!form) return false;
    const next: Record<string, boolean> = {};
    form
      .querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        '.form-main-input-wrap input, .form-main-input-wrap select',
      )
      .forEach((field) => {
        const value = field.value.trim();
        if (value === '') {
          next[field.id] = true;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+$/.test(value)) {
          // Email fields must contain a valid "@" to pass.
          next[field.id] = true;
        }
      });
    setErrors(next);
    return Object.keys(next).length === 0;
  }, []);

  const clearError = useCallback((id: string) => {
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return { errors, validate, clearError };
}
