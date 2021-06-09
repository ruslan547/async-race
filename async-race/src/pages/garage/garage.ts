import { FooterNav } from '../../shared/components/footer-nav/footer-nav';
import { PageNumber } from '../../shared/components/page-number/page-number';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component, State } from '../../shared/interfaces';
import { StoreService } from '../../shared/services/store.service';
import { UtilService } from '../../shared/services/util.service';
import { CarsList } from './cars-list/cars-list';
import { GarageBoard } from './garage-board/garage-board';
import './garage.css';

export class Garage implements Component {
  private storeService = new StoreService();

  private garage = document.createElement('div');

  private carBoard = new GarageBoard().render();

  private garageTitle = new PageTitle(ContentConstants.GARAGE, this.storeService.getState().carsCount).render();

  private pageNumber = new PageNumber(this.storeService.getState().carsPage).render();

  private carsList = new CarsList().render();

  private footerNav = new FooterNav().render();

  constructor() {
    UtilService.getCars();
  }

  public render = (): HTMLElement => {
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(this.carBoard, this.garageTitle, this.pageNumber, this.carsList, this.footerNav);

    return this.garage;
  };
}
