import { notFound } from "next/navigation";

import {
  getAdminSectionDefinition,
  getEditableContentSection,
  isEditableAdminSectionKey,
} from "@/lib/editable-content";

import { AdminSectionEditor } from "../AdminSectionEditor";
import styles from "../admin.module.css";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isEditableAdminSectionKey(section)) {
    notFound();
  }

  const definition = getAdminSectionDefinition(section);

  if (!definition) {
    notFound();
  }

  const data = await getEditableContentSection(section);

  return (
    <div className={styles.adminPage}>
      <div className={styles.shell}>
        <AdminSectionEditor
          section={section}
          title={definition.title}
          description={definition.description}
          initialData={data}
        />
      </div>
    </div>
  );
}
