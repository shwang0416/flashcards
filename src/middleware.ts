import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 세션 새로고침
  // https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  //   //   세션이 없는 유저 -> 로그인

  if (!isAuthPage(request) && !user) {
    // console.log(`middleware: no user`);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return response;
}

const isAuthPage = (req: NextRequest) =>
  req.nextUrl.pathname.startsWith("/sign-in") ||
  req.nextUrl.pathname.startsWith("/sign-up") ||
  req.nextUrl.pathname.startsWith("/reset-password") ||
  req.nextUrl.pathname.startsWith("/update-password");

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
