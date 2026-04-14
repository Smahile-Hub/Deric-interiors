import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Begin your transformation. Book an initial consultation with Dric Interior and let us redefine the boundaries of your sanctuary.",
  pathname: "/contact",
});

const locations = [
  {
    city: "Lagos",
    address: "6ix Unity Road, Ikeja",
    state: "Lagos, Nigeria",
    phone: "+234 812 345 6789",
    whatsapp: "+234 812 345 6789",
  },
  {
    city: "Abuja",
    address: "14 Cadastral Zone, Wuse 2",
    state: "Abuja, Nigeria",
    phone: "+234 903 456 7890",
    whatsapp: "+234 903 456 7890",
  },
];

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dric Interior",
    description:
      "Book an initial consultation with Dric Interior. We craft bespoke luxury interiors across Lagos and Abuja.",
    url: toAbsoluteUrl("/contact"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ContactExperience locations={locations} />
    </>
  );
}
