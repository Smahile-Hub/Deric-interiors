import { NextRequest, NextResponse } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";

import { createPrismicClient } from "@/lib/prismic";

export async function GET(request: NextRequest) {
  const client = createPrismicClient();

  if (!client) {
    return NextResponse.json(
      { error: "Set PRISMIC_REPOSITORY_NAME to enable previews." },
      { status: 500 },
    );
  }

  return redirectToPreviewURL({ client, request });
}
