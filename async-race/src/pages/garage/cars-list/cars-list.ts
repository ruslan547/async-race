import { Car, Component } from '../../../shared/interfaces';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { CarCard } from './car-card/car-card';
import './cars-list.css';
import { ApiService } from '../../../shared/services/api.service';
import { StoreService } from '../../../shared/services/store.service';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { UtilService } from '../../../shared/services/util.service';
import { PageTitle } from '../../../shared/components/page-title/page-title';

export class CarsList implements Component {
  private carsList = document.createElement('ul');

  private storeService = new StoreService();

  private generateList = async (): Promise<void> => {
    await UtilService.getCars();

    const { cars } = this.storeService.getState();
    const carsArr = cars.map((car: Car) => new CarCard(car).render());

    this.carsList.append(...carsArr);
  };

  private getCarId = (elem: HTMLElement): number => {
    while (elem.nodeName && elem.nodeName !== 'LI') {
      elem = elem.parentNode as HTMLElement;
    }

    const idElem = elem.id.split('-');
    return +idElem[idElem.length - 1];
  };

  private handleClick = async ({ target }: Event): Promise<void> => {
    const elem = target as HTMLElement;
    const targetId = elem.id;
    const carId = this.getCarId(elem);
    console.log(targetId, `${ContentConstants.START_BTN}-${carId}`)
    if (targetId === ContentConstants.SELECT) {
      const car = await ApiService.getCar(carId);
      UtilService.fillCarUpdate(car);
    } else if (targetId === ContentConstants.REMOVE) {
      await ApiService.deleteCar(carId);
      UtilService.redrawGarage();
    } else if (targetId === `${ContentConstants.START_BTN}-${carId}`) {
      UtilService.startDriving(carId);
    }
  };

  public render = (): HTMLElement => {
    this.carsList.classList.add(ClassesConstants.CARS_LIST);
    this.generateList();
    this.carsList.addEventListener('click', this.handleClick);

    return this.carsList;
  };
}
