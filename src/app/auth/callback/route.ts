import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(req.url);

  const code = req.nextUrl.searchParams.get("code");
  const redirect = req.nextUrl.searchParams.get("redirect");

  if (code) {
    if (code) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.set({ name, value: "", ...options });
            },
          },
        },
      );
      await supabase.auth.exchangeCodeForSession(code);
    }

    if (redirect) {
      const redirectUrl = new URL(redirect, req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin);
  }
}
