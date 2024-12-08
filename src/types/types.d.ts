interface INITIAL_STATE {
  todos: { text: string; completed: boolean }[];
  currentFilter: "All" | "Active" | "Completed";
}

type registryName = "app" | "todos" | "todosView" | "counter" | "filters";
