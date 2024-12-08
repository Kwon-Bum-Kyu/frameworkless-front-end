import eventCreators from "../model/eventCreators.js";
import { getTemplate } from "../util/common.js";
const addEvents = (
  targetElement: HTMLElement,
  dispatch: (event: ReturnType<typeof eventCreators.addItem>) => void
) => {
  targetElement.querySelector(".new-todo")?.addEventListener("keydown", (e) => {
    const keyboardEvent = e as KeyboardEvent;
    const input = keyboardEvent.target as HTMLInputElement;

    if (keyboardEvent.key === "Enter" && input.value.trim()) {
      const event = eventCreators.addItem(input.value.trim());
      dispatch(event);
      input.value = "";
    }
  });
};

export default (
  targetElement: HTMLElement,
  state: INITIAL_STATE,
  dispatch: (event: ReturnType<typeof eventCreators.addItem>) => void
): HTMLElement => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;

  newApp.innerHTML = "";
  newApp.appendChild(getTemplate("todo-app"));

  addEvents(newApp, dispatch);

  return newApp;
};
