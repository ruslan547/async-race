import { ClassesConstants } from '../../../../shared/constants/classes.constants';
import { Car, Component } from '../../../../shared/interfaces';
import { CarSetting } from '../car-setting/car-setting';
import { EngineSetting } from '../engine-setting/engine-setting';
import './car-board.css';

export class CarBoard implements Component {
  private carBoard = document.createElement('div');

  private carSetting = new CarSetting(this.car).render();

  private engineSetting = new EngineSetting(this.car).render();

  constructor(private car: Car) { }

  public render = (): HTMLElement => {
    this.carBoard.classList.add(ClassesConstants.CAR_BOARD);
    this.carBoard.append(this.carSetting, this.engineSetting);

    return this.carBoard;
  };
}
