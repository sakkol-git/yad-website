export interface Donor {
  id: string;
  name: string;
  email?: string;
  amount?: number;
  donation_date?: string;
  description?: string;
  is_public: boolean;
  status: 'Active' | 'Archived';
  created_at: string;
  updated_at: string;
}
