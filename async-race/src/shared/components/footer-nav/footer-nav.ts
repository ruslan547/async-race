import { ClassesConstants } from '../../constants/classes.constants';
import { ContentConstants } from '../../constants/content.constants';
import { SettingsConstants } from '../../constants/settings.constants';
import { Component } from '../../interfaces';
import { StoreService } from '../../services/store.service';
import { UtilService } from '../../services/util.service';
import { Button } from '../button/button';

export class FooterNav implements Component {
  private storeService = new StoreService();

  private footerNav = document.createElement('div');

  private prevBtn = new Button({ content: ContentConstants.PREV, type: SettingsConstants.MAIN }).render();

  private nextBtn = new Button({ content: ContentConstants.NEXT, type: SettingsConstants.MAIN }).render();

  constructor() {
    if (this.storeService.getState().carsPage === 1) {
      (this.prevBtn as HTMLButtonElement).disabled = true;
    }
  }

  private handleClick = ({ target }: Event): void => {
    const elem = target as HTMLElement;
    const elemId = elem.id;
    const state = this.storeService.getState();

    if (elemId === ContentConstants.PREV) {
      this.storeService.setState({ ...state, carsPage: state.carsPage - 1 });
    } else if (elemId === ContentConstants.NEXT) {
      this.storeService.setState({ ...state, carsPage: state.carsPage + 1 });
    }

    UtilService.redrawGarage();
  };

  public render = (): HTMLElement => {
    this.footerNav.addEventListener('click', this.handleClick);
    this.footerNav.append(this.prevBtn, this.nextBtn);

    return this.footerNav;
  };
}
