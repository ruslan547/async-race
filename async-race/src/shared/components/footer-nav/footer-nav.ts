import { ContentConstants } from '../../constants/content.constants';
import { PathsConstants } from '../../constants/paths.constants';
import { SettingsConstants, SettingsNumConstants } from '../../constants/settings.constants';
import { Component } from '../../interfaces';
import { StoreService } from '../../services/store.service';
import { UtilService } from '../../services/util.service';
import { Button } from '../button/button';

export class FooterNav implements Component {
  private storeService = new StoreService();

  private footerNav = document.createElement('div');

  private prevBtn = new Button({ content: ContentConstants.PREV, type: SettingsConstants.MAIN }).render();

  private nextBtn = new Button({ content: ContentConstants.NEXT, type: SettingsConstants.MAIN }).render();

  private disableButtons = (): void => {
    const { view, carsPage, carsCount, winnersPage, winnersCount } = this.storeService.getState();

    if (view === PathsConstants.GARAGE) {
      const garagePageNum = Math.ceil(carsCount / SettingsNumConstants.LIMIT_GARAGE_NUM);

      if (carsPage === 1) {
        UtilService.toggleDisabled(this.prevBtn as HTMLButtonElement);
      }

      if (garagePageNum === carsPage) {
        UtilService.toggleDisabled(this.nextBtn as HTMLButtonElement);
      }
    } else {
      const winPageNum = Math.ceil(winnersCount / SettingsNumConstants.LIMIT_WIN_NUM);

      if (winnersPage === 1) {
        UtilService.toggleDisabled(this.prevBtn as HTMLButtonElement);
      }

      if (winPageNum === winnersPage) {
        UtilService.toggleDisabled(this.nextBtn as HTMLButtonElement);
      }
    }
  };

  private handleClick = ({ target }: Event): void => {
    const elem = target as HTMLElement;
    const elemId = elem.id;
    const state = this.storeService.getState();
    const { view, carsPage, winnersPage } = state;

    if (elemId === ContentConstants.PREV) {
      if (view === PathsConstants.GARAGE) {
        this.storeService.setState({ ...state, carsPage: carsPage - 1 });
      } else {
        this.storeService.setState({ ...state, winnersPage: winnersPage - 1 });
      }
    } else if (elemId === ContentConstants.NEXT) {
      if (view === PathsConstants.GARAGE) {
        this.storeService.setState({ ...state, carsPage: carsPage + 1 });
      } else {
        this.storeService.setState({ ...state, winnersPage: winnersPage + 1 });
      }
    }

    UtilService.redrawPage();
  };

  public render = (): HTMLElement => {
    this.disableButtons();
    this.footerNav.addEventListener('click', this.handleClick);
    this.footerNav.append(this.prevBtn, this.nextBtn);

    return this.footerNav;
  };
}
