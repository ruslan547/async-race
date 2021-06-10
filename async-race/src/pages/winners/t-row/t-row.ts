import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { Component, Winner } from '../../../shared/interfaces';
import { CarSkin } from '../../garage/cars-list/car-skin/car-skin';
import './t-row.css';

export class TRow implements Component {
  private tRow = document.createElement('tr');

  private numTd = document.createElement('td');
  private carTd = document.createElement('td');
  private nameTd = document.createElement('td');
  private winsTd = document.createElement('td');
  private timeTd = document.createElement('td');

  constructor({ car, wins, time }: Winner, private index: number) {
    this.numTd.textContent = (this.index + 1).toString();
    this.carTd.append(new CarSkin(car.color, true).render());
    this.nameTd.textContent = car.name;
    this.winsTd.textContent = wins.toString();
    this.timeTd.textContent = time.toString();
  }

  public render = (): HTMLElement => {
    this.tRow.classList.add(ClassesConstants.T_ROW)
    this.tRow.append(this.numTd, this.carTd, this.nameTd, this.winsTd, this.timeTd);
    return this.tRow;
  };
}
