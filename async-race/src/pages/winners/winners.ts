import { FooterNav } from '../../shared/components/footer-nav/footer-nav';
import { PageNumber } from '../../shared/components/page-number/page-number';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ClassesConstants } from '../../shared/constants/classes.constants';
import { ContentConstants } from '../../shared/constants/content.constants';
import { Component } from '../../shared/interfaces';
import { StoreService } from '../../shared/services/store.service';
import { UtilService } from '../../shared/services/util.service';
import { WinnersTable } from './winners-table/winners-table';
import './winners.css';

export class Winners implements Component {
  private storeService = new StoreService();

  private winners = document.createElement('div');

  private winnerTitle;

  private pageNumber;

  private winnersTable = new WinnersTable().render();

  private footerNav = new FooterNav().render();

  private winnersNum;

  private winnersCount;

  constructor() {
    const { winnersCount, winnersPage, winners } = this.storeService.getState();

    this.winnerTitle = new PageTitle(ContentConstants.WINNERS, winnersCount).render();
    this.pageNumber = new PageNumber(winnersPage).render();
    this.winnersNum = winners.length;
    this.winnersCount = winnersCount
  }

  // to do delete
  private updateWinners = async (): Promise<void> => {
    await UtilService.getWinners();
    const state = this.storeService.getState();
    const { winners, winnersCount, winnersPage } = state;

    if (winners.length === 0 && winnersPage !== 1) {
      this.storeService.setState({ ...state, winnersPage: winnersPage - 1 });
    }

    // to do delete
    if (this.winnersNum !== winners.length || this.winnersCount !== winnersCount) {
      UtilService.redrawGarage();
    }
  };

  public render = (): HTMLElement => {
    // this.updateWinners();
    this.winners.classList.add(ClassesConstants.WINNERS);
    this.winners.append(this.winnerTitle, this.pageNumber, this.winnersTable, this.footerNav);

    return this.winners;
  };
}
