import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { Component } from '../../../shared/interfaces';
import { CarCreate } from '../car-create/car-create';
import { CarUpdate } from '../car-update/car-update';
import { RaceBoard } from '../race-board/race-board';
import './garage-board.css';

export class GarageBoard implements Component {
  private carBoard = document.createElement('div');

  private carCreate = new CarCreate().render();

  private carUpdate = new CarUpdate().render();

  private raceBoard = new RaceBoard().render();

  public render = (): HTMLElement => {
    this.carBoard.classList.add(ClassesConstants.GARAGE_BOARD);
    this.carBoard.append(this.carCreate, this.carUpdate, this.raceBoard);
    return this.carBoard;
  };
}
