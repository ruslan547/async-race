import { FooterNav } from '../../shared/components/footer-nav/footer-nav';
import { PageNumber } from '../../shared/components/page-number/page-number';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component } from '../../shared/interfaces';
import { StoreService } from '../../shared/services/store.service';
import { UtilService } from '../../shared/services/util.service';
import { CarsList } from './cars-list/cars-list';
import { GarageBoard } from './garage-board/garage-board';
import './garage.css';

export class Garage implements Component {
  private storeService = new StoreService();

  private garage = document.createElement('div');

  private carBoard;

  private garageTitle = new PageTitle(
    ContentConstants.GARAGE,
    this.storeService.getState().carsCount,
  ).render();

  private pageNumber;

  private carsList;

  private footerNav;

  constructor() {
    const { carsPage } = this.storeService.getState();

    this.carBoard = new GarageBoard(this.redrawPage).render();
    this.pageNumber = new PageNumber(carsPage).render();
    this.carsList = new CarsList(this.redrawPage).render();
    this.footerNav = new FooterNav(this.redrawPage).render();
  }

  private updateGarage = async (): Promise<void> => {
    await UtilService.getCars();

    const state = this.storeService.getState();
    const { cars, carsPage } = state;

    if (cars.length === 0 && carsPage !== 1) {
      this.storeService.setState({ ...state, carsPage: carsPage - 1 });
      this.redrawPage();
    }
  };

  private redrawPage = (): void => {
    const appContent = document.querySelector(`.${ClassesConstants.APP_CONTENT}`);

    if (appContent) {
      appContent.innerHTML = '';
      appContent.append(new Garage().render());
    }
  };

  public render = (): HTMLElement => {
    const prevCarsCount = this.storeService.getState().carsCount;

    this.storeService.subscribe(({ carsCount }) => {
      if (carsCount !== prevCarsCount) {
        this.garageTitle.replaceWith(new PageTitle(
          ContentConstants.GARAGE,
          carsCount,
        ).render());
        this.footerNav.replaceWith(new FooterNav(this.redrawPage).render());
      }
    });

    this.updateGarage();
    this.garage.classList.add(ClassesConstants.GARAGE);
    this.garage.append(
      this.carBoard,
      this.garageTitle,
      this.pageNumber,
      this.carsList,
      this.footerNav,
    );

    return this.garage;
  };
}
