import './app.css';
import { Router } from './services/router.service';
import { PathsConstants } from './shared/constants/paths.constants';
import { Component } from './shared/interfaces';

export class App implements Component {
  private router = new Router({ mode: 'hash' });

  constructor() {
    this.addPathsToRouter();
  }

  private addPathsToRouter = () => {
    this.router
      .add(PathsConstants.WINNERS, () => {
        console.log('winners');
      })
      .add(PathsConstants.GARAGE, () => {
        console.log('garag');
      });
  };

  public render = (): HTMLElement => {
    return document.createElement('div');
  };
}
