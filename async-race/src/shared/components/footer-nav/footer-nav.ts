import { ClassesConstants } from '../../constants/classes.constants';
import { ContentConstants } from '../../constants/content.constants';
import { SettingsConstants } from '../../constants/settings.constants';
import { Component } from '../../interfaces';
import { Button } from '../button/button';

export class FooterNav implements Component {
  private footerNav = document.createElement('div');

  private prevBtn = new Button({ content: ContentConstants.PREV, type: SettingsConstants.MAIN }).render();

  private nextBtn = new Button({ content: ContentConstants.NEXT, type: SettingsConstants.MAIN }).render();

  public render = (): HTMLElement => {
    this.footerNav.append(this.prevBtn, this.nextBtn);
    return this.footerNav;
  };
}
