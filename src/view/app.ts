import eventCreators from "../model/eventCreators.js";

let template: HTMLTemplateElement | null = null;

const getTemplate = (): HTMLElement => {
  if (!template) {
    template = document.getElementById("todo-app") as HTMLTemplateElement;
    if (!template) {
      throw new Error("Template with id 'todo-app' not found.");
    }
  }

  return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
};

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
      input.value = ""; // 입력 필드 초기화
    }
  });
};

export default (
  targetElement: HTMLElement,
  state: INITIAL_STATE, // 상태의 정확한 타입 정의 필요 시 수정 가능
  dispatch: (event: ReturnType<typeof eventCreators.addItem>) => void
): HTMLElement => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;

  newApp.innerHTML = "";
  newApp.appendChild(getTemplate());

  addEvents(newApp, dispatch);

  return newApp;
};
