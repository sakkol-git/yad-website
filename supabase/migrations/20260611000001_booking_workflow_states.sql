-- 20260611000001_booking_workflow_states.sql

-- Add missing states to booking_status enum
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Inquiry' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Availability Review' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Pending Confirmation' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Payment Pending' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Confirmed' AFTER 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'No Show' AFTER 'Cancelled';
