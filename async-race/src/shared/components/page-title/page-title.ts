import { ClassesConstants } from '../../constants/classes.constants';
import { Component } from '../../interfaces';

export class PageTitle implements Component {
  private pageTitle = document.createElement('h1');

  constructor(title: string, number: number) {
    this.pageTitle.textContent = `${title} (${number})`;
  }

  public render = (): HTMLElement => {
    this.pageTitle.classList.add(ClassesConstants.PAGE_TITLE);
    return this.pageTitle;
  };
}
