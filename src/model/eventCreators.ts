import { Event, EVENT_TYPES, EventMap } from "./event.js";

const eventCreators = {
  addItem: (text: string): Event<"ITEM_ADDED"> => ({
    type: EVENT_TYPES.ITEM_ADDED,
    payload: text,
  }),
  updateItem: (index: number, text: string): Event<"ITEM_UPDATED"> => ({
    type: EVENT_TYPES.ITEM_UPDATED,
    payload: {
      text,
      index,
    },
  }),
  deleteItem: (index: number): Event<"ITEM_DELETED"> => ({
    type: EVENT_TYPES.ITEM_DELETED,
    payload: index,
  }),
  toggleItemCompleted: (index: number): Event<"ITEMS_COMPLETED_TOGGLED"> => ({
    type: EVENT_TYPES.ITEMS_COMPLETED_TOGGLED,
    payload: index,
  }),
  completeAll: (): Event<"ITEMS_MARKED_AS_COMPLETED"> => ({
    type: EVENT_TYPES.ITEMS_MARKED_AS_COMPLETED,
    payload: undefined,
  }),
  clearCompleted: (): Event<"COMPLETED_ITEM_DELETED"> => ({
    type: EVENT_TYPES.COMPLETED_ITEM_DELETED,
    payload: undefined,
  }),
  changeFilter: (
    filter: EventMap["FILTER_CHANGED"]
  ): Event<"FILTER_CHANGED"> => ({
    type: EVENT_TYPES.FILTER_CHANGED,
    payload: filter,
  }),
};
export default eventCreators;
