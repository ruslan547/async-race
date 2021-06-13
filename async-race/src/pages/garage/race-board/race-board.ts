import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Car, Component, Winner } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { UtilService } from '../../../shared/services/util.service';
import './race-board.css';

export class RaceBoard implements Component {
  private raceBoard = document.createElement('div');

  private winBoard = document.createElement('div');

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

  constructor(private redrawPage: () => void) { }

  private addClasses = (): void => {
    this.raceBoard.classList.add(ClassesConstants.RACE_BOARD);
    this.generateBtn.classList.add(ClassesConstants.GENERATE_BTN);
    this.resetBtn.classList.add(ClassesConstants.DISABLED);
    this.winBoard.classList.add(ClassesConstants.WIN_BOARD);
  };

  private showWinner = ({ car, time }: Winner): void => {
    this.winBoard.textContent = `${car.name} went first [${time}]`;
    document.body.onclick = () => this.winBoard.remove();
    document.body.append(this.winBoard);
  };

  private handleClick = async ({ target }: Event) => {
    const elem = target as HTMLButtonElement;
    const elemId = elem.id;

    if (elemId === ContentConstants.GENERATE_CARDS) {
      const cars = UtilService.generateRandomCars();
      cars.forEach(async (car: Car) => ApiService.createCar(car));
      this.redrawPage();
    } else if (elemId === ContentConstants.RACE) {
      UtilService.addDisabled(elem);

      const winner = await UtilService.race(UtilService.startDriving);
      this.showWinner(winner);
      await ApiService.saveWinner(winner);
      await UtilService.getWinners();
    } else if (elemId === ContentConstants.RESET) {
      UtilService.addDisabled(elem);
      await UtilService.race(UtilService.stopDriving);
    }
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.raceBoard.addEventListener('click', this.handleClick);
    this.raceBoard.append(this.raceBtn, this.resetBtn, this.generateBtn);

    return this.raceBoard;
  };
}
