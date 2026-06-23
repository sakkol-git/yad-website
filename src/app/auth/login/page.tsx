import { LoginForm } from '@/features/Entities/auth/components/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
