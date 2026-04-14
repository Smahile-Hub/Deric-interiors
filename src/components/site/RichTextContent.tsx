import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";

type RichTextContentProps = {
  field: RichTextField;
  className?: string;
};

export function RichTextContent({
  field,
  className,
}: RichTextContentProps) {
  return (
    <div className={className}>
      <PrismicRichText field={field} />
    </div>
  );
}
