import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Component } from '../../../shared/interfaces';
import { StoreService } from '../../../shared/services/store.service';
import { UtilService } from '../../../shared/services/util.service';
import './t-head.css';

export class THead implements Component {
  private storeService = new StoreService();

  private thead = document.createElement('thead');

  private row = document.createElement('tr');

  private numTd = document.createElement('th');

  private carTd = document.createElement('th');

  private nameTd = document.createElement('th');

  private winsTd = document.createElement('th');

  private timeTd = document.createElement('th');

  constructor(private redrawPage: () => void) { }

  private getRow = (): HTMLElement => {
    this.numTd.textContent = ContentConstants.NUMBER;
    this.carTd.textContent = ContentConstants.CAR;
    this.nameTd.textContent = ContentConstants.NAME;
    this.winsTd.textContent = ContentConstants.WINS;
    this.timeTd.textContent = ContentConstants.TIME;
    this.winsTd.id = ContentConstants.WINS;
    this.timeTd.id = ContentConstants.TIME;
    this.row.append(this.numTd, this.carTd, this.nameTd, this.winsTd, this.timeTd);

    return this.row;
  };

  private addClasses = (): void => {
    this.thead.classList.add(ClassesConstants.T_HEAD);
    this.winsTd.classList.add(ClassesConstants.TH_BTN);
    this.timeTd.classList.add(ClassesConstants.TH_BTN);
  };

  private handleClick = async ({ target }: Event): Promise<void> => {
    const elem = target as HTMLElement;
    const elemId = elem.id;
    const state = this.storeService.getState();
    const { sortBy, sortOrder } = state;
    const {
      SORT_BY_TIME, SORT_BY_WINS, ASC, DESC,
    } = SettingsConstants;

    if (elemId === ContentConstants.WINS) {
      if (sortBy === SORT_BY_WINS) {
        const order = sortOrder === ASC ? DESC : ASC;
        this.storeService.setState({ ...state, sortBy: SORT_BY_WINS, sortOrder: order });
      } else {
        this.storeService.setState({ ...state, sortBy: SORT_BY_WINS, sortOrder: ASC });
      }
    } else if (elemId === ContentConstants.TIME) {
      if (sortBy === SORT_BY_TIME) {
        const order = sortOrder === ASC ? DESC : ASC;
        this.storeService.setState({ ...state, sortBy: SORT_BY_TIME, sortOrder: order });
      } else {
        this.storeService.setState({ ...state, sortBy: SORT_BY_TIME, sortOrder: ASC });
      }
    }

    await UtilService.getWinners();
    this.redrawPage();
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.row.addEventListener('click', this.handleClick);
    this.thead.append(this.getRow());

    return this.thead;
  };
}
