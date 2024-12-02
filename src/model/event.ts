export const EVENT_TYPES = Object.freeze({
  ITEM_ADDED: "ITEM_ADDED",
  ITEM_UPDATED: "ITEM_UPDATED",
  ITEM_DELETED: "ITEM_DELETED",
  ITEMS_COMPLETED_TOGGLED: "ITEMS_COMPLETED_TOGGLED",
  ITEMS_MARKED_AS_COMPLETED: "ITEMS_MARKED_AS_COMPLETED",
  COMPLETED_ITEM_DELETED: "COMPLETED_ITEM_DELETED",
  FILTER_CHANGED: "FILTER_CHANGED",
} as const);

// EventType 타입 정의
export type EventType = keyof typeof EVENT_TYPES;

// EventMap 정의
export interface EventMap {
  ITEM_ADDED: string;
  ITEM_UPDATED: { text: string; index: number };
  ITEM_DELETED: number;
  ITEMS_COMPLETED_TOGGLED: number;
  ITEMS_MARKED_AS_COMPLETED: undefined;
  COMPLETED_ITEM_DELETED: undefined;
  FILTER_CHANGED: "All" | "Active" | "Completed";
}

// Event 타입 정의
export type Event<K extends EventType = EventType> = {
  type: K;
  payload: EventMap[K];
};
