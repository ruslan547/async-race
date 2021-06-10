import { Component, Winner } from '../../../shared/interfaces';
import { StoreService } from '../../../shared/services/store.service';
import { UtilService } from '../../../shared/services/util.service';
import { TRow } from '../t-row/t-row';

export class TBody implements Component {
  private storeService = new StoreService();

  private tbody = document.createElement('tbody');

  private fillTable = async (): Promise<void> => {
    await UtilService.getWinners();

    const { winners } = this.storeService.getState();
    const rows = winners.map((winner: Winner, index: number) => new TRow(winner, index).render());

    this.tbody.append(...rows);
  };

  public render = (): HTMLElement => {
    this.fillTable();
    this.tbody.classList.add();
    return this.tbody;
  };
}
