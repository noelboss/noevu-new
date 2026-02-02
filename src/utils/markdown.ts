/**
 * Simple markdown parser for inline formatting
 * Converts **bold** to <strong> and *italic* to <em>
 * Preserves existing HTML (like <a> tags)
 */
export function parseInlineMarkdown(text: string | undefined): string {
  if (!text) return '';
  return text
    // Convert **bold** to <strong> (must come before single *)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em> (but not inside URLs or already converted)
    .replace(/(?<![<\w])\*([^*]+)\*(?![>\w])/g, '<em>$1</em>');
}
