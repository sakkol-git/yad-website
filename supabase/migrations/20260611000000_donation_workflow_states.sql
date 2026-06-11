-- Update donation_status ENUM
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Draft';
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Pending Payment';
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Processing';
