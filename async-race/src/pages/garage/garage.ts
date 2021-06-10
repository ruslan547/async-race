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

  private garageTitle;

  private pageNumber;

  private carsList = new CarsList().render();

  private footerNav = new FooterNav().render();

  private carsNum;

  private carsCount;

  constructor() {
    const { carsCount, carsPage, cars } = this.storeService.getState();

    this.garageTitle = new PageTitle(ContentConstants.GARAGE, carsCount).render();
    this.pageNumber = new PageNumber(carsPage).render();
    this.carsNum = cars.length;
    this.carsCount = carsCount;
  }

  private updateGarage = async (): Promise<void> => {
    await UtilService.getCars();
    const state = this.storeService.getState();
    const { cars, carsCount, carsPage } = state;

    if (cars.length === 0 && carsPage !== 1) {
      this.storeService.setState({ ...state, carsPage: carsPage - 1 });
    }

    if (this.carsNum !== cars.length || this.carsCount !== carsCount) {
      UtilService.redrawPage();
    }
  };

  public render = (): HTMLElement => {
    this.updateGarage();
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(this.carBoard, this.garageTitle, this.pageNumber, this.carsList, this.footerNav);

    return this.garage;
  };
}
