import { ClassesConstants } from '../../shared/constants/classes.constants';
import { Component } from '../../shared/interfaces';
import './winners.css';

export class Winners implements Component {
  private winners = document.createElement('div');

  public render = (): HTMLElement => {
    this.winners.classList.add(ClassesConstants.WINNERS);
    return this.winners;
  };
}
