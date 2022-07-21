import { useState } from 'react';

// Markdown Lib
import ReactMarkdown from 'react-markdown';

// Components
import MarkdownPreview from './MarkdownPreview';
import MarkdownEditor from './MarkdownEditor';

export default function Markdown({ currentMarkdown, content, setContent }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  return (
    <>
      {!isPreviewVisible && (
        <MarkdownEditor
          content={content}
          setContent={setContent}
          currentMarkdown={currentMarkdown}
          setIsPreviewVisible={setIsPreviewVisible}
        />
      )}

      {isPreviewVisible && (
        <MarkdownPreview setIsPreviewVisible={setIsPreviewVisible}>
          <ReactMarkdown>{content || currentMarkdown.content}</ReactMarkdown>
        </MarkdownPreview>
      )}
    </>
  );
}
