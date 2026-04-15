"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";

import { getIconChoices } from "@/lib/icon-choices";
import type { EditableImage } from "@/types/site";

import styles from "./admin.module.css";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type PathPart = string | number;

function formatLabel(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function getAtPath(value: JsonValue, path: PathPart[]) {
  return path.reduce<JsonValue>((current, part) => {
    if (Array.isArray(current)) {
      return current[part as number];
    }

    return (current as Record<string, JsonValue>)[part as string];
  }, value);
}

function updateAtPath(value: JsonValue, path: PathPart[], nextValue: JsonValue): JsonValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...rest] = path;

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      index === head ? updateAtPath(item, rest, nextValue) : item,
    );
  }

  return {
    ...(value as Record<string, JsonValue>),
    [head]: updateAtPath(
      (value as Record<string, JsonValue>)[head as string],
      rest,
      nextValue,
    ),
  };
}

function removeArrayItem(value: JsonValue, path: PathPart[], indexToRemove: number): JsonValue {
  const target = getAtPath(value, path);

  if (!Array.isArray(target)) {
    return value;
  }

  return updateAtPath(
    value,
    path,
    target.filter((_, index) => index !== indexToRemove),
  );
}

function makeEmptyLike(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    const sample = value[0];
    return sample === undefined ? [] : [makeEmptyLike(sample)];
  }

  if (value === null) {
    return "";
  }

  switch (typeof value) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "string":
      return "";
    case "object":
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, makeEmptyLike(item)]),
      ) as JsonValue;
    default:
      return "";
  }
}

function appendArrayItem(value: JsonValue, path: PathPart[]): JsonValue {
  const target = getAtPath(value, path);

  if (!Array.isArray(target)) {
    return value;
  }

  const sample = target[0];
  const nextItem = sample === undefined ? "" : makeEmptyLike(sample);
  return updateAtPath(value, path, [...target, nextItem]);
}

function shouldUseTextarea(field: string, value: string) {
  const normalized = field.toLowerCase();
  return (
    normalized.includes("description") ||
    normalized.includes("summary") ||
    normalized.includes("quote") ||
    normalized.includes("overview") ||
    normalized.includes("body") ||
    normalized.includes("copy") ||
    normalized.includes("caption") ||
    normalized.includes("message") ||
    normalized.includes("excerpt") ||
    value.length > 90 ||
    value.includes("\n")
  );
}

function isEditableImageObject(value: JsonValue): value is EditableImage {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "url" in value &&
    "alt" in value &&
    "width" in value &&
    "height" in value
  );
}

function isUploadableImageField(field: string) {
  const normalized = field.toLowerCase();
  return normalized === "url" || normalized === "src" || normalized === "image";
}

async function readImageDimensions(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new window.Image();

      image.onload = () => {
        resolve({
          width: image.naturalWidth || 0,
          height: image.naturalHeight || 0,
        });
      };

      image.onerror = () => reject(new Error("image_load_failed"));
      image.src = objectUrl;
    });

    return dimensions;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function uploadImageFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("upload_failed");
  }

  return (await response.json()) as { url: string };
}

type ImageStringFieldProps = {
  field: string;
  value: string;
  onChange: (value: string) => void;
};

function ImageStringField({ field, value, onChange }: ImageStringFieldProps) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadState("uploading");

    try {
      const upload = await uploadImageFile(file);
      onChange(upload.url);
      setUploadState("idle");
    } catch {
      setUploadState("error");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className={styles.imageField}>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{formatLabel(field)}</span>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <div className={styles.uploadRow}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => inputRef.current?.click()}
          disabled={uploadState === "uploading"}
        >
          {uploadState === "uploading" ? "Uploading..." : "Upload from device"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handleFileChange}
        />
        {uploadState === "error" ? (
          <span className={styles.inlineError}>Upload failed. Please try again.</span>
        ) : null}
      </div>
      {value ? (
        <div className={styles.imagePreviewFrame}>
          <img src={value} alt="" className={styles.imagePreview} />
        </div>
      ) : null}
    </div>
  );
}

type EditableImageFieldProps = {
  field: string;
  value: EditableImage;
  onChange: (value: EditableImage) => void;
};

