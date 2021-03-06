import './app.css';
import { Router } from './shared/services/router.service';
import { ClassesConstants } from './shared/constants/classes.constants';
import { PathsConstants } from './shared/constants/paths.constants';
import { SettingsConstants } from './shared/constants/settings.constants';
import { Component } from './shared/interfaces';
import { Garage } from './pages/garage/garage';
import { Winners } from './pages/winners/winners';
import { Nav } from './shared/components/nav/nav';
import { StoreService } from './shared/services/store.service';

export class App implements Component {
  private storeService = new StoreService();

  private app = document.createElement('div');

  private nav = new Nav().render();

  private content = document.createElement('div');

  private router = new Router({ mode: SettingsConstants.HASH });

  constructor() {
    this.app.append(this.nav, this.content);
    this.addPathsToRouter();
  }

  private printPage = (page: HTMLElement) => {
    this.content.innerHTML = '';
    this.content.append(page);
  };

  private addPathsToRouter = () => {
    this.router
      .add(PathsConstants.WINNERS, () => {
        const state = this.storeService.getState();

        this.storeService.setState({ ...state, view: PathsConstants.WINNERS });
        this.printPage(new Winners().render());
      })
      .add('', () => {
        const state = this.storeService.getState();

        this.storeService.setState({ ...state, view: PathsConstants.GARAGE });
        this.printPage(new Garage().render());
      });
  };

  private addClasses = (): void => {
    this.app.classList.add(ClassesConstants.APP);
    this.content.classList.add(ClassesConstants.APP_CONTENT);
  };

  public render = (): HTMLElement => {
    this.addClasses();
    return this.app;
  };
}
