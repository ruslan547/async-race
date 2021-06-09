import { ClassesConstants } from '../../../../shared/constants/classes.constants';
import { Car, Component } from '../../../../shared/interfaces';
import { CarBoard } from '../car-board/car-board';
import './car-card.css';
import flag from '../../../../shared/assets/img/flag.svg';
import { CarSkin } from '../car-skin/car-skin';

export class CarCard implements Component {
  private carCard = document.createElement('li');

  private carBoard = new CarBoard().render();

  private flagImg = document.createElement('img');

  private carSkin = new CarSkin('green').render();

  constructor(car: Car) { }

  public render = (): HTMLElement => {
    this.carCard.classList.add(ClassesConstants.CAR_CARD);
    this.flagImg.classList.add(ClassesConstants.FLAG_IMG)
    this.flagImg.src = flag;
    this.carCard.append(this.carBoard, this.flagImg, this.carSkin);

    return this.carCard;
  };
}
