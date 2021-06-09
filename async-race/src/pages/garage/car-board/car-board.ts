import { Component } from '../../../shared/interfaces';
import { CarCreate } from '../car-create/car-create';
import { CarUpdate } from '../car-update/car-update';

export class CarBoard implements Component {
  private carBoard = document.createElement('div');

  private carCreate = new CarCreate().render();

  private carUpdate = new CarUpdate().render();

  public render = (): HTMLElement => {
    this.carBoard.append(this.carCreate, this.carUpdate);
    return this.carBoard;
  };
}
