import { useEffect } from 'react';

/**
 * Set title for document in current page
 * @function useDocumentTitle
 * @param {string} title
 */

const defaultTitle = 'Leet Social Media';
const useDocumentTitle = (title = defaultTitle) => {
  useEffect(() => {
    document.title = title;

    return () => (document.title = defaultTitle);
  }, [title]);
};

export default useDocumentTitle;
