const registry: {
  [K in registryName]?: (
    target: HTMLElement,
    state: INITIAL_STATE,
    events: any
  ) => HTMLElement;
} = {};

const renderWrapper = (
  component: (
    target: HTMLElement,
    state: INITIAL_STATE,
    events: any
  ) => HTMLElement
) => {
  return (
    targetElement: HTMLElement,
    state: INITIAL_STATE,
    events: any
  ): HTMLElement => {
    const element = component(targetElement, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.getAttribute("data-component") as registryName | null;
      if (!name) {
        return;
      }

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target as HTMLElement, state, events));
    });

    return element;
  };
};

const add = (
  name: registryName,
  component: (
    target: HTMLElement,
    state: INITIAL_STATE,
    events: any
  ) => HTMLElement
) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (
  root: HTMLElement,
  state: INITIAL_STATE,
  events: any
): HTMLElement => {
  const cloneComponent = (root: HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};
export default {
  add,
  renderRoot,
};
