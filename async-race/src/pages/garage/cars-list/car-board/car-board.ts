import { ClassesConstants } from '../../../../shared/constants/classes.constants';
import { Component } from '../../../../shared/interfaces';
import { CarSetting } from '../car-setting/car-setting';
import { EngineSetting } from '../engine-setting/engine-setting';
import './car-board.css';

export class CarBoard implements Component {
  private carBoard = document.createElement('div');

  private carSetting = new CarSetting().render();

  private engineSetting = new EngineSetting().render();

  public render = (): HTMLElement => {
    this.carBoard.classList.add(ClassesConstants.CAR_BOARD);
    this.carBoard.append(this.carSetting, this.engineSetting);

    return this.carBoard;
  };
}
