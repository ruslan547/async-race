import { ClassesConstants } from "../constants/classes.constants";
import { Car } from "../interfaces";
import { Garage } from '../../pages/garage/garage';
import { StoreService } from "./store.service";
import { ApiService } from "./api.service";

export class UtilService {
  private static storeService = new StoreService();

  public static getCars = async (): Promise<void> => {
    const state = UtilService.storeService.getState();
    const response = await ApiService.getCars(state.carsPage);

    UtilService.storeService.setState({ ...state, ...response });
  };

  public static redrawGarage = (): void => {
    const appContent = document.querySelector(`.${ClassesConstants.APP_CONTENT}`);

    if (appContent) {
      appContent.innerHTML = '';
      appContent.append(new Garage().render())
    }
  };

  public static disableFields = (element: HTMLElement) => {
    const { children } = element;
    const cb = (field: HTMLInputElement | HTMLButtonElement) => {
      field.disabled = true;
    };

    [].forEach.call(children, cb);
  };

  public static activateFields = (element: HTMLElement) => {
    const { children } = element;
    const cb = (field: HTMLInputElement | HTMLButtonElement) => {
      field.disabled = false;
    };

    [].forEach.call(children, cb);
  };

  public static fillCarUpdate = (car: Car): void => {
    const carUpdate = document.querySelector(`.${ClassesConstants.CAR_UPDATE}`);
    const { children } = carUpdate as HTMLElement;

    UtilService.activateFields(carUpdate as HTMLElement);
    (children[1] as HTMLInputElement).value = car.name;
    (children[2] as HTMLInputElement).value = car.color;

    if (car.id) {
      (children[0] as HTMLInputElement).value = car.id.toString();
    }
  };

  private static getRandomName = (): string => {
    const marks = ['BMW', 'Mercedes', 'Audi', 'Opel', 'Toyota', 'Mazda', 'Honda'];
    const models = ['7', 'GTR', 'GT500', 'RX7', 'A4', 'Coder', 'Camry'];
    const mark = marks[Math.floor(Math.random() * marks.length)];
    const model = models[Math.floor(Math.random() * models.length)];

    return `${mark} ${model}`;
  };

  private static getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  public static generateRandomCars = (count = 100): Car[] => {
    return new Array(count).fill('').map(_ => ({
      name: UtilService.getRandomName(),
      color: UtilService.getRandomColor(),
    })) as Car[];
  };
}
