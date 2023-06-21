type IconButtonlistener = (param: string) => void;

interface NavButtons {
  previous: HTMLButtonElement;
  next: HTMLButtonElement;
}

interface Options {
  iconButtonClass: string;
  navButtonClass: string;

}

export type { IconButtonlistener, NavButtons, Options };
