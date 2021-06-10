import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Car, Component } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import './car-create.css';

export class CarCreate implements Component {
  protected element = document.createElement('div');

  protected field = document.createElement('input');

  protected colorInput: HTMLInputElement = document.createElement('input');

  protected btn = new Button({ content: ContentConstants.CREATE }).render();

  constructor(protected redrawPage: () => void) {
    this.colorInput.type = 'color';
    this.colorInput.value = SettingsConstants.BASE_COLOR;
  }

  private addClasses = (): void => {
    this.element.classList.add(ClassesConstants.CAR_CREATE);
    this.field.classList.add(ClassesConstants.FIELD);
    this.colorInput.classList.add(ClassesConstants.COLOR_INPUT);
  };

  protected clearFields = (): void => {
    const { children } = this.element;
    const cb = (field: HTMLInputElement) => {
      if (field.classList.contains(ClassesConstants.COLOR_INPUT)) {
        field.value = SettingsConstants.BASE_COLOR;
      } else {
        field.value = '';
      }
    };

    [].forEach.call(children, cb);
  };

  protected handleClick = async (): Promise<void> => {
    const car = {
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();

    const response = await ApiService.createCar(car as Car);

    if (response && response.id) {
      this.redrawPage();
    }
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.btn.addEventListener('click', this.handleClick);
    this.element.append(this.field, this.colorInput, this.btn);

    return this.element;
  };
}
