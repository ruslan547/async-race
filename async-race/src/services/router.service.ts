import { PathsConstants } from '../shared/constants/paths.constants';
import {
  Route, RouteCb, RoutePath, RouterProps,
} from '../shared/interfaces';

export class Router {
  routes: Route[] = [];

  mode: string | null = null;

  root: string = PathsConstants.ROOT;

  current: string | null = null;

  intervalId: NodeJS.Timeout | null = null;

  constructor(options: RouterProps) {
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path: RoutePath, cb: RouteCb): Router => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: RoutePath): Router => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = (): Router => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: RoutePath): string => path
    .toString()
    .replace(/\/$/, '')
    .replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = ''): Router => {
    if (this.mode === 'history') {
      window.history.pushState(null, '', this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = (): void => {
    if (typeof this.interval === 'number') {
      clearInterval(this.intervalId as NodeJS.Timeout);
    }

    this.intervalId = setInterval(this.interval, 50);
  };

  interval = (): void => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current?.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match as []);
        return match;
      }
      return false;
    });
  };
}
