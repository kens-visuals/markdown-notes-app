import { useState } from 'react';

// ScrollSync Lib
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

// Markdown Lib
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Components
import MarkdownPreview from './MarkdownPreview';
import MarkdownEditor from './MarkdownEditor';

export default function Markdown({ currentMarkdown, content, setContent }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  return (
    <>
      {/* For mobile viewport */}
      <div className="md:hidden">
        {!isPreviewVisible && (
          <MarkdownEditor
            content={content}
            setContent={setContent}
            currentMarkdown={currentMarkdown}
            setIsPreviewVisible={setIsPreviewVisible}
          />
        )}

        {isPreviewVisible && (
          <MarkdownPreview
            isPreviewVisible={isPreviewVisible}
            setIsPreviewVisible={setIsPreviewVisible}
          >
            <ReactMarkdown remarkPlugins={[gfm]}>
              {content || currentMarkdown.content}
            </ReactMarkdown>
          </MarkdownPreview>
        )}
      </div>

      {/* For tablet and biger viewports */}
      <ScrollSync>
        <div className="relative hidden min-h-screen md:flex">
          <ScrollSyncPane>
            <div
              style={{ height: 1000 }}
              className={`w-full overflow-auto md:flex md:flex-col 
              ${isPreviewVisible ? 'md:hidden' : 'md:w-1/2'}`}
            >
              <MarkdownEditor
                content={content}
                setContent={setContent}
                currentMarkdown={currentMarkdown}
                setIsPreviewVisible={setIsPreviewVisible}
              />
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div
              style={{ height: 1000 }}
              className={`w-full overflow-auto 
              ${isPreviewVisible ? 'md:w-full' : 'md:w-1/2'}`}
            >
              <MarkdownPreview
                isPreviewVisible={isPreviewVisible}
                setIsPreviewVisible={setIsPreviewVisible}
              >
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {content || currentMarkdown.content}
                </ReactMarkdown>
                {/* NOTE: Donesnt really work, but keep for now */}
                {/* <ReactMarkdown remarkPlugins={[gfm]}>
                  {content || currentMarkdown.content || ''}
                </ReactMarkdown> */}
              </MarkdownPreview>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </>
  );
}
