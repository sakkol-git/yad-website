import { RegisterForm } from '@/features/Entities/auth/components/RegisterForm';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
