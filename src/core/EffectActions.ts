/**
 * Simple event bus for action parameters. Effects register handlers
 * for (effectId, actionId) pairs; UI dispatches on button click.
 */

type ActionHandler = () => void;
const handlers = new Map<string, ActionHandler>();

function key(effectId: string, actionId: string): string {
  return `${effectId}::${actionId}`;
}

export const EffectActions = {
  on(effectId: string, actionId: string, handler: ActionHandler): () => void {
    const k = key(effectId, actionId);
    handlers.set(k, handler);
    return () => {
      if (handlers.get(k) === handler) handlers.delete(k);
    };
  },
  off(effectId: string, actionId: string): void {
    handlers.delete(key(effectId, actionId));
  },
  dispatch(effectId: string, actionId: string): void {
    const h = handlers.get(key(effectId, actionId));
    if (h) h();
  },
  /** Remove all handlers for a given effect (used on dispose). */
  clearEffect(effectId: string): void {
    const prefix = `${effectId}::`;
    for (const k of Array.from(handlers.keys())) {
      if (k.startsWith(prefix)) handlers.delete(k);
    }
  },
};
