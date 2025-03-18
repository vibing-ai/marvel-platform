import { useTheme } from '@emotion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from './styles';

const CodeComponent = (props) => {
  const { children, className, node, ...rest } = props;
  const theme = useTheme();

  const languageMatch = /language-(\w+)/.exec(className || '');

  if (languageMatch) {
    const language = languageMatch[1];
    return (
      (<SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={language}
                  style={duotoneDark}
                >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>)
    );
  }

  return (
    <code {...rest} style={styles.codeStyles(theme)}>
      {children}
    </code>
  );
};

export default CodeComponent;
