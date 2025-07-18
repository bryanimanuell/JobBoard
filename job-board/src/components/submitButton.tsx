'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  pendingText,
  className,
  disabled: parentDisabled,
}: {
  children: React.ReactNode;
  pendingText: string;
  className: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  const disabled = pending || parentDisabled;
  return (
    <button type="submit" disabled={disabled} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}