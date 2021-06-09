import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Car, Component } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { UtilService } from '../../../shared/services/util.service';
import './race-board.css';

export class RaceBoard implements Component {
  private raceBoard = document.createElement('div');

  private raceBtn = new Button({
    content: ContentConstants.RACE,
    type: SettingsConstants.MAIN,
  }).render();

  private resetBtn = new Button({
    content: ContentConstants.RESET,
    type: SettingsConstants.MAIN,
  }).render();

  private generateBtn = new Button({
    content: ContentConstants.GENERATE_CARDS,
  }).render();

  private addClasses = (): void => {
    this.raceBoard.classList.add(ClassesConstants.RACE_BOARD);
    this.generateBtn.classList.add(ClassesConstants.GENERATE_BTN);
  };

  private handleClick = async ({ target }: Event) => {
    const elem = target as HTMLElement;
    const elemId = elem.id;

    if (elemId === ContentConstants.GENERATE_CARDS) {
      const cars = UtilService.generateRandomCars();
      cars.forEach(async (car: Car) => await ApiService.createCar(car));
      UtilService.redrawGarage();
    }
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.raceBoard.append(this.raceBtn, this.resetBtn, this.generateBtn);
    this.raceBoard.addEventListener('click', this.handleClick);

    return this.raceBoard;
  };
}
