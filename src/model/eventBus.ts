type Model<S, E extends { type: string }> = (
  state: S | undefined,
  event: E
) => S;

const cloneDeep = (x: object) => JSON.parse(JSON.stringify(x));

const freeze = <S extends object>(state: S): Readonly<S> =>
  Object.freeze(cloneDeep(state));

export default function createEventBus<
  S extends object,
  E extends { type: string }
>(model: Model<S, E>) {
  let listeners: Array<(state: Readonly<S>) => void> = [];
  let state = model(undefined, { type: "" } as unknown as E);

  const subscribe = (listener: (state: Readonly<S>) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const invokeSubscribers = () => {
    const frozenState = freeze(state);
    listeners.forEach((listener) => listener(frozenState));
  };

  const dispatch = (event: E) => {
    const newState = model(state, event);

    if (!newState) {
      throw new Error("Model should always return a value.");
    }

    if (newState === state) {
      return;
    }

    state = newState;
    invokeSubscribers();
  };

  const getState = () => freeze(state);

  return {
    subscribe,
    dispatch,
    getState,
  };
}
