import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { Component } from '../../../shared/interfaces';
import { TBody } from '../t-body/t-body';
import { THead } from '../t-head/t-head';
import './winners-table.css';

export class WinnersTable implements Component {
  private table = document.createElement('table');

  private thead = new THead(this.redrawPage).render();

  private tbody = new TBody().render();

  constructor(private redrawPage: () => void) {}

  public render = (): HTMLElement => {
    this.table.classList.add(ClassesConstants.WIN_TABLE);
    this.table.append(this.thead, this.tbody);

    return this.table;
  };
}
