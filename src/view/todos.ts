import eventCreators from "../model/eventCreators.js";
type EventCreatorReturnType =
  | ReturnType<typeof eventCreators.deleteItem>
  | ReturnType<typeof eventCreators.toggleItemCompleted>
  | ReturnType<typeof eventCreators.updateItem>;

type EventType = (event: EventCreatorReturnType) => void;

let template: HTMLTemplateElement | null = null;

const createNewTodoNode = (): HTMLElement => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
    if (!template) {
      throw new Error("Template with id 'todo-item' not found.");
    }
  }
  return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
};

const attachEventsToTodoElement = (
  element: HTMLElement,
  index: number,
  dispatch: EventType
) => {
  const deleteHandler = () => dispatch(eventCreators.deleteItem(index));
  const toggleHandler = () =>
    dispatch(eventCreators.toggleItemCompleted(index));
  const updateHandler = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      element.classList.remove("editing");
      dispatch(eventCreators.updateItem(index, target.value));
    }
  };

  element
    .querySelector("button.destroy")
    ?.addEventListener("click", deleteHandler);

  element
    .querySelector("input.toggle")
    ?.addEventListener("click", toggleHandler);

  element.addEventListener("dblclick", () => {
    element.classList.add("editing");
    (element.querySelector("input.edit") as HTMLInputElement)?.focus();
  });

  (element.querySelector("input.edit") as HTMLInputElement).addEventListener(
    "keydown",
    updateHandler
  );
};

const getTodoElement = (
  todo: INITIAL_STATE["todos"][0],
  index: number,
  dispatch: EventType
) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();
  const editInput = element.querySelector("input.edit") as HTMLInputElement;
  const label = element.querySelector("label") as HTMLLabelElement;
  const toggleInput = element.querySelector("input.toggle") as HTMLInputElement;

  editInput.value = text;
  label.textContent = text;

  if (completed) {
    element.classList.add("completed");
    toggleInput.checked = true;
  }

  attachEventsToTodoElement(element, index, dispatch);

  return element;
};

const filterTodos = ({ todos, currentFilter }: INITIAL_STATE) => {
  const isCompleted = (todo: INITIAL_STATE["todos"][0]) => todo.completed;
  if (currentFilter === "Active") {
    return todos.filter((t) => !isCompleted(t));
  }

  if (currentFilter === "Completed") {
    return todos.filter(isCompleted);
  }

  return [...todos];
};

export default (
  targetElement: HTMLElement,
  state: INITIAL_STATE,
  dispatch: EventType
): HTMLElement => {
  const { todos, currentFilter } = state;
  const newTodoList = targetElement.cloneNode(true) as HTMLInputElement;

  newTodoList.innerHTML = "";

  const filteredTodos = filterTodos({ todos, currentFilter });

  filteredTodos
    .map((todo, index) => getTodoElement(todo, index, dispatch))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  return newTodoList;
};
