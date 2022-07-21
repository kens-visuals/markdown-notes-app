import { useState } from 'react';

// ScrollSync Lib
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

// Markdown Lib
import ReactMarkdown from 'react-markdown';

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
            <ReactMarkdown>{content || currentMarkdown.content}</ReactMarkdown>
          </MarkdownPreview>
        )}
      </div>

      {/* For tablet and biger viewports */}
      {/* <div className="hidden w-full md:flex md:min-h-screen">
        {!isPreviewVisible && (
          <MarkdownEditor
            content={content}
            setContent={setContent}
            currentMarkdown={currentMarkdown}
            setIsPreviewVisible={setIsPreviewVisible}
          />
        )}
        <MarkdownPreview
          isPreviewVisible={isPreviewVisible}
          setIsPreviewVisible={setIsPreviewVisible}
        >
          <ReactMarkdown>{content || currentMarkdown.content}</ReactMarkdown>
        </MarkdownPreview>
      </div> */}

      <ScrollSync>
        <div className="relative hidden min-h-screen md:flex">
          <ScrollSyncPane>
            <div style={{ height: 1000 }} className="overflow-auto md:w-1/2">
              {!isPreviewVisible && (
                <MarkdownEditor
                  content={content}
                  setContent={setContent}
                  currentMarkdown={currentMarkdown}
                  setIsPreviewVisible={setIsPreviewVisible}
                />
              )}
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div
              style={{ height: 1000 }}
              className={`w-full overflow-auto md:flex md:flex-col md:items-center ${
                isPreviewVisible ? 'md:w-full' : 'md:w-1/2'
              }`}
            >
              <MarkdownPreview
                isPreviewVisible={isPreviewVisible}
                setIsPreviewVisible={setIsPreviewVisible}
              >
                <ReactMarkdown>
                  {content || currentMarkdown.content}
                </ReactMarkdown>
              </MarkdownPreview>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </>
  );
}
