import createEventBus from "./eventBus.js";

interface CounterState {
  counter: number;
}

type CounterEvent = { type: "COUNTER" } | { type: "NOT_COUNTER" };

const counterModel = (
  state: CounterState | undefined,
  event: CounterEvent
): CounterState => {
  if (!state) {
    return { counter: 0 };
  }

  if (event.type === "COUNTER") {
    return { counter: state.counter + 1 };
  }

  return state;
};

describe("eventBus", () => {
  let eventBus: ReturnType<typeof createEventBus<CounterState, CounterEvent>>;

  beforeEach(() => {
    eventBus = createEventBus(counterModel);
  });

  test("subscribers should be invoked when the model catches the event", () => {
    let counter = 0;

    eventBus.subscribe(() => counter++);

    eventBus.dispatch({ type: "COUNTER" });

    expect(counter).toBe(1);
  });

  test("subscribers should not be invoked when the model does not catch the event", () => {
    let counter = 0;

    eventBus.subscribe(() => counter++);

    eventBus.dispatch({ type: "NOT_COUNTER" });

    expect(counter).toBe(0);
  });

  test("subscribers should receive an immutable state", () => {
    eventBus.dispatch({ type: "COUNTER" });

    eventBus.subscribe((state) => {
      expect(() => {
        (state as any).counter = 0; // 상태 변경 시도
      }).toThrow();
    });
  });

  test("should throw error if the model does not return a state", () => {
    const eventBus = createEventBus(() => undefined as any);

    expect(() => {
      eventBus.dispatch({ type: "COUNTER" });
    }).toThrow();
  });
});
