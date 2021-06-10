import { ClassesConstants } from '../../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../../shared/constants/content.constants';
import { Car, Component } from '../../../../shared/interfaces';
import './engine-setting.css';

export class EngineSetting implements Component {
  private engineSetting = document.createElement('div');

  private startBtn = document.createElement('button');

  private stopBtn = document.createElement('button');

  constructor(private car: Car) { }

  private addClasses = (): void => {
    this.engineSetting.classList.add(ClassesConstants.ENGINE_SETTING);
    this.startBtn.classList.add(ClassesConstants.ENGINE_BTN);
    this.stopBtn.classList.add(ClassesConstants.ENGINE_BTN);
    this.stopBtn.classList.add(ClassesConstants.DISABLED);
  };

  private setContent = (): void => {
    this.startBtn.textContent = ContentConstants.START_BTN;
    this.stopBtn.textContent = ContentConstants.STOP_BTN;
  };

  private setAttributes = (): void => {
    this.startBtn.id = `${ContentConstants.START_BTN}-${this.car.id}`;
    this.stopBtn.id = `${ContentConstants.STOP_BTN}-${this.car.id}`;
    this.stopBtn.disabled = true;
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.setContent();
    this.setAttributes();
    this.engineSetting.append(this.startBtn, this.stopBtn);

    return this.engineSetting;
  };
}
