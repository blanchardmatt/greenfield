import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopoutWindowProps {
  title: string;
  onClose: () => void;
  width?: number;
  height?: number;
  children: ReactNode;
}

/** Open content in a separate browser window via React portal.
 *  All <style>, <link rel="stylesheet">, and inline <style> tags from the
 *  main document are mirrored into the popout so styling matches. */
export function PopoutWindow({ title, onClose, width = 420, height = 720, children }: PopoutWindowProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const features = `width=${width},height=${height},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`;
    const win = window.open('', `procedural-art-panel-${Date.now()}`, features);
    if (!win) {
      onClose();
      return;
    }

    win.document.title = title;
    // Some browsers initialize about:blank with quirky markup; reset cleanly.
    win.document.body.innerHTML = '';
    win.document.body.style.margin = '0';
    win.document.body.style.background = '#0a0a0f';

    const root = win.document.createElement('div');
    root.id = 'popout-root';
    root.style.height = '100vh';
    root.style.overflow = 'hidden';
    win.document.body.appendChild(root);

    // Copy current document's stylesheets into the popout so CSS classes work.
    // This handles both Vite's injected <style> tags AND any external <link>s.
    const copiedNodes: Node[] = [];
    const copyStylesFrom = (src: Document) => {
      Array.from(src.head.querySelectorAll('style, link[rel="stylesheet"]')).forEach((node) => {
        const clone = node.cloneNode(true);
        win.document.head.appendChild(clone);
        copiedNodes.push(clone);
      });
    };
    copyStylesFrom(document);

    // Watch for hot-reloaded styles being added (dev convenience)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLStyleElement || (node instanceof HTMLLinkElement && node.rel === 'stylesheet')) {
            const clone = node.cloneNode(true);
            win.document.head.appendChild(clone);
            copiedNodes.push(clone);
          }
        });
      }
    });
    observer.observe(document.head, { childList: true });

    setContainer(root);

    // Closing the popout (via the OS button) should notify the parent
    const handleClose = () => onClose();
    win.addEventListener('beforeunload', handleClose);

    // If the user closes the parent tab, also close the popout
    const handleParentUnload = () => {
      try { win.close(); } catch { /* ignore */ }
    };
    window.addEventListener('beforeunload', handleParentUnload);

    return () => {
      observer.disconnect();
      win.removeEventListener('beforeunload', handleClose);
      window.removeEventListener('beforeunload', handleParentUnload);
      try { win.close(); } catch { /* ignore */ }
      copiedNodes.length = 0;
    };
  }, [title, width, height, onClose]);

  if (!container) return null;
  return createPortal(children, container);
}
