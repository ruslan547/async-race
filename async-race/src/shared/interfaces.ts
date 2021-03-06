export type RoutePath = RegExp | string;

export type RouteCb = () => void;

export type EngineResponse = { velocity: number; distance: number };

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
  type?: string;
}

export interface State {
  carsPage: number;
  cars: Car[] | never[];
  carsCount: number;
  winnersPage: number;
  winners: Winner[] | never[];
  winnersCount: number;
  animation: { [key: string]: { [key: string]: number } };
  view: string;
  sortBy: null | string;
  sortOrder: null | string;
  createText: string;
  updateText: string;
  createColor: string;
  updateColor: string;
  updateId: null | number;
  stoppedCars: number;
}

export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
  car: Car;
}
