import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { AuthRepository } from "../repositories/auth";

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async login(supabase: SupabaseClient<Database>, email: string, password: string) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    let role = "user";
    if (authData.user) {
      const roleData = await this.repository.getUserRole(supabase, authData.user.id);
      if (roleData) {
        role = roleData.role;
      }
    }

    return { user: authData.user, role };
  }

  async register(
    supabase: SupabaseClient<Database>,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async logout(supabase: SupabaseClient<Database>) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async signInWithGoogle(supabase: SupabaseClient<Database>, redirectTo: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }
}

export const authService = new AuthService();
