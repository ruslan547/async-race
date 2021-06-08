import { ClassesConstants } from '../../constants/classes.constants';
import { Component } from '../../interfaces';
import './winners.css';

export class Winners implements Component {
  private winners = document.createElement('div');

  public render = (): HTMLElement => {
    this.winners.classList.add(ClassesConstants.WINNERS);
    return this.winners;
  };
}
