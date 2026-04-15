import { NextRequest, NextResponse } from "next/server";

import {
  isEditableAdminSectionKey,
  saveEditableContentSection,
} from "@/lib/editable-content";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ section: string }> },
) {
  const { section } = await context.params;

  if (!isEditableAdminSectionKey(section)) {
    return NextResponse.json({ error: "Unknown admin section." }, { status: 404 });
  }

  try {
    const body = await request.json();
    await saveEditableContentSection(section, body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to save this content right now." },
      { status: 500 },
    );
  }
}
