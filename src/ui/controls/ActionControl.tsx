import { useCallback } from 'react';
import type { ActionParameterDef } from '../../core/types';
import { EffectActions } from '../../core/EffectActions';

interface ActionControlProps {
  def: ActionParameterDef;
  effectId: string;
}

export function ActionControl({ def, effectId }: ActionControlProps) {
  const handleClick = useCallback(() => {
    EffectActions.dispatch(effectId, def.actionId);
  }, [effectId, def.actionId]);

  return (
    <div className="param-row">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control">
        <button className="btn param-action-btn" onClick={handleClick} style={{ flex: 1 }}>
          {def.buttonLabel}
        </button>
      </div>
    </div>
  );
}
