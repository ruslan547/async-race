import { SettingsConstants } from '../constants/settings.constants';
import { State } from '../interfaces';

export class StoreService {
  private state: State = {
    carsPage: 1,
    cars: [],
    carsCount: 0,
    winnersPage: 1,
    winners: [],
    winnersCount: 0,
    animation: {}, // {};
    view: 'garage',
    sortBy: null,
    sortOrder: null,
    createText: '',
    updateText: '',
    createColor: SettingsConstants.BASE_COLOR,
    updateColor: SettingsConstants.BASE_COLOR,
    updateId: null,
    stoppedCars: 0,
  };

  private subscribers: Array<(state: State) => void> = [];

  private static instance: null | StoreService = null;

  constructor() {
    if (!StoreService.instance) {
      StoreService.instance = this;
      StoreService.instance.state = this.state;
      StoreService.instance.subscribers = this.subscribers;
    } else {
      return StoreService.instance;
    }
  }

  public getState = (): State => this.state;

  public setState = (state: State): void => {
    this.state = state;
    this.subscribers.forEach((cb) => cb(this.state));
  };

  public subscribe = (cb: (state: State) => void): void => {
    this.subscribers.push(cb);
  };
}
