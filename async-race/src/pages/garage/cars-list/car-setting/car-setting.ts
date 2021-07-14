import { Button } from '../../../../shared/components/button/button';
import { Car, Component } from '../../../../shared/interfaces';
import { ContentConstants } from '../../../../shared/constants/content.constants';
import './car-setting.css';
import { ClassesConstants } from '../../../../shared/constants/classes.constants';

export class CarSetting implements Component {
  private carSetting = document.createElement('div');

  private selectBtn = new Button({ content: ContentConstants.SELECT }).render();

  private removeBtn = new Button({ content: ContentConstants.REMOVE }).render();

  private nameField = document.createElement('div');

  constructor(car: Car) {
    this.nameField.textContent = car.name;
  }

  private addClasses = (): void => {
    this.carSetting.classList.add(ClassesConstants.CAR_SETTING);
    this.nameField.classList.add(ClassesConstants.NAME_FIELD);
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.carSetting.append(this.selectBtn, this.removeBtn, this.nameField);

    return this.carSetting;
  };
}
