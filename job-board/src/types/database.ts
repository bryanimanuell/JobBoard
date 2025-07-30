/* eslint-disable */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string | null
          company_id: string
          id: string
          job_id: string
          status: string | null
          submitted_cv_path: string
          user_id: string
          relatives: string | null
          years_of_experience: number | null
          cover_letter: string | null
        }
        Insert: {
          applied_at?: string | null
          company_id: string
          id?: string
          job_id: string
          status?: string | null
          submitted_cv_path: string
          user_id: string
          relatives?: string | null
          years_of_experience?: number | null
          cover_letter?: string | null
        }
        Update: {
          applied_at?: string | null
          company_id?: string
          id?: string
          job_id?: string
          status?: string | null
          submitted_cv_path?: string
          user_id?: string
          relatives?: string | null
          years_of_experience?: number | null
          cover_letter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          company_description: string | null
          company_fields: string | null
          id: string
          is_verified: boolean | null
          name: string
          owned_by: string | null
          total_employees: string | null
          website_url: string | null
        }
        Insert: {
          company_description?: string | null
          company_fields?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
          owned_by?: string | null
          total_employees?: string | null
          website_url?: string | null
        }
        Update: {
          company_description?: string | null
          company_fields?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
          owned_by?: string | null
          total_employees?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          address: string | null
          city: string | null
          company_id: string | null
          company_name: string | null
          created_at: string
          responsibilities: string | null
          qualifications: string | null
          experience_level: string | null
          id: string
          job_type: string | null
          salary: number | null
          title: string | null
          status: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          created_at?: string
          responsibilities?: string | null
          qualifications?: string | null
          experience_level?: string | null
          id?: string
          job_type?: string | null
          salary?: number | null
          title?: string | null
          status?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          created_at?: string
          responsibilities?: string | null
          qualifications?: string | null
          experience_level?: string | null
          id?: string
          job_type?: string | null
          salary?: number | null
          title?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          phone: number | null
          role: string | null
        }
        Insert: {
          full_name?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: number | null
          role?: string | null
        }
        Update: {
          full_name?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: number | null
          role?: string | null
        }
        Relationships: []
      }
      user_cvs: {
        Row: {
          created_at: string | null
          cv_name: string | null
          file_path: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          cv_name?: string | null
          file_path: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          cv_name?: string | null
          file_path?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_applications_for_company: {
        Args: { company_uuid: string }
        Returns: {
          id: string
          status: string
          applied_at: string
          job_title: string
          applicant_name: string
          applicant_email: string
          applicant_phone: string
          applicant_linkedin: string
          applicant_github: string
          relatives: string
          years_of_experience: number
          cover_letter: string
          submitted_cv_path: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
