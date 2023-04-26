import React from "react";
import MarkdownToJSX from "markdown-to-jsx";
import { H1, H2, H3, H4, H5, Paragraph } from "~/components/Atoms/Typography";
export const Markdown: React.FC<{ children: string }> = ({ ...props }) => {
  return (
    <MarkdownToJSX
      {...props}
      options={{
        overrides: {
          h1: {
            component: H1,
            props: {
              className: "my-6",
            },
          },
          h2: {
            component: H2,
            props: {
              className: "my-6",
            },
          },
          h3: {
            component: H3,
            props: {
              className: "my-3",
            },
          },
          h4: {
            component: H4,
            props: {
              className: "my-3",
            },
          },
          h5: {
            component: H5,
            props: {
              className: "my-3",
            },
          },
          p: {
            component: Paragraph,
            props: {
              className: "my-1",
            },
          },
        },
      }}
    >
      {props.children}
    </MarkdownToJSX>
  );
};
