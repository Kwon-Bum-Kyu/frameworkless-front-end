const getTodoCount = (todos: INITIAL_STATE["todos"]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  return `${length} ${length > 1 ? "Items" : "Item"} left`;
};

export default (
  targetElement: HTMLElement,
  { todos }: INITIAL_STATE
): HTMLElement => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
