import { Car, Component } from '../../../shared/interfaces';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { CarCard } from './car-card/car-card';
import './cars-list.css';
import { ApiService } from '../../../shared/services/api.service';
import { StoreService } from '../../../shared/services/store.service';

export class CarsList implements Component {
  private carsList = document.createElement('ul');

  private storeService = new StoreService();

  private getCars = async (): Promise<void> => {
    const state = this.storeService.getState();
    const response = await ApiService.getCars(state.carsPage);

    this.storeService.setState({ ...state, ...response });
  }

  private generateList = async (): Promise<void> => {
    await this.getCars();

    const { cars } = this.storeService.getState();
    const carsArr = cars.map((car: Car) => new CarCard(car).render());

    this.carsList.append(...carsArr);
  };

  private handleClick = ({ target }: Event): void => {
    console.log(target);
  };

  public render = (): HTMLElement => {
    this.carsList.classList.add(ClassesConstants.CARS_LIST);
    this.generateList();
    this.carsList.addEventListener('click', this.handleClick);

    return this.carsList;
  };
}
