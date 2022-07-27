import { useState, useContext, useEffect } from 'react';

// ScrollSync Lib
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

// Markdown Lib
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { DataContext } from '../contexts/DataContext';

// Components
import MarkdownPreview from './MarkdownPreview';
import MarkdownEditor from './MarkdownEditor';

export default function MarkdownContainer({ content, setContent }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const { data, currentMarkdownNum, setCurrentMarkdownNum } =
    useContext(DataContext);

  useEffect(() => setCurrentMarkdownNum(0), [data]);

  return (
    <>
      {/* For mobile viewport */}
      <div className="md:hidden">
        {!isPreviewVisible && (
          <MarkdownEditor
            content={content}
            setContent={setContent}
            currentMarkdownNum={currentMarkdownNum}
            setIsPreviewVisible={setIsPreviewVisible}
          />
        )}

        {isPreviewVisible && (
          <MarkdownPreview
            isPreviewVisible={isPreviewVisible}
            setIsPreviewVisible={setIsPreviewVisible}
          >
            <ReactMarkdown remarkPlugins={[gfm]}>
              {content || data[currentMarkdownNum]?.content}
            </ReactMarkdown>
          </MarkdownPreview>
        )}
      </div>

      {/* For tablet and biger viewports */}
      <ScrollSync>
        <div className="relative hidden md:flex">
          <ScrollSyncPane>
            <div
              style={{ height: 1000 }}
              className={`w-full overflow-auto md:flex md:flex-col 
              ${isPreviewVisible ? 'md:hidden' : 'md:w-1/2'}`}
            >
              <MarkdownEditor
                content={content}
                setContent={setContent}
                currentMarkdownNum={currentMarkdownNum}
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
                  {content || data[currentMarkdownNum]?.content}
                </ReactMarkdown>
              </MarkdownPreview>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </>
  );
}
