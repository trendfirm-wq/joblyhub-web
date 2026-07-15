import Paragraph from "./Paragraph";
import Heading from "./Heading";
import Image from "./Image";
import Callout from "./Callout";

export default function ArticleRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return (
              <Heading
                key={block.id}
                data={block.data}
              />
            );

          case "image":
            return (
              <Image
                key={block.id}
                data={block.data}
              />
            );

          case "callout":
            return (
              <Callout
                key={block.id}
                data={block.data}
              />
            );

          default:
            return (
              <Paragraph
                key={block.id}
                data={block.data}
              />
            );
        }
      })}
    </>
  );
}