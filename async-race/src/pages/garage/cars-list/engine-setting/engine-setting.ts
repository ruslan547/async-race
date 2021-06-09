import { ClassesConstants } from '../../../../shared/constants/classes.constants';
import { Component } from '../../../../shared/interfaces';
import './engine-setting.css';

export class EngineSetting implements Component {
  private engineSetting = document.createElement('div');

  private startBtn = document.createElement('button');

  private stopBtn = document.createElement('button');

  private addClasses = (): void => {
    this.engineSetting.classList.add(ClassesConstants.ENGINE_SETTING);
    this.startBtn.classList.add(ClassesConstants.ENGINE_BTN);
    this.stopBtn.classList.add(ClassesConstants.ENGINE_BTN);
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.startBtn.textContent = 'a';
    this.stopBtn.textContent = 'b';
    this.engineSetting.append(this.startBtn, this.stopBtn);

    return this.engineSetting;
  };
}
