import { Box, Fade, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Prism from 'prismjs';
import 'prismjs/components/prism-python'; // Add the required language
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css'; // Choose your theme
import { useEffect } from 'react';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';
import ImageURLs from '@/assets/urls';

import markdownStyles from './TextMessage.module.css';
import styles from './styles';

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting
  }, [message]);

  return (
    <Fade in>
      <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
        <Grid {...styles.messageWrapperProps(isMyMessage)}>
          {!isMyMessage && (
            <Box>
              <Image
                width={39}
                height={39}
                src={ImageURLs.MarvelCircleAvatar}
                alt="Marvel AI"
              />
            </Box>
          )}
          <Typography {...styles.messageProps()}>
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, emoji]}
              className={`${markdownStyles['markdown-body']} `}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <pre className={`language-${match[1]}`}>
                      <code className={`language-${match[1]}`} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
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