import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { Component } from '../../../shared/interfaces';
import './color-setting.css';

export class ColorSetting implements Component {
  private colorSetting = document.createElement('div');

  private colorExample = document.createElement('div');

  private colorInput: HTMLInputElement = document.createElement('input');

  constructor() {
    this.colorInput.type = 'color';
    this.colorExample.style.backgroundColor = this.colorInput.value;
  }

  private addClasses = (): void => {
    this.colorSetting.classList.add(ClassesConstants.COLOR_SETTING);
    this.colorExample.classList.add(ClassesConstants.COLOR_EXAMPLE);
    this.colorInput.classList.add(ClassesConstants.COLOR_INPUT);
  };

  private handleInput = (): void => {
    this.colorExample.style.backgroundColor = this.colorInput.value;
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.colorSetting.append(this.colorExample, this.colorInput);
    this.colorInput.addEventListener('input', this.handleInput);

    return this.colorSetting;
  };
}
