import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { Car, Component } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import './car-create.css';

export class CarCreate implements Component {
  protected element = document.createElement('div');

  protected field = document.createElement('input');

  protected colorInput: HTMLInputElement = document.createElement('input');

  protected btn = new Button({ content: ContentConstants.CREATE }).render();

  constructor() {
    this.colorInput.type = 'color';
  }

  private addClasses = (): void => {
    this.element.classList.add(ClassesConstants.CAR_SETTING);
    this.field.classList.add(ClassesConstants.FIELD);
    this.colorInput.classList.add(ClassesConstants.COLOR_INPUT);
  };

  protected clearFields = (): void => {
    const { children } = this.element;
    const cb = (field: HTMLInputElement) => {
      field.value = '';
    };

    [].forEach.call(children, cb);
  };

  protected handleClick = (): void => {
    const car: Car = {
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();
    ApiService.createCar(car);
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.btn.addEventListener('click', this.handleClick);
    this.element.append(this.field, this.colorInput, this.btn);

    return this.element;
  };
}
