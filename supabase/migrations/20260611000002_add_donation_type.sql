CREATE TYPE donation_type_enum AS ENUM ('One-Time', 'Monthly');

ALTER TABLE public.donations 
ADD COLUMN donation_type donation_type_enum NOT NULL DEFAULT 'One-Time';