function EditableImageField({ field, value, onChange }: EditableImageFieldProps) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadState("uploading");

    try {
      const [upload, dimensions] = await Promise.all([
        uploadImageFile(file),
        readImageDimensions(file),
      ]);

      onChange({
        ...value,
        url: upload.url,
        alt: value.alt || file.name.replace(/\.[^.]+$/, ""),
        width: dimensions.width || value.width,
        height: dimensions.height || value.height,
      });
      setUploadState("idle");
    } catch {
      setUploadState("error");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className={styles.group}>
      <div className={styles.groupHeader}>
        <h3 className={styles.groupTitle}>{formatLabel(field)}</h3>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => inputRef.current?.click()}
          disabled={uploadState === "uploading"}
        >
          {uploadState === "uploading" ? "Uploading..." : "Upload from device"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />
      <div className={styles.imageObjectGrid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Image URL</span>
          <input
            type="text"
            className={styles.input}
            value={value.url}
            onChange={(event) => onChange({ ...value, url: event.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Alt Text</span>
          <input
            type="text"
            className={styles.input}
            value={value.alt}
            onChange={(event) => onChange({ ...value, alt: event.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Width</span>
          <input
            type="number"
            className={styles.input}
            value={value.width}
            onChange={(event) =>
              onChange({ ...value, width: Number(event.target.value) || value.width })
            }
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Height</span>
          <input
            type="number"
            className={styles.input}
            value={value.height}
            onChange={(event) =>
              onChange({ ...value, height: Number(event.target.value) || value.height })
            }
          />
        </label>
      </div>
      {uploadState === "error" ? (
        <p className={styles.inlineError}>Upload failed. Please try again.</p>
      ) : null}
      {value.url ? (
        <div className={styles.imagePreviewFrame}>
          <img src={value.url} alt={value.alt} className={styles.imagePreview} />
        </div>
      ) : null}
    </section>
  );
}

type PrimitiveFieldProps = {
  field: string;
  value: string | number | boolean | null;
  onChange: (value: JsonValue) => void;
};

function PrimitiveField({ field, value, onChange }: PrimitiveFieldProps) {
  const iconChoices = useMemo(() => getIconChoices(), []);
  const normalized = field.toLowerCase();

  if (typeof value === "boolean") {
    return (
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{formatLabel(field)}</span>
      </label>
    );
  }

  if (normalized === "icon") {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{formatLabel(field)}</span>
        <select
          className={styles.input}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        >
          {iconChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{formatLabel(field)}</span>
        <input
          type="number"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }

  const stringValue = typeof value === "string" ? value : "";

  if (isUploadableImageField(normalized)) {
    return <ImageStringField field={field} value={stringValue} onChange={onChange} />;
  }

  const type =
    normalized.includes("email") ? "email" : normalized.includes("phone") ? "tel" : "text";

  if (normalized.includes("color")) {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{formatLabel(field)}</span>
        <div className={styles.colorRow}>
          <input
            type="color"
            className={styles.colorInput}
            value={stringValue || "#000000"}
            onChange={(event) => onChange(event.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </label>
    );
  }

  if (shouldUseTextarea(field, stringValue)) {
    return (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{formatLabel(field)}</span>
        <textarea
          className={styles.textarea}
          rows={4}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{formatLabel(field)}</span>
      <input
        type={type}
        className={styles.input}
        value={stringValue}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type AdminSectionEditorProps = {
  section: string;
  title: string;
  description: string;
  initialData: JsonValue;
};

export function AdminSectionEditor({
  section,
  title,
  description,
  initialData,
}: AdminSectionEditorProps) {
  const [draft, setDraft] = useState<JsonValue>(() => structuredClone(initialData));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function renderNode(field: string, value: JsonValue, path: PathPart[] = []): ReactNode {
    if (Array.isArray(value)) {
      return (
        <section className={styles.group} key={path.join(".") || field}>
          <div className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>{formatLabel(field)}</h3>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setDraft((current) => appendArrayItem(current, path))}
            >
              Add item
            </button>
          </div>
          <div className={styles.arrayStack}>
            {value.map((item, index) => (
              <div key={`${field}-${index}`} className={styles.arrayItem}>
                <div className={styles.arrayItemHeader}>
                  <strong>{formatLabel(field)} {index + 1}</strong>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() =>
                      setDraft((current) => removeArrayItem(current, path, index))
                    }
                  >
                    Remove
                  </button>
                </div>
                {renderNode(`${field}-${index}`, item, [...path, index])}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (isEditableImageObject(value)) {
      return (
        <EditableImageField
          key={path.join(".") || field}
          field={field}
          value={value}
          onChange={(nextValue) =>
            setDraft((current) => updateAtPath(current, path, nextValue))
          }
        />
      );
    }

    if (value && typeof value === "object") {
      return (
        <section className={styles.group} key={path.join(".") || field}>
          {path.length ? <h3 className={styles.groupTitle}>{formatLabel(field)}</h3> : null}
          <div className={styles.fieldGrid}>
            {Object.entries(value).map(([key, child]) =>
              renderNode(key, child, [...path, key]),
            )}
          </div>
        </section>
      );
    }

    return (
      <PrimitiveField
        key={path.join(".")}
        field={field}
        value={value}
        onChange={(nextValue) =>
          setDraft((current) => updateAtPath(current, path, nextValue))
        }
      />
    );
  }

  async function handleSave() {
    setStatus("saving");

    try {
      const response = await fetch(`/api/admin/${section}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) {
        throw new Error("save_failed");
      }

      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div className={styles.topBar}>
        <Link href="/admin" className={styles.backLink}>
          Back to dashboard
        </Link>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setDraft(structuredClone(initialData))}
          >
            Reset changes
          </button>
          <button type="button" className={styles.primaryButton} onClick={handleSave}>
            {status === "saving" ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <header className={styles.editorHeader}>
        <p className={styles.eyebrow}>Admin Editor</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.status}>
          {status === "saved" ? "Saved successfully." : null}
          {status === "error" ? "Something went wrong while saving." : null}
        </p>
      </header>

      <div className={styles.editorBody}>{renderNode(title, draft)}</div>
    </>
  );
}
