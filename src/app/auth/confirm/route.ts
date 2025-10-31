import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

function isSafeRedirect(url: string, allowedHost: string): boolean {
  if (!url || url === '/') {
    // This is a safe redirect
    return true;
  }

  try {
    const nextUrl = new URL(url, `https://${allowedHost}`); // Base URL to parse relative URLs

    if (nextUrl.hostname && nextUrl.hostname !== allowedHost) {
      // It is not allowed to redirect to external domains
      return false;
    }

    if (nextUrl.protocol !== "http:" && nextUrl.protocol !== "https:") {
      return false;
    }

    if (url.startsWith('/')) {
      // Allow a relative path without hostname
      return true;
    }

    return nextUrl.hostname === allowedHost;

  } catch (e) {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const allowedHost = request.nextUrl.hostname;

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      if (isSafeRedirect(next, allowedHost)) {
        redirect(next); // redirect user to specified redirect URL
      } else {
        redirect('/');
      }
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
