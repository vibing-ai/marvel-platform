import { Box, Fade, Grid, Typography } from "@mui/material";
import Image from "next/image";
import emoji from "remark-emoji";
import remarkGfm from "remark-gfm";

import MemoizedReactMarkdown from "@/components/MemoizedMarkdown";

import ImageURLs from "@/assets/urls";

import CodeComponent from "../CodeComponent";

import markdownStyles from "./markdown.module.css";

import styles from "./styles";

// class names of markdown content rendered
const MarkdownComponents = {
  code: CodeComponent,
  p: ({ children }) => <p className={markdownStyles.p}>{children}</p>,
  strong: ({ children }) => (
    <strong className={markdownStyles.strong}>{children}</strong>
  ),
  h1: ({ children }) => <h1 className={markdownStyles.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={markdownStyles.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={markdownStyles.h3}>{children}</h3>,
  h4: ({ children }) => <h4 className={markdownStyles.h4}>{children}</h4>,
  h5: ({ children }) => <h5 className={markdownStyles.h5}>{children}</h5>,
  h6: ({ children }) => <h6 className={markdownStyles.h6}>{children}</h6>,
  ul: ({ children }) => <ul className={markdownStyles.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={markdownStyles.ol}>{children}</ol>,
  table: ({ children }) => (
    <table className={markdownStyles.table}>{children}</table>
  ),
  th: ({ children }) => <th className={markdownStyles.th}>{children}</th>,
  td: ({ children }) => <td className={markdownStyles.td}>{children}</td>,
  blockquote: ({ children }) => (
    <blockquote className={markdownStyles.blockquote}>{children}</blockquote>
  ),
  alert: ({ children }) => (
    <div className={markdownStyles.markdownAlert}>{children}</div>
  ),
};

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  return (
    <Fade in>
      <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
        <Grid {...styles.messageWrapperProps(isMyMessage)}>
          {!isMyMessage && (
            <Box>
              <Image
                width="38.74px"
                height="38.74px"
                src={ImageURLs.MarvelCircleAvatar}
                alt="Marvel AI"
              />
            </Box>
          )}
          <Typography {...styles.messageProps()}>
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, emoji]}
              components={MarkdownComponents}
            >
              {message}
            </MemoizedReactMarkdown>
          </Typography>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default TextMessage;
