-- ==========================================
-- Phase 7: RLS Policies & Database Indexes
-- ==========================================

-- 1. Enable RLS on all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE annual_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_applications ENABLE ROW LEVEL SECURITY;

-- 2. Define Public Read Access (for tables that power the public site)
CREATE POLICY "Public read access for members" ON members FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access for programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public read access for partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read access for annual_reports" ON annual_reports FOR SELECT USING (true);

-- 3. Define Public Insert Access (for forms)
CREATE POLICY "Public insert access for donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for event_volunteers" ON event_volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for student_applications" ON student_applications FOR INSERT WITH CHECK (true);

-- Note: The Service Role Key (used by `createAdminClient()`) bypasses RLS completely.
-- Therefore, Admin CRUD operations from Next.js server actions will continue to work seamlessly.

-- 4. Database Optimization: Indexes
-- Creating indexes on frequently queried or filtered columns to optimize read performance at scale.

-- Status filtering indexes
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_student_applications_status ON student_applications(status);

-- Created At sorting indexes (used heavily in admin tables)
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_student_applications_created_at ON student_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_annual_reports_year ON annual_reports(year DESC);

-- Foreign Key / Relationship indexes
CREATE INDEX IF NOT EXISTS idx_event_volunteers_event_id ON event_volunteers(event_id);
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);
