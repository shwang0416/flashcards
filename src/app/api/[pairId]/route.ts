import getPairs from "@/adaptor/serverActions/getPairsAction";
import { NextResponse } from "next/server";

interface Context {
  params: {
    pairId: string;
  };
}

export async function GET(_req: Request, { params }: Context) {
  const { pairId } = params;
  const pairs = await getPairs();
  const cardIds = pairs.filter((pair) => pair.id === pairId)[0].cardIds;
  return NextResponse.json({ cardIds });
}
