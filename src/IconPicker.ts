import { Footer } from "./Footer";
import { IconButtonEvent } from "./IconButtonEvent";
import { IconButtonGroup } from "./IconButtonGroup";
import { GroupList } from "./IconList";
import { InputSearch } from "./InputSearch";
import { NavBar } from "./NavBar";
import { KEYS, defaultOptions } from "./constants";
import { createDiv, emptyElement } from "./functions";
import { IconButtonlistener, NavButtons, Options } from "./types";

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export class IconPicker {
  protected iconset: string[];
  protected container: HTMLDivElement;
  protected inputSearch: InputSearch;
  protected iconButtonGroup: IconButtonGroup;
  protected footer: Footer;
  protected navBar: NavBar;
  protected groupList: GroupList;
  protected iconButtonEvent = new IconButtonEvent();
  protected options: Options;
  protected totalResult: number = 0;
  protected groupSize: number;
  protected isButton: boolean = false;
  protected button: HTMLButtonElement | null = null;

  constructor(id: string, iconset: string[], rows: number = 4, cols: number = 5, options: Options = defaultOptions) {
    let element = document.getElementById(id);
    if (element == null) {
      throw Error('Element does not exists');
    }
    switch (element.tagName) {
      case 'DIV':
        this.container = element as HTMLDivElement;
      break;
      case 'BUTTON':
        this.container = createDiv('cont', '250px')
        this.isButton = true;
        this.button = element as HTMLButtonElement;
      break;
      default: 
        throw Error('Element it is not a div or button');
    }
    this.iconset = iconset;
    this.options = options;
    this.groupSize = rows * cols;
    this.groupList = new GroupList(this.iconset, this.groupSize);
    this.totalResult = this.groupList.getTotalItems();
    this.inputSearch = new InputSearch(this.options.inputClass, this.options.inputPlaceholder);
    this.navBar = new NavBar(this.options.navButtonClass, this.options.arrowPrevIconClass, this.options.arrowNextIconClass);
    this.iconButtonGroup = new IconButtonGroup(rows, cols, this.iconButtonEvent, this.options.iconButtonClass);
    this.footer = new Footer();
  }

  public onSelect(listener: IconButtonlistener): void {
    this.iconButtonEvent.on('select', listener);
  }

  public setupInputSearch(): void {
    this.inputSearch.getInput().addEventListener('keyup', (evt) => {
      if (evt.key == KEYS.ENTER) { }
      this.totalResult = this.groupList.search(this.inputSearch.getInput().value);
      emptyElement(this.iconButtonGroup.getElement());
      if (this.totalResult > 0) {
        let group = this.groupList.first();
        this.iconButtonGroup.updateIconButtons(group);
        this.navBar.updateNavLabel(this.groupList.getIndex(), this.groupList.getTotalGroups());
        this.navBar.updateNavButtons(this.groupList.isFirst(), this.groupList.isLast(), this.navBar.getButtons().previous, this.navBar.getButtons().next);
        this.footer.update(this.groupList.getIndex(), this.groupSize, group.length, this.totalResult);
      } else {
        this.navBar.updateNavLabel(-1, 0);
        this.navBar.updateNavButtons(true, true, this.navBar.getButtons().previous, this.navBar.getButtons().next);
        this.footer.getElement().innerHTML = `'${this.inputSearch.getInput().value}' is not found`;
      }
    });
    this.inputSearch.mount();
    this.container?.append(this.inputSearch.getElement());
  }

  public setupNavButtons() {
    let total = this.groupList.getTotalGroups();
    this.navBar.setupNavLabel(this.groupList.getIndex(), total);
    this.navBar.updateNavButtons(this.groupList.isFirst(), this.groupList.isLast(), this.navBar.getButtons().previous, this.navBar.getButtons().next);
    this.navBar.getButtons().next.addEventListener("click", () => {
      emptyElement(this.iconButtonGroup.getElement());
      let group = this.groupList.next();
      this.updateElements(this.groupList, group, this.totalResult, this.navBar.getButtons());
    });
    this.navBar.getButtons().previous.addEventListener("click", () => {
      emptyElement(this.iconButtonGroup.getElement());
      let group = this.groupList.previous();
      this.updateElements(this.groupList, group, this.totalResult, this.navBar.getButtons());
    });
    this.navBar.mount();
    this.container.append(this.navBar.getElement());
  }

  protected updateElements(groupList: GroupList, arrGroup: string[], totalResult: number, navButtons: NavButtons) {
    this.navBar.updateNavLabel(groupList.getIndex(), groupList.getTotalGroups());
    this.iconButtonGroup.updateIconButtons(arrGroup);
    this.navBar.updateNavButtons(groupList.isFirst(), groupList.isLast(), navButtons.previous, navButtons.next);
    this.footer.update(this.groupList.getIndex(), this.groupSize, arrGroup.length, totalResult);
  }

  public mount(): void {
    let firstGroup = this.groupList.first();
    this.iconButtonGroup.updateIconButtons(firstGroup);
    this.setupInputSearch();
    this.setupNavButtons();
    this.container.append(this.iconButtonGroup.getElement());
    this.footer.update(this.groupList.getIndex(), this.groupSize, firstGroup.length, this.groupList.getTotalItems());
    this.container.append(this.footer.getElement());
    if (this.isButton) {
      tippy('#icons', {
        content: this.container,
        appendTo: document.body,
        interactive: true,
        trigger: 'click',
        theme: 'light-border'
      })
    }
  }
}
