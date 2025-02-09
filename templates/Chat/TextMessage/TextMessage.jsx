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
