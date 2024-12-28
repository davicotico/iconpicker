import { EventManager } from "./EventManager";
import { Footer } from "./Footer";
import { IconButtonGroup } from "./IconButtonGroup";
import { GroupList } from "./IconList";
import { InputSearch } from "./InputSearch";
import { NavBar } from "./NavBar";
import { Popover } from "./Popover";
import { KEYS, DEFAULT_OPTIONS } from "./constants";
import { createDiv, emptyElement, makeIconPickerButton } from "./functions";
import { IconButtonlistener, NavButtons, IconPickerOptions } from "./types";

export default class IconPicker {
  protected iconset: string[];
  protected container: HTMLDivElement;
  protected inputSearch: InputSearch;
  protected iconButtonGroup: IconButtonGroup;
  protected footer: Footer;
  protected navBar: NavBar;
  protected groupList: GroupList;
  protected iconButtonEvent = new EventManager();
  protected options: IconPickerOptions;
  protected totalResult: number = 0;
  protected groupSize: number;
  protected isButton: boolean = false;
  protected button: HTMLButtonElement | null = null;
  protected popover: Popover | null = null;
  protected selected: string = '';

  constructor(id: string, iconset: string[], pageSize: number = 20, options: IconPickerOptions = DEFAULT_OPTIONS) {
    let element = document.getElementById(id);
    if (element == null) {
      throw Error('Element does not exists');
    }
    switch (element.tagName) {
      case 'DIV':
        this.container = element as HTMLDivElement;
      break;
      case 'BUTTON':
        let width: string = ((pageSize % 5) == 0) ? '250px' : '200px';
        this.container = createDiv(id  + '-ip-container', width)
        this.isButton = true;
        this.button = makeIconPickerButton(element as HTMLButtonElement);
      break;
      default: 
        throw Error('Element it is not a div or button');
    }
    this.iconset = iconset;
    this.options = { ...DEFAULT_OPTIONS, ...options};
    this.groupSize = pageSize;
    this.groupList = new GroupList(this.iconset, this.groupSize);
    this.totalResult = this.groupList.getTotalItems();
    this.inputSearch = new InputSearch(this.options.inputClass!, this.options.inputPlaceholder!);
    this.navBar = new NavBar(this.options.navButtonClass!, this.options.arrowPrevIconClass!, this.options.arrowNextIconClass!);
    this.iconButtonGroup = new IconButtonGroup(this.iconButtonEvent, this.options.iconButtonClass!, this.options.selectedIconButtonClass!);
    this.footer = new Footer(this.options.templateFooter!);
    this.onChange((params) => {
      this.iconButtonGroup.setSelected(params.icon);
      this.iconButtonGroup.refresh();
      if (this.isButton) {
        let i = this.button?.getElementsByTagName('i').item(0) as HTMLLIElement;
        i.className = params.icon;
      }
    })
  }

  public onChange(listener: IconButtonlistener): void {
    this.iconButtonEvent.on('select', listener);
  }

  public setSelected(icon: string) {
    let index = this.groupList.getGroupIndex(icon);
    if (index >= 0) {
      this.iconButtonGroup.setSelected(icon);
      let group = this.groupList.goTo(index);
      emptyElement(this.iconButtonGroup.getElement());
      this.updateElements(this.groupList, group, this.totalResult, this.navBar.getButtons());
    }
  }

  protected setupInputSearch(): void {
    this.inputSearch.getInput().addEventListener('keyup', (evt) => {
      if (evt.key == KEYS.ESCAPE && this.isButton) {
        this.popover?.hide();
        return;
      }
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

  protected setupNavButtons() {
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

  public setPopoverTheme(theme: string) {
    if (this.isButton) {
      this.popover?.setTheme(theme);
    }
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
      this.popover = new Popover(this.container, this.button as Element, this.options.placement, this.options.popoverTheme);
      this.iconButtonEvent.on('select', () => {
        this.popover?.hide();
      });
    }
  }
}
