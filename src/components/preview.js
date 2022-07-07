import React, { useDeferredValue } from "react";
import TextContext from "../textContext";
import { useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function PreviewBlock() {
  const { text } = useContext(TextContext);
  const defferedText = useDeferredValue(text, { timeoutMs: 5000 });
  { console.log(defferedText) }
  return (
    <div id="Preview">
      <div className="blockTitle">What a wonderful result!</div>
      <div className="markText">
        <ReactMarkdown
          children={defferedText}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={docco}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>
    </div>
  )
}
export default PreviewBlock;