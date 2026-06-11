export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          user_id: string
          role: 'admin' | 'manager' | 'user'
          created_at: string
        }
        Insert: {
          user_id: string
          role?: 'admin' | 'manager' | 'user'
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: 'admin' | 'manager' | 'user'
          created_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          type: 'Founder' | 'Resident' | 'Alumni'
          status: 'Active' | 'Inactive' | 'Pending' | 'Archived'
          bio: string | null
          avatar_url: string | null
          slug: string | null
          role: string | null
          profile: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          type?: 'Founder' | 'Resident' | 'Alumni'
          status?: 'Active' | 'Inactive' | 'Pending' | 'Archived'
          bio?: string | null
          avatar_url?: string | null
          slug?: string | null
          role?: string | null
          profile?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          type?: 'Founder' | 'Resident' | 'Alumni'
          status?: 'Active' | 'Inactive' | 'Pending' | 'Archived'
          bio?: string | null
          avatar_url?: string | null
          slug?: string | null
          role?: string | null
          profile?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string | null
          start_date: string | null
          end_date: string | null
          capacity: number | null
          status: 'Active' | 'Upcoming' | 'Completed' | 'Archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string | null
          start_date?: string | null
          end_date?: string | null
          capacity?: number | null
          status?: 'Active' | 'Upcoming' | 'Completed' | 'Archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string | null
          start_date?: string | null
          end_date?: string | null
          capacity?: number | null
          status?: 'Active' | 'Upcoming' | 'Completed' | 'Archived'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      // Add other tables as needed based on schema...
      events: {
        Row: {
            id: string
            name: string
            description: string | null
            venue: string | null
            capacity: number | null
            status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
            slug: string | null
            date: string | null
            image_url: string | null
            image_alt: string | null
            action_label: string | null
            action_icon: string | null
            join_url: string | null
            donation_url: string | null
            created_at: string
            updated_at: string
        }
        Insert: {
            id?: string
            name: string
            description?: string | null
            venue?: string | null
            capacity?: number | null
            status?: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
            slug?: string | null
            date?: string | null
            image_url?: string | null
            image_alt?: string | null
            action_label?: string | null
            action_icon?: string | null
            join_url?: string | null
            donation_url?: string | null
            created_at?: string
            updated_at?: string
        }
        Update: {
            id?: string
            name?: string
            description?: string | null
            venue?: string | null
            capacity?: number | null
            status?: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
            slug?: string | null
            date?: string | null
            image_url?: string | null
            image_alt?: string | null
            action_label?: string | null
            action_icon?: string | null
            join_url?: string | null
            donation_url?: string | null
            created_at?: string
            updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          id: string
          name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          partnership_type: string | null
          notes: string | null
          logo_url: string | null
          icon: string | null
          category: string | null
          website_url: string | null
          featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          partnership_type?: string | null
          notes?: string | null
          logo_url?: string | null
          icon?: string | null
          category?: string | null
          website_url?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          partnership_type?: string | null
          notes?: string | null
          logo_url?: string | null
          icon?: string | null
          category?: string | null
          website_url?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      donors: {
        Row: {
          id: string
          name: string
          email: string | null
          amount: number | null
          donation_date: string | null
          description: string | null
          is_public: boolean | null
          status: 'Active' | 'Archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          amount?: number | null
          donation_date?: string | null
          description?: string | null
          is_public?: boolean | null
          status?: 'Active' | 'Archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          amount?: number | null
          donation_date?: string | null
          description?: string | null
          is_public?: boolean | null
          status?: 'Active' | 'Archived'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          id: string
          donor_name: string
          donor_id: string | null
          email: string | null
          phone: string | null
          country: string | null
          amount: number
          donation_type: 'One-Time' | 'Monthly'
          is_anonymous: boolean
          message: string | null
          method: 'card' | 'khqr' | 'cash' | 'bank_transfer' | null
          status: 'Draft' | 'Pending Payment' | 'Processing' | 'Completed' | 'Failed' | 'Refunded'
          reference_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          donor_name: string
          donor_id?: string | null
          email?: string | null
          phone?: string | null
          country?: string | null
          amount: number
          donation_type?: 'One-Time' | 'Monthly'
          is_anonymous?: boolean
          message?: string | null
          method?: 'card' | 'khqr' | 'cash' | 'bank_transfer' | null
          status?: 'Draft' | 'Pending Payment' | 'Processing' | 'Completed' | 'Failed' | 'Refunded'
          reference_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          donor_name?: string
          donor_id?: string | null
          email?: string | null
          phone?: string | null
          country?: string | null
          amount?: number
          donation_type?: 'One-Time' | 'Monthly'
          is_anonymous?: boolean
          message?: string | null
          method?: 'card' | 'khqr' | 'cash' | 'bank_transfer' | null
          status?: 'Draft' | 'Pending Payment' | 'Processing' | 'Completed' | 'Failed' | 'Refunded'
          reference_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          guest_name: string
          guest_id: string | null
          email: string
          phone: string
          country: string | null
          check_in: string
          check_out: string
          guests_count: number
          room_preference: string | null
          special_request: string | null
          room_id: string | null
          status: 'Inquiry' | 'Availability Review' | 'Pending Confirmation' | 'Payment Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'No Show'
          payment_status: 'Pending' | 'Paid' | 'Refunded'
          payment_method: 'khqr' | 'stripe' | null
          amount: number | null
          booking_reference: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          guest_name: string
          guest_id?: string | null
          email: string
          phone: string
          country?: string | null
          check_in: string
          check_out: string
          guests_count: number
          room_preference?: string | null
          special_request?: string | null
          room_id?: string | null
          status?: 'Inquiry' | 'Availability Review' | 'Pending Confirmation' | 'Payment Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'No Show'
          payment_status?: 'Pending' | 'Paid' | 'Refunded'
          payment_method?: 'khqr' | 'stripe' | null
          amount?: number | null
          booking_reference?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          guest_name?: string
          guest_id?: string | null
          email?: string
          phone?: string
          country?: string | null
          check_in?: string
          check_out?: string
          guests_count?: number
          room_preference?: string | null
          special_request?: string | null
          room_id?: string | null
          status?: 'Inquiry' | 'Availability Review' | 'Pending Confirmation' | 'Payment Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'No Show'
          payment_status?: 'Pending' | 'Paid' | 'Refunded'
          payment_method?: 'khqr' | 'stripe' | null
          amount?: number | null
          booking_reference?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [key: string]: any
    }
    Functions: {
      [key: string]: any
    }
    Enums: {
      [key: string]: any
    }
    CompositeTypes: {
      [key: string]: any
    }
  }
}
