import RichText from "./RichText";
import Heading from "./Heading";
import Image from "./Image";
import Callout from "./Callout";

export default function ArticleRenderer({
  blocks = [],
}) {

  return (

    <>

      {blocks.map((block) => {

        switch (block.type) {

          case "richtext":

            return (

              <RichText
                key={block.id}
                data={block.data}
              />

            );

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

            return null;

        }

      })}

    </>

  );

}