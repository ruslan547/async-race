import { ClassesConstants } from '../../constants/classes.constants';
import { Component } from '../../interfaces';
import './garage.css';

export class Garage implements Component {
  private garage = document.createElement('div');

  public render = (): HTMLElement => {
    this.garage.classList.add(ClassesConstants.GARAGE);
    return this.garage;
  };
}
