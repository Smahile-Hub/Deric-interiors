import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { BookAppointmentExperience } from "./BookAppointmentExperience";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description:
    "Schedule a personalized interior design consultation with Dric Interior. Whether you're planning a full renovation or a simple update, we're here to bring your vision to life.",
  pathname: "/book-appointment",
});

export default function BookAppointmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Book a Design Appointment — Dric Interior",
    description:
      "Schedule a personalized consultation with our interior design team. We craft bespoke luxury interiors across Lagos and Abuja.",
    url: toAbsoluteUrl("/book-appointment"),
    provider: {
      "@type": "LocalBusiness",
      name: "Dric Interior",
    },
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <BookAppointmentExperience />
    </>
  );
}
