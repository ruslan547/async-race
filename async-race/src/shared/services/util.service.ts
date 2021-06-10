import { ClassesConstants } from "../constants/classes.constants";
import { Car, State } from "../interfaces";
import { Garage } from '../../pages/garage/garage';
import { StoreService } from "./store.service";
import { ApiService } from "./api.service";
import { ContentConstants } from "../constants/content.constants";
import { SettingsNumConstants } from "../constants/settings.constants";

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

  public static toggleDisabled = (elem: HTMLButtonElement | HTMLInputElement): void => {
    elem.classList.toggle(ClassesConstants.DISABLED);
    elem.disabled = elem.classList.contains(ClassesConstants.DISABLED);
  };

  public static getPosition = (elem: HTMLElement) => {
    const { top, left, width, height } = elem.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    }
  };

  public static getDistanceBetweenElem = (a: HTMLElement, b: HTMLElement) => {
    const aPosition = UtilService.getPosition(a);
    const bPosition = UtilService.getPosition(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  };

  public static animation = (car: HTMLElement, distance: number, animationTime: number): { [key: string]: number } => {
    let start = 0;
    const state: { [key: string]: number } = {};

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    }

    state.id = window.requestAnimationFrame(step);

    return state;
  };

  public static startDriving = async (id: number): Promise<{ success: boolean, id: number, time: number }> => {
    const startBtn = document.querySelector(`#${ContentConstants.START_BTN}-${id}`) as HTMLButtonElement;
    const stopBtn = document.querySelector(`#${ContentConstants.STOP_BTN}-${id}`) as HTMLButtonElement;
    const carSkin = document.querySelector(`#${ClassesConstants.CAR_SKIN}-${id}`) as HTMLElement;
    const flag = document.querySelector(`#${ClassesConstants.FLAG_IMG}-${id}`) as HTMLElement;

    const { velocity, distance } = await ApiService.startEngine(id);
    const time = Math.round(distance / velocity);
    const htmlDistance = Math.floor(UtilService.getDistanceBetweenElem(carSkin, flag)) + SettingsNumConstants.DISTANCE_COF;
    const state: State = UtilService.storeService.getState();

    state.animation[id] = UtilService.animation(carSkin, htmlDistance, time);
    UtilService.toggleDisabled(startBtn);
    UtilService.toggleDisabled(stopBtn);
    UtilService.storeService.setState({ ...state });

    const { success } = await ApiService.drive(id);
    if (!success) {
      window.cancelAnimationFrame(UtilService.storeService.getState().animation[id].id);
    }

    return { success, id, time };
  };
}
