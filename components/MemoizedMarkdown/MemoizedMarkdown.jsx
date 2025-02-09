import "../../templates/Chat/TextMessage/markdown.module.css";
/* eslint-disable prettier/prettier */
import { memo } from "react";

// eslint-disable-next-line prettier/prettier
import ReactMarkdown from "react-markdown";

const MemoizedMarkdown = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

export default MemoizedMarkdown;
