import type { JwtPayload } from "@supabase/supabase-js";

type Claims =
  | (JwtPayload & {
      sub: string;
      role: string;
      user_metadata?: {
        email: string;
        email_verified: boolean;
        phone_verified: boolean;
        sub: string;
        username: string;
      };
    })
  | null;
