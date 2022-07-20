import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import { saveMarkdownChanges } from '../firebase/firebase-utils';

// Components
import MarkdownPreview from './MarkdownPreview';

// Contexts
import { UserContext } from '../contexts/UserContext';

export default function Markdown({ currentMarkdown, content, setContent }) {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div>
        <button
          type="button"
          className="border border-orange-900"
          onClick={() =>
            saveMarkdownChanges(currentUser.uid, currentMarkdown.id, content)
          }
        >
          Save Changes
        </button>
      </div>

      <div>
        <p>Editor</p>

        <textarea
          className="w-full font-roboto-mono dark:bg-primary-1000"
          value={content || currentMarkdown.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <p>Preview</p>
        <MarkdownPreview>
          <ReactMarkdown>{content || currentMarkdown.content}</ReactMarkdown>
        </MarkdownPreview>
      </div>
    </>
  );
}
