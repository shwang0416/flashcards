import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getUserAction from "./adaptor/serverActions/auth/getUserAction";
import getCardIdListAction from "./adaptor/serverActions/getCardIdListAction";
import getLinkedList from "./util/getLinkedList";

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

  if (isPlayCardsPage(request)) {
    const user = await getUserAction();
    if (!user) throw new Error("ERROR: no user");

    const cards = await getCardIdListAction({ userId: user.id });
    const cardIds = cards.map((elem) => elem.id);
    const cardLinkedList = getLinkedList(cardIds);
    // 링크드리스트를 쿠키에 보관
    response.cookies.set("card-list", JSON.stringify(cardLinkedList));

    // FIXME: 시작하는 카드도 랜덤으로 바꾸기
    response.cookies.set("first-card-id", cardIds[0]);
  }

  return response;
}

const isAuthPage = (req: NextRequest) =>
  req.nextUrl.pathname.startsWith("/sign-in") ||
  req.nextUrl.pathname.startsWith("/sign-up") ||
  req.nextUrl.pathname.startsWith("/reset-password") ||
  req.nextUrl.pathname.startsWith("/update-password");

const isPlayCardsPage = (req: NextRequest) =>
  req.nextUrl.pathname.startsWith("/play-cards");

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
