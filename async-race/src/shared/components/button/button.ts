import { ClassesConstants } from '../../constants/classes.constants';
import { Component } from '../../interfaces';
import './button.css';

export class Button implements Component {
  private button = document.createElement('button');

  constructor(content: string, type = 'usual') {
    this.button.value = content;
    this.addClasses(type);
  }

  private addClasses = (type: string): void => {
    const optionClass = type === 'usual' ? 'usual-button' : 'main-button';
    this.button.classList.add(ClassesConstants.BUTTON, optionClass);
  };

  public render = (): HTMLElement => this.button;
}
