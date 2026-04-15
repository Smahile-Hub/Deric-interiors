import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;

function isBlobStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file was provided." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image is too large. Please upload an image under 4MB." },
        { status: 400 },
      );
    }

    const originalName = sanitizeFilename(file.name || "upload");
    const extension = path.extname(originalName) || ".png";
    const filename = `${Date.now()}-${randomUUID()}${extension}`;

    if (isBlobStorageConfigured()) {
      const blob = await put(`admin/uploads/${filename}`, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: file.type,
      });

      return NextResponse.json({
        url: blob.url,
        filename: blob.pathname,
      });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "admin");
    const outputPath = path.join(uploadDir, filename);
    const arrayBuffer = await file.arrayBuffer();

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(arrayBuffer));

    return NextResponse.json({
      url: `/uploads/admin/${filename}`,
      filename,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to upload this image right now." },
      { status: 500 },
    );
  }
}
