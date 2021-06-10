import { Component } from '../../../shared/interfaces';

export class THead implements Component {
  private thead = document.createElement('thead');

  public render = (): HTMLElement => {
    this.thead.classList.add();
    return this.thead;
  }
}
