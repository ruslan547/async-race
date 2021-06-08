import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component } from '../../shared/interfaces';
import './garage.css';

export class Garage implements Component {
  private garage = document.createElement('div');

  private garageTitle = new PageTitle(ContentConstants.GARAGE, 0).render();

  public render = (): HTMLElement => {
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(this.garageTitle);

    return this.garage;
  };
}
