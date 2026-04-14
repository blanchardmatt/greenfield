import { useState, useCallback, forwardRef, type ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  /** Controlled open state. If provided, `onToggle` should update it. */
  open?: boolean;
  onToggle?: () => void;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export const CollapsibleSection = forwardRef<HTMLDivElement, CollapsibleSectionProps>(
  function CollapsibleSection(
    { title, defaultOpen = true, open: controlledOpen, onToggle, children, className = '', headerRight },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const toggle = useCallback(() => {
      if (isControlled) {
        onToggle?.();
      } else {
        setUncontrolledOpen((v) => !v);
      }
    }, [isControlled, onToggle]);

    return (
      <div ref={ref} className={`collapsible-section ${className}`}>
        <div className="collapsible-header" onClick={toggle}>
          <span className={`collapse-chevron ${open ? 'collapse-chevron--open' : ''}`}>
            {'\u25B6'}
          </span>
          <span className="collapsible-title">{title}</span>
          {headerRight && (
            <span className="collapsible-header-right" onClick={(e) => e.stopPropagation()}>
              {headerRight}
            </span>
          )}
        </div>
        {open && <div className="collapsible-content">{children}</div>}
      </div>
    );
  },
);
