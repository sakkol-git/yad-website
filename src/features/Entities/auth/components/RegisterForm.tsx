'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/server/validators/auth.schema';
import { register as registerAction, loginWithGoogle } from '@/server/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPendingGoogle, startTransitionGoogle] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    const result = await registerAction(data);
    
    if (!result?.success) {
      setServerError(result?.error || 'An unexpected error occurred.');
      toast.error(result?.error || 'Registration failed');
    } else {
      toast.success('Account created successfully!');
      if (result.targetUrl) {
        router.push(result.targetUrl);
      }
    }
  };

  const onGoogleLogin = () => {
    startTransitionGoogle(async () => {
      setServerError(null);
      const result = await loginWithGoogle();
      if (result && !result.success) {
        setServerError(result.error || 'Failed to login with Google.');
        toast.error(result.error || 'Failed to login with Google.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row-reverse">
      {/* Branding/Image (Right Side on Desktop due to flex-row-reverse) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
            <path fill="#fff" d="M37.5,-73.2C48.6,-64.8,57.7,-53.4,66.6,-41.5C75.5,-29.6,84.2,-17.1,86.5,-3.8C88.7,9.6,84.4,23.8,76.5,36.1C68.6,48.4,57.1,58.8,44.1,65.8C31.1,72.8,16.6,76.4,2.5,72.2C-11.6,68,-25.3,56.1,-37.2,46.6C-49.1,37.1,-59.2,30,-67.2,19.9C-75.2,9.8,-81.1,-3.3,-78.9,-15.5C-76.7,-27.7,-66.4,-39,-54.6,-47.9C-42.8,-56.8,-29.5,-63.3,-16.1,-67.5C-2.7,-71.7,10.8,-73.6,24.1,-75.7C37.4,-77.8,26.4,-81.6,37.5,-73.2Z" transform="translate(200 200) scale(1.1)" />
          </svg>
        </div>
        <div className="relative z-10 text-on-primary max-w-lg">
          <h1 className="text-5xl font-bold mb-6">Join YAD Cambodia</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Become a part of our community. Volunteer for projects, donate to causes you care about, and manage your homestays easily.
          </p>
        </div>
      </div>

      {/* Form (Left Side on Desktop due to flex-row-reverse) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <span className="material-symbols-outlined text-[32px]">person_add</span>
            </div>
            <h1 className="text-3xl font-bold text-on-surface mb-2 text-center">Create an Account</h1>
            <p className="text-on-surface-variant text-sm text-center">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="Sokha"
                  className={`w-full px-4 py-2.5 bg-surface-container rounded-md border ${errors.first_name ? 'border-error focus:ring-error focus:border-error' : 'border-surface-variant/30 focus:border-primary focus:ring-primary'} focus:ring-1 text-on-surface text-[14px] transition-all outline-none`}
                  {...register("first_name")}
                />
                {errors.first_name && <p className="text-error text-xs mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Chen"
                  className={`w-full px-4 py-2.5 bg-surface-container rounded-md border ${errors.last_name ? 'border-error focus:ring-error focus:border-error' : 'border-surface-variant/30 focus:border-primary focus:ring-primary'} focus:ring-1 text-on-surface text-[14px] transition-all outline-none`}
                  {...register("last_name")}
                />
                {errors.last_name && <p className="text-error text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                <input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-md border ${errors.email ? 'border-error focus:ring-error focus:border-error' : 'border-surface-variant/30 focus:border-primary focus:ring-primary'} focus:ring-1 text-on-surface text-[14px] transition-all outline-none`}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-md border ${errors.password ? 'border-error focus:ring-error focus:border-error' : 'border-surface-variant/30 focus:border-primary focus:ring-primary'} focus:ring-1 text-on-surface text-[14px] transition-all outline-none`}
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-md border ${errors.confirmPassword ? 'border-error focus:ring-error focus:border-error' : 'border-surface-variant/30 focus:border-primary focus:ring-primary'} focus:ring-1 text-on-surface text-[14px] transition-all outline-none`}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {serverError && (
              <div className="text-error text-sm font-medium flex items-center justify-center gap-1.5 mt-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <p>{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-on-primary rounded-full font-bold text-[16px] shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-[0.98] mt-6 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign Up
                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-variant/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface text-on-surface-variant">Or continue with</span>
            </div>
          </div>

          <button
            onClick={onGoogleLogin}
            disabled={isPendingGoogle}
            className="w-full py-3 bg-surface border border-surface-variant rounded-full font-bold text-[16px] text-on-surface shadow-sm hover:bg-surface-container hover:shadow-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPendingGoogle ? (
              <div className="w-5 h-5 border-2 border-on-surface border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Image
                  src="/assets/icons/google-icon-logo-svgrepo-com.svg"
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                Google
              </>
            )}
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
