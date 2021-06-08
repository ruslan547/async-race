import './app.css';
import { Router } from './services/router.service';
import { ClassesConstants } from './shared/constants/classes.constants';
import { PathsConstants } from './shared/constants/paths.constants';
import { SettingsConstants } from './shared/constants/settings.constants';
import { Component } from './shared/interfaces';
import { Garage } from './shared/pages/garage/garage';
import { Winners } from './shared/pages/winners/winners';

export class App implements Component {
  private app = document.createElement('div');

  private router = new Router({ mode: SettingsConstants.HASH });

  constructor() {
    this.addPathsToRouter();
  }

  private printPage = (page: HTMLElement) => {
    this.app.innerHTML = '';
    this.app.append(page);
  };

  private addPathsToRouter = () => {
    this.router
      .add(PathsConstants.WINNERS, () => {
        this.printPage(new Winners().render());
      })
      .add(PathsConstants.GARAGE, () => {
        this.printPage(new Garage().render());
      });
  };

  public render = (): HTMLElement => {
    this.app.classList.add(ClassesConstants.APP);
    return this.app;
  };
}
