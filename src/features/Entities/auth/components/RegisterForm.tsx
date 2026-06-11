import Link from 'next/link';

interface RegisterFormProps {
  errorMsg?: string;
  registerAction: (formData: FormData) => Promise<void>;
  loginWithGoogleAction?: () => Promise<void>;
}

export function RegisterForm({ errorMsg, registerAction, loginWithGoogleAction }: RegisterFormProps) {
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

          <form action={registerAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  placeholder="Sokha"
                  className="w-full px-4 py-2.5 bg-surface-container rounded-lg border border-surface-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface text-[14px] transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  placeholder="Chen"
                  className="w-full px-4 py-2.5 bg-surface-container rounded-lg border border-surface-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface text-[14px] transition-all outline-none"
                />
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
                  name="email"
                  type="email"
                  required
                  placeholder="user@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-lg border border-surface-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface text-[14px] transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-lg border border-surface-variant/30 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface text-[14px] transition-all outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-error text-sm font-medium flex items-center justify-center gap-1.5 mt-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <p>{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-on-primary rounded-full font-bold text-[16px] shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-[0.98] mt-6 flex items-center justify-center gap-2"
            >
              Sign Up
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
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

          {loginWithGoogleAction && (
            <form action={loginWithGoogleAction}>
              <button
                type="submit"
                className="w-full py-3 bg-surface border border-surface-variant rounded-full font-bold text-[16px] text-on-surface shadow-sm hover:bg-surface-container hover:shadow-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-[20px] text-[#4285F4]">account_circle</span>
                Google
              </button>
            </form>
          )}

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
