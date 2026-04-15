import type { IconName } from "@/types/site";

export function getIconChoices(): Array<{ value: IconName; label: string }> {
  return [
    { value: "facebook", label: "Facebook" },
    { value: "x-twitter", label: "X / Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "aperture", label: "Aperture" },
    { value: "grid", label: "Grid" },
    { value: "shopping-bag", label: "Shopping Bag" },
    { value: "mail", label: "Mail" },
    { value: "phone", label: "Phone" },
    { value: "package", label: "Package" },
    { value: "alert-circle", label: "Alert Circle" },
    { value: "refresh-cw", label: "Refresh" },
    { value: "message-square", label: "Message Square" },
    { value: "shield", label: "Shield" },
  ];
}
