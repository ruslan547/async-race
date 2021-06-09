import { FooterNav } from '../../shared/components/footer-nav/footer-nav';
import { PageNumber } from '../../shared/components/page-number/page-number';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component } from '../../shared/interfaces';
import { CarsList } from './cars-list/cars-list';
import { GarageBoard } from './garage-board/garage-board';
import './garage.css';

export class Garage implements Component {
  private garage = document.createElement('div');

  private carBoard = new GarageBoard().render();

  private garageTitle = new PageTitle(ContentConstants.GARAGE, 0).render();

  private pageNumber = new PageNumber(0).render();

  private carsList = new CarsList().render();

  private footerNav = new FooterNav().render();

  public render = (): HTMLElement => {
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(this.carBoard, this.garageTitle, this.pageNumber, this.carsList, this.footerNav);

    return this.garage;
  };
}
