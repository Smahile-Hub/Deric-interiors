import { unstable_noStore as noStore } from "next/cache";

import { getEditableSiteContent } from "@/lib/editable-content";

export async function getAboutPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.about;
}

export async function getServicesPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.services;
}

export async function getServiceDetailPageContent(slug: string) {
  noStore();
  const content = await getEditableSiteContent();
  return content.serviceDetails[slug] ?? null;
}

export async function getProjectsPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.projects;
}

export async function getContactPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.contact;
}

export async function getPrivacyPolicyPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.privacyPolicy;
}

export async function getReturnPolicyPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.returnPolicy;
}

export async function getTestimonialsPageContent() {
  noStore();
  const content = await getEditableSiteContent();
  return content.testimonials;
}
