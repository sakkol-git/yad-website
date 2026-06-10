import Link from 'next/link';

interface LoginFormProps {
  errorMsg?: string;
  loginAction: (formData: FormData) => Promise<void>;
}

export function LoginForm({ errorMsg, loginAction }: LoginFormProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-variant/30 overflow-hidden relative">
        {/* Decorative Top Banner */}
        <div className="h-32 bg-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M37.5,-73.2C48.6,-64.8,57.7,-53.4,66.6,-41.5C75.5,-29.6,84.2,-17.1,86.5,-3.8C88.7,9.6,84.4,23.8,76.5,36.1C68.6,48.4,57.1,58.8,44.1,65.8C31.1,72.8,16.6,76.4,2.5,72.2C-11.6,68,-25.3,56.1,-37.2,46.6C-49.1,37.1,-59.2,30,-67.2,19.9C-75.2,9.8,-81.1,-3.3,-78.9,-15.5C-76.7,-27.7,-66.4,-39,-54.6,-47.9C-42.8,-56.8,-29.5,-63.3,-16.1,-67.5C-2.7,-71.7,10.8,-73.6,24.1,-75.7C37.4,-77.8,26.4,-81.6,37.5,-73.2Z" transform="translate(200 200) scale(1.1)" />
            </svg>
          </div>
        </div>

        <div className="px-8 pb-8 pt-0 relative">
          {/* Logo / Avatar Circle */}
          <div className="w-24 h-24 bg-surface-container-lowest rounded-full mx-auto -mt-12 flex items-center justify-center shadow-md border-4 border-surface border-opacity-50 relative z-10">
            <span className="material-symbols-outlined text-[48px] text-primary">login</span>
          </div>

          <div className="text-center mt-6 mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm">Sign in to your YAD account</p>
          </div>

          <form action={loginAction} className="space-y-5">
            {errorMsg && (
              <div className="bg-error-container text-error px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-2">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <p>{errorMsg}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="email">
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
                  className="w-full pl-10 pr-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary text-on-surface text-[15px] transition-all placeholder-on-surface-variant/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="password">
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
                  className="w-full pl-10 pr-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary text-on-surface text-[15px] transition-all placeholder-on-surface-variant/50"
                />
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold text-[16px] shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              Sign In
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-variant/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-container-lowest text-on-surface-variant">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3.5 bg-surface border border-surface-variant rounded-xl font-bold text-[16px] text-on-surface shadow-sm hover:bg-surface-container hover:shadow-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-[20px] text-[#4285F4]">account_circle</span>
            Google
          </button>
          
          <div className="mt-8 text-center border-t border-surface-variant/30 pt-6">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
