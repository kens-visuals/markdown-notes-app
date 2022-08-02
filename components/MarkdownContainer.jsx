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

  const { data, setCurrentMarkdownNum } = useContext(DataContext);

  useEffect(() => setCurrentMarkdownNum(0), [data]);

  return (
    <>
      <>
        {/* For mobile viewport */}
        {!isPreviewVisible && (
          <div className="h-screen overflow-hidden md:hidden">
            <MarkdownEditor
              content={content}
              setContent={setContent}
              isPreviewVisible={isPreviewVisible}
              setIsPreviewVisible={setIsPreviewVisible}
            />
          </div>
        )}

        {isPreviewVisible && (
          <div className="h-screen overflow-auto md:hidden">
            <MarkdownPreview
              setContent={setContent}
              isPreviewVisible={isPreviewVisible}
              setIsPreviewVisible={setIsPreviewVisible}
            >
              <ReactMarkdown linkTarget="_blank" remarkPlugins={[gfm]}>
                {content}
              </ReactMarkdown>
            </MarkdownPreview>
          </div>
        )}
      </>

      {/* For tablet and biger viewports */}
      <ScrollSync>
        <div className="hidden md:flex">
          <ScrollSyncPane>
            <div
              className={`h-screen w-full overflow-auto md:flex md:flex-col 
              ${isPreviewVisible ? 'md:hidden' : 'md:w-1/2'}`}
            >
              <MarkdownEditor
                content={content}
                setContent={setContent}
                isPreviewVisible={isPreviewVisible}
                setIsPreviewVisible={setIsPreviewVisible}
              />
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div
              className={`h-screen w-full overflow-auto 
              ${isPreviewVisible ? 'md:w-full' : 'md:w-1/2'}`}
            >
              <MarkdownPreview
                setContent={setContent}
                isPreviewVisible={isPreviewVisible}
                setIsPreviewVisible={setIsPreviewVisible}
              >
                <ReactMarkdown linkTarget="_blank" remarkPlugins={[gfm]}>
                  {content}
                </ReactMarkdown>
              </MarkdownPreview>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </>
  );
}
