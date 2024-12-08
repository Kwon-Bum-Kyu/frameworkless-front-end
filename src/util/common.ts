const getTemplate = (id: string): HTMLElement => {
  let template: HTMLTemplateElement | null = null;
  if (!template) {
    template = document.getElementById(id) as HTMLTemplateElement;
    if (!template) {
      throw new Error(`Template with id ${id} not found.`);
    }
  }

  return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
};

export { getTemplate };
