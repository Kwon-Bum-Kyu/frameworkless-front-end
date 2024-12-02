interface INITIAL_STATE {
  todos: { text: string; completed: boolean }[];
  currentFilter: "All" | "Active" | "Completed";
}

type ElementWithValue = HTMLInputElement;

type registryName = "app" | "todos" | "todosView" | "counter" | "filters";
