import { IconButtonEvent } from "./IconButtonEvent";
import { GroupList } from "./IconList";
import { ARROW_LEFT, ARROW_RIGHT, KEYS } from "./constants";
import { createButton, createDiv, createIcon, emptyElement } from "./functions";
import { IconButtonlistener, NavButtons } from "./types";

export class IconPicker {
  protected iconset: string[];
  protected container: HTMLDivElement | null;
  protected iconButtons: HTMLDivElement;
  protected navLabel: HTMLDivElement;
  protected footer: HTMLDivElement;
  protected groupList: GroupList;
  protected groupSize: number;
  protected totalResult: number = 0;

  protected navButtons: NavButtons;
  protected iconButtonEvent = new IconButtonEvent();

  constructor(id: string, iconset: string[], rows: number = 4, cols: number = 5) {
    this.iconset = iconset;
    this.groupSize = rows * cols;
    this.groupList = new GroupList(this.iconset, this.groupSize);
    this.totalResult = this.groupList.getTotalItems();
    this.container = document.getElementById(id) as HTMLDivElement; //createDiv('', '400px');
    this.navLabel = document.createElement('div');
    this.navButtons = {
      previous: createButton(ARROW_LEFT),
      next: createButton(ARROW_RIGHT)
    };
    this.iconButtons = createDiv("icon-button-group", "100%");
    this.iconButtons.style.display = 'grid';
    this.iconButtons.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    this.iconButtons.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    this.iconButtons.style.gap = '8px';
    this.footer = createDiv('ip-footer', '100%');
  }

  onSelect(listener: IconButtonlistener): void {
    this.iconButtonEvent.on('select', listener);
  }

  public setupInputSearch(): void {
    let div = createDiv('ip-search', '100%');
    div.style.marginBottom = '5px';
    let input = document.createElement('input');
    input.addEventListener('keyup', (evt) => {
      if (evt.key == KEYS.ENTER) { }
      this.totalResult = this.groupList.search(input.value);
      emptyElement(this.iconButtons);
      if (this.totalResult > 0) {
        let group = this.groupList.first()
        this.updateIconButtons(group);
        this.updateNavLabel(this.groupList.getIndex(), this.groupList.getTotalGroups());
        this.updateNavButtons(this.groupList.isFirst(), this.groupList.isLast(), this.navButtons.previous, this.navButtons.next);
        this.updateFooter(this.groupList.getIndex(), this.groupSize, group.length, this.totalResult);
      } else {
        this.updateNavLabel(-1, 0);
        this.updateNavButtons(true, true, this.navButtons.previous, this.navButtons.next);
        this.footer.innerHTML = `'${input.value}' is not found`;
      }
    });
    input.style.boxSizing = 'border-box';
    input.style.width = '100%';
    div.append(input);
    this.container?.append(div);
  }

  protected setupNavLabel(currentIndex: number, total: number): void {
    this.navLabel.style.textAlign = 'center';
    this.navLabel.style.flexGrow = '1';
    this.updateNavLabel(currentIndex, total);
  }

  public setupNavButtons() {
    let div = createDiv("action-buttons", "100%");
    div.style.display = "flex";
    div.style.marginBottom = "5px";
    let total = this.groupList.getTotalGroups();
    this.setupNavLabel(this.groupList.getIndex(), total);
    this.navButtons.next.addEventListener("click", () => {
      emptyElement(this.iconButtons);
      let group = this.groupList.next();
      this.updateElements(this.groupList, group, this.totalResult, this.navButtons);
    });
    this.navButtons.previous.addEventListener("click", () => {
      emptyElement(this.iconButtons);
      let group = this.groupList.previous();
      this.updateElements(this.groupList, group, this.totalResult, this.navButtons)
    });
    div.append(this.navButtons.previous);
    div.append(this.navLabel)
    div.append(this.navButtons.next);
    this.container?.append(div);
  }

  protected updateElements(groupList: GroupList, arrGroup: string[], totalResult: number, navButtons: NavButtons) {
    this.updateNavLabel(groupList.getIndex(), groupList.getTotalGroups());
    this.updateIconButtons(arrGroup);
    this.updateNavButtons(groupList.isFirst(), groupList.isLast(), navButtons.previous, navButtons.next);
    this.updateFooter(this.groupList.getIndex(), this.groupSize, arrGroup.length, totalResult);
  }

  public setupFooter(firstGroupSize: number) {
    this.footer.style.marginTop = '10px';
    this.footer.style.textAlign = 'center';
    this.updateFooter(this.groupList.getIndex(), this.groupSize, firstGroupSize, this.groupList.getTotalItems());
    this.container?.append(this.footer);
  }

  public updateIconButtons(icons: string[]): void {
    icons.forEach((item) => {
      let button = createButton(createIcon(item));
      button.addEventListener("click", () => {
        this.iconButtonEvent.emit('select', item);
      });
      this.iconButtons.append(button);
    });
  }

  protected updateNavButtons(isFirst: boolean, isLast: boolean, buttonPrevious: HTMLButtonElement, buttonNext: HTMLButtonElement): void {
    buttonPrevious.disabled = isFirst;
    buttonNext.disabled = isLast;
  }

  protected updateNavLabel(currentIndex: number, total: number) {
    this.navLabel.innerHTML = `${currentIndex + 1} / ${total}`;
  }

  protected updateFooter(index: number, sizeGroup: number, sizeResult: number, total: number): void {
    let start = (index * sizeGroup) + 1;
    let end = (start - 1) + sizeResult;
    this.footer.innerHTML = `[${start} - ${end}] of ${total}`;
  }

  public mount() {
    let group = this.groupList.first();
    this.updateIconButtons(group);
    this.setupInputSearch();
    this.setupNavButtons();
    this.container?.append(this.iconButtons);
    this.setupFooter(group.length);
  }
}
