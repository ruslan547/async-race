import { ClassesConstants } from '../../constants/classes.constants';
import { SettingsConstants } from '../../constants/settings.constants';
import { ButtonProps, Component } from '../../interfaces';
import './button.css';

export class Button implements Component {
  private button = document.createElement('button');

  constructor({ content, id, type }: ButtonProps = { content: '', type: SettingsConstants.USUAL }) {
    this.button.textContent = content;
    this.button.id = id || content;
    this.addClasses(type);
  }

  private addClasses = (type: string | undefined): void => {
    const optionClass = type === SettingsConstants.USUAL
      ? ClassesConstants.USUAL_BUTTON
      : ClassesConstants.MAIN_BUTTON;
    this.button.classList.add(ClassesConstants.BUTTON, optionClass);
  };

  public render = (): HTMLElement => this.button;
}
