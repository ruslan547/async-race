import { Component } from '../../../shared/interfaces';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { CarCard } from './car-card/car-card';
import './cars-list.css';

export class CarsList implements Component {
  private carsList = document.createElement('ul');

  private generateList = () => {
    console.log('generateList');
    return new CarCard().render();
  };

  public render = (): HTMLElement => {
    this.carsList.classList.add(ClassesConstants.CARS_LIST);
    this.carsList.append(this.generateList());

    return this.carsList;
  };
}
