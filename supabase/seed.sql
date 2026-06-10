-- Seed script for creating an initial Admin User
-- Password is 'password123' by default
-- You can run this in the Supabase SQL Editor or via `supabase db reset`

-- 1. Insert admin user into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- Fixed UUID for easy reference
  '00000000-0000-0000-0000-000000000000',
  'admin@yadcambodia.org',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Admin", "last_name": "User"}',
  FALSE,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert into auth.identities
INSERT INTO auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  format('{"sub": "%s", "email": "admin@yadcambodia.org"}', '00000000-0000-0000-0000-000000000000')::jsonb,
  'email',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert admin role into public.user_roles
INSERT INTO public.user_roles (
  user_id,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin'
) ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
