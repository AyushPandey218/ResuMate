import { useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * usePDFExport - react-to-print Approach
 * 
 * Uses react-to-print library for reliable print handling in React apps.
 * This preserves HTML structure, keeps links clickable, and provides
 * better control over the print process than window.print().
 */
export function usePDFExport() {
  const createPrintHandler = useCallback((contentRef, filename = 'resume.pdf') => {
    return useReactToPrint({
      content: () => contentRef.current,
      documentTitle: filename.replace('.pdf', ''),
      onBeforeGetContent: async () => {
        // Add print-mode class for print-specific styling
        document.body.classList.add('print-mode');
        
        // Wait for fonts to load
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 100));
      },
      onAfterPrint: () => {
        // Remove print-mode class after printing
        document.body.classList.remove('print-mode');
      },
      removeAfterPrint: true,
    });
  }, []);

  return { createPrintHandler };
}
