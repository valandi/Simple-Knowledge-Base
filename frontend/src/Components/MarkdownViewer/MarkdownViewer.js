import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import gfm from 'remark-gfm'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'

// props: markdown, 
function MarkdownViewer(props) {

    return (
        <ReactMarkdown
            children={props.markdown}
            remarkPlugins={[gfm]}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dracula}
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
        ></ReactMarkdown>
    )
}
export default MarkdownViewer;