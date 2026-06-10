import { login } from '@/server/actions/auth.actions';
import { LoginForm } from '@/features/Entities/auth/components/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorMsg = typeof params.error === 'string' ? params.error : undefined;

  return <LoginForm errorMsg={errorMsg} loginAction={login} />;
}
