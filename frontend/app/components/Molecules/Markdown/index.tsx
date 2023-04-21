import React from "react";
import Markdown from "markdown-to-jsx";
import { H1, H2, H3, H4, H5, Paragraph } from "~/components/Atoms/Typography";
export const MarkdownComponent: React.FC<{ children: string }> = ({
  ...props
}) => {
  return (
    <Markdown
      {...props}
      options={{
        overrides: {
          h1: {
            component: H1,
            props: {
              className: "mb-6",
            },
          },
          h2: {
            component: H2,
            props: {
              className: "mb-6",
            },
          },
          h3: {
            component: H3,
          },
          h4: {
            component: H4,
          },
          h5: {
            component: H5,
          },
          p: {
            component: Paragraph,
          },
        },
      }}
    >
      {props.children}
    </Markdown>
  );
};
