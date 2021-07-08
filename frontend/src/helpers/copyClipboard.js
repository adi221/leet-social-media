export const copyClipboard = str => {
  const textarea = document.createElement('textarea');
  textarea.value = str;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}