import { register } from '@/server/actions/auth.actions';
import { RegisterForm } from '@/features/Entities/auth/components/RegisterForm';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorMsg = typeof params.error === 'string' ? params.error : undefined;

  return <RegisterForm errorMsg={errorMsg} registerAction={register} />;
}
