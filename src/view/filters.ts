import eventCreators from "../model/eventCreators.js";

export default (
  targetElement: HTMLElement,
  { currentFilter }: INITIAL_STATE,
  dispatch: (event: ReturnType<typeof eventCreators.changeFilter>) => void
): HTMLElement => {
  const newFilters = targetElement.cloneNode(true) as HTMLElement;

  Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
    const anchor = a as HTMLAnchorElement;

    if (anchor.textContent === currentFilter) {
      anchor.classList.add("selected");
    } else {
      anchor.classList.remove("selected");
    }

    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      // textContent가 null인 경우 기본값 처리
      const filter = anchor.textContent as
        | "All"
        | "Active"
        | "Completed"
        | null;

      if (filter === "All" || filter === "Active" || filter === "Completed") {
        dispatch(eventCreators.changeFilter(filter));
      }
    });
  });

  return newFilters;
};
