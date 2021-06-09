import { Component } from '../../interfaces';
import { ClassesConstants } from '../../constants/classes.constants';
import './nav.css';
import { Button } from '../button/button';
import { ContentConstants } from '../../constants/content.constants';
import { SettingsConstants } from '../../constants/settings.constants';
import { PathsConstants } from '../../constants/paths.constants';

export class Nav implements Component {
  private nav = document.createElement('nav');

  private toGarage = new Button({
    content: ContentConstants.TO_GARAGE,
    type: SettingsConstants.MAIN,
  }).render();

  private toWinners = new Button({
    content: ContentConstants.TO_WINNERS,
    type: SettingsConstants.MAIN,
  }).render();

  private handleClick = ({ target }: Event): void => {
    const btn = target as HTMLButtonElement;
    const link = document.createElement('a');

    if (btn.id === ContentConstants.TO_GARAGE) {
      link.href = PathsConstants.GARAGE;
    } else if (btn.id === ContentConstants.TO_WINNERS) {
      link.href = PathsConstants.WINNERS;
    }

    link.click();
  };

  public render = (): HTMLElement => {
    this.nav.classList.add(ClassesConstants.NAV);
    this.nav.addEventListener('click', this.handleClick);
    this.nav.append(this.toGarage, this.toWinners);

    return this.nav;
  };
}
