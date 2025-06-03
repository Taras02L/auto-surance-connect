
export interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ClientRequestWithProfile {
  id: string;
  user_id: string;
  request_type: string;
  category: string;
  description: string;
  status: string;
  admin_response: string | null;
  created_at: string;
  updated_at: string;
  profiles: UserProfile | null;
}
