import { useState, useCallback, type ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  className = '',
  headerRight,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className={`collapsible-section ${className}`}>
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
}
