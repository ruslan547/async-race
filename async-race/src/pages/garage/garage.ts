import { PageNumber } from '../../shared/components/page-number/page-number';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component } from '../../shared/interfaces';
import { CarBoard } from './car-board/car-board';
import './garage.css';

export class Garage implements Component {
  private garage = document.createElement('div');

  private carBoard = new CarBoard().render();

  private garageTitle = new PageTitle(ContentConstants.GARAGE, 0).render();

  private pageNumber = new PageNumber(0).render();

  public render = (): HTMLElement => {
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(this.carBoard, this.garageTitle, this.pageNumber);

    return this.garage;
  };
}
