import { Event, EventType } from "./event.js";
export type Modifier<T extends EventType> = (
  state: INITIAL_STATE,
  event: Event<T>
) => INITIAL_STATE;

const cloneDeep = (x: object) => {
  return JSON.parse(JSON.stringify(x));
};

const INITIAL_STATE: INITIAL_STATE = {
  todos: [],
  currentFilter: "All",
};

const addItem: Modifier<"ITEM_ADDED"> = (state, event) => {
  const text = event.payload;
  if (!text) {
    return state;
  }

  return {
    ...state,
    todos: [
      ...state.todos,
      {
        text,
        completed: false,
      },
    ],
  };
};

const updateItem: Modifier<"ITEM_UPDATED"> = (state, event) => {
  const { text, index } = event.payload;
  if (!text) {
    return state;
  }

  if (index < 0) {
    return state;
  }

  if (!state.todos[index]) {
    return state;
  }

  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      if (i === index) {
        todo.text = text;
      }
      return todo;
    }),
  };
};

const deleteItem: Modifier<"ITEM_DELETED"> = (
  state: INITIAL_STATE,
  event: Event<"ITEM_DELETED">
) => {
  const index = event.payload;
  if (index < 0) {
    return state;
  }

  if (!state.todos[index]) {
    return state;
  }

  return {
    ...state,
    todos: state.todos.filter((todo, i) => i !== index),
  };
};

const toggleItemCompleted: Modifier<"ITEMS_COMPLETED_TOGGLED"> = (
  state,
  event
) => {
  const index = event.payload;

  if (index < 0) {
    return state;
  }

  if (!state.todos[index]) {
    return state;
  }

  return {
    ...state,
    todos: state.todos.map((todo, i: number) => {
      if (i === index) {
        todo.completed = !todo.completed;
      }
      return todo;
    }),
  };
};

const completeAll: Modifier<"ITEMS_MARKED_AS_COMPLETED"> = (state, event) => {
  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      todo.completed = true;
      return todo;
    }),
  };
};

const clearCompleted: Modifier<"COMPLETED_ITEM_DELETED"> = (state, event) => {
  return {
    ...state,
    todos: state.todos.filter((t) => !t.completed),
  };
};

const changeFilter: Modifier<"FILTER_CHANGED"> = (state, event) => {
  return {
    ...state,
    currentFilter: event.payload,
  };
};

const methods: { [K in EventType]: Modifier<K> } = {
  ITEM_ADDED: addItem,
  ITEM_UPDATED: updateItem,
  ITEM_DELETED: deleteItem,
  ITEMS_COMPLETED_TOGGLED: toggleItemCompleted,
  ITEMS_MARKED_AS_COMPLETED: completeAll,
  COMPLETED_ITEM_DELETED: clearCompleted,
  FILTER_CHANGED: changeFilter,
};

export default (initialState = INITIAL_STATE) => {
  return (
    prevState: INITIAL_STATE | undefined,
    event: Event<EventType>
  ): INITIAL_STATE => {
    if (!prevState) {
      return cloneDeep(initialState);
    }

    const currentModifier = methods[event.type];

    if (!currentModifier) {
      return prevState;
    }

    return currentModifier(prevState, event as any);
  };
};
