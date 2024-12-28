import tippy, { Instance } from "tippy.js";
import { PopOverPlacement } from "./types";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export class Popover {
  protected instance: Instance;

  constructor(container: HTMLDivElement, button: Element, placement: PopOverPlacement = 'bottom', theme: string = 'dark') {
    this.instance = tippy(button as Element, {
      content: container,
      appendTo: document.body,
      interactive: true,
      trigger: "click",
      placement: placement,
      animation: 'scale',
      theme: theme,
      onShown()  {
        const input = container.getElementsByTagName('input');
        if (input.length > 0) {
          input.item(0)?.focus();
        }
      }
    });
  }

  public hide(): void {
    this.instance.hide();
  }

  public setTheme(theme: string): void {
    this.instance.setProps({
      theme: theme
    });
  }
}
