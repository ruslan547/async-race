import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { Component } from '../../../shared/interfaces';
import { CarCreate } from '../car-create/car-create';
import { CarUpdate } from '../car-update/car-update';
import { RaceBoard } from '../race-board/race-board';
import './garage-board.css';

export class GarageBoard implements Component {
  private carBoard = document.createElement('div');

  private carCreate = new CarCreate(this.redrawPage).render();

  private carUpdate = new CarUpdate(this.redrawPage).render();

  private raceBoard = new RaceBoard(this.redrawPage).render();

  constructor(private redrawPage: () => void) { }

  public render = (): HTMLElement => {
    this.carBoard.classList.add(ClassesConstants.GARAGE_BOARD);
    this.carBoard.append(this.carCreate, this.carUpdate, this.raceBoard);
    return this.carBoard;
  };
}
