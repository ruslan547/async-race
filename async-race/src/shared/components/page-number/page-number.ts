import { ClassesConstants } from '../../constants/classes.constants';
import { ContentConstants } from '../../constants/content.constants';
import { Component } from '../../interfaces';

export class PageNumber implements Component {
  private pageNumber = document.createElement('h2');

  constructor(number: number) {
    this.pageNumber.textContent = `${ContentConstants.PAGE} #${number}`;
  }

  public render = (): HTMLElement => {
    this.pageNumber.classList.add(ClassesConstants.PAGE_NUMBER);
    return this.pageNumber;
  };
}
