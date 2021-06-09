export type RoutePath = RegExp | string;

export type RouteCb = () => void;

export interface Route {
  path: RoutePath;
  cb: RouteCb;
}

export interface RouterProps {
  mode: string | null;
  root?: string;
}

export interface Component {
  render(): HTMLElement;
}

export interface ButtonProps {
  content: string;
  id?: string;
  type: string;
}
