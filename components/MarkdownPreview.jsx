export default function MarkdownPreview({ children }) {
  return (
    <article className="w-1/2 prose prose-h1:text-red-600">{children}</article>
  );
}
