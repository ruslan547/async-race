import { ClassesConstants } from '../constants/classes.constants';
import { Car, Winner } from '../interfaces';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
import { ContentConstants } from '../constants/content.constants';
import { SettingsNumConstants } from '../constants/settings.constants';

type EngineResponse = { success: boolean, id: number, time: number };

export class UtilService {
  private static storeService = new StoreService();

  public static getCars = async (): Promise<void> => {
    const state = UtilService.storeService.getState();
    const response = await ApiService.getCars(state.carsPage);

    UtilService.storeService.setState({ ...state, ...response });
  };

  public static getWinners = async (): Promise<void> => {
    const state = UtilService.storeService.getState();
    const { winnersPage, sortBy, sortOrder } = state;
    const response = await ApiService.getWinners(winnersPage, sortBy, sortOrder);

    UtilService.storeService.setState({ ...state, ...response });
  };

  public static addDisabledToFields = (element: HTMLElement): void => {
    const { children } = element;
    const cb = (field: HTMLInputElement | HTMLButtonElement) => {
      UtilService.addDisabled(field);
    };

    [].forEach.call(children, cb);
  };

  public static removeDisabledToFields = (element: HTMLElement): void => {
    const { children } = element;
    const cb = (field: HTMLInputElement | HTMLButtonElement) => {
      UtilService.removeDisabled(field);
    };

    [].forEach.call(children, cb);
  };

  public static fillCarUpdate = (car: Car): void => {
    const { getState, setState } = UtilService.storeService;
    const carUpdate = document.querySelector(`.${ClassesConstants.CAR_UPDATE}`) as HTMLElement;
    const { children } = carUpdate;

    if ((children[0] as HTMLInputElement).disabled) {
      UtilService.removeDisabledToFields(carUpdate);
    }

    (children[0] as HTMLInputElement).value = car.name;
    (children[1] as HTMLInputElement).value = car.color;

    setState({
      ...getState(),
      updateText: car.name,
      updateColor: car.color,
      updateId: car.id,
    });
  };

  private static getRandomName = (): string => {
    const marks = [
      'BMW', 'Mercedes', 'Audi', 'Opel', 'Toyota', 'Mazda', 'Honda', 'Mitsubishi', 'Porsche', 'Volkswagen',
    ];
    const models = ['M5', 'GTR', 'GT500', 'RX7', 'A4', 'Coder', 'Camry', 'Polo', 'Benz', 'Cayenne'];
    const mark = marks[Math.floor(Math.random() * marks.length)];
    const model = models[Math.floor(Math.random() * models.length)];

    return `${mark} ${model}`;
  };

  private static getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < SettingsNumConstants.COLOR_CODE_SIGNS; i += 1) {
      color += letters[Math.floor(Math.random() * SettingsNumConstants.HEX_SIGNS)];
    }

    return color;
  };

  public static generateRandomCars = (count = 100): Car[] => new Array(count).fill('').map(() => ({
    name: UtilService.getRandomName(),
    color: UtilService.getRandomColor(),
  })) as Car[];

  public static addDisabled = (elem: HTMLButtonElement | HTMLInputElement): void => {
    elem.classList.add(ClassesConstants.DISABLED);
    elem.disabled = elem.classList.contains(ClassesConstants.DISABLED);
  };

  public static removeDisabled = (elem: HTMLButtonElement | HTMLInputElement): void => {
    elem.classList.remove(ClassesConstants.DISABLED);
    elem.disabled = elem.classList.contains(ClassesConstants.DISABLED);
  };

  public static getPosition = (elem: HTMLElement): { x: number, y: number } => {
    const {
      top, left, width, height,
    } = elem.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  public static getDistanceBetweenElem = (a: HTMLElement, b: HTMLElement): number => {
    const aPosition = UtilService.getPosition(a);
    const bPosition = UtilService.getPosition(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  };

  public static animation = (
    car: HTMLElement,
    distance: number,
    animationTime: number,
  ): { [key: string]: number } => {
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
    };

    state.id = window.requestAnimationFrame(step);

    return state;
  };

  public static startDriving = async (id: number): Promise<EngineResponse> => {
    const startBtn = document.querySelector(`#${ContentConstants.START_BTN}-${id}`) as HTMLButtonElement;
    const stopBtn = document.querySelector(`#${ContentConstants.STOP_BTN}-${id}`) as HTMLButtonElement;
    const carSkin = document.querySelector(`#${ClassesConstants.CAR_SKIN}-${id}`) as HTMLElement;
    const flag = document.querySelector(`#${ClassesConstants.FLAG_IMG}-${id}`) as HTMLElement;
    const resetBtn = document.querySelector(`#${ContentConstants.RESET}`) as HTMLButtonElement;

    UtilService.addDisabled(startBtn);
    UtilService.removeDisabled(stopBtn);

    const { velocity, distance } = await ApiService.startEngine(id);
    const time = Math.round(distance / velocity);
    const htmlDistance = Math.floor(
      UtilService.getDistanceBetweenElem(carSkin, flag),
    ) + SettingsNumConstants.DISTANCE_COF;
    const { getState, setState } = UtilService.storeService;

    getState().animation[id] = UtilService.animation(carSkin, htmlDistance, time);

    const { success } = await ApiService.drive(id);

    if (!success) {
      setState({ ...getState(), stoppedCars: getState().stoppedCars + 1 });
      window.cancelAnimationFrame(getState().animation[id].id);

      if (getState().stoppedCars >= getState().cars.length) {
        UtilService.removeDisabled(resetBtn);
      }
    }

    return { success, id, time };
  };

  public static stopDriving = async (id: number): Promise<void> => {
    const startBtn = document.querySelector(`#${ContentConstants.START_BTN}-${id}`) as HTMLButtonElement;
    const stopBtn = document.querySelector(`#${ContentConstants.STOP_BTN}-${id}`) as HTMLButtonElement;
    const carSkin = document.querySelector(`#${ClassesConstants.CAR_SKIN}-${id}`) as HTMLElement;
    const state = UtilService.storeService.getState();

    UtilService.addDisabled(stopBtn);
    await ApiService.stopEngine(id);
    UtilService.removeDisabled(startBtn);
    carSkin.style.transform = 'translateX(0)';

    if (state.animation[id]) {
      window.cancelAnimationFrame(state.animation[id].id);
    }
  };

  public static raceAll = async (
    promises: Promise<{ success: boolean, id: number, time: number }>[],
    ids: number[],
  ): Promise<Winner> => {
    const { success, id, time } = await Promise.race(promises);
    const state = UtilService.storeService.getState();

    if (!success) {
      const failedIndex = ids.findIndex((item) => item === id);
      const restPromises = promises.filter((_, index) => index !== failedIndex);
      const restIds = ids.filter((_, index) => index !== failedIndex);

      return UtilService.raceAll(restPromises, restIds);
    }

    return {
      id,
      car: state.cars.find((car: Car) => car.id === id),
      time: +(time / 1000).toFixed(2),
    } as Winner;
  };

  public static race = async (
    action: (id: number) => Promise<EngineResponse> | Promise<void>,
  ): Promise<Winner> => {
    const raceBtn = document.querySelector(`#${ContentConstants.RACE}`) as HTMLButtonElement;
    const resetBtn = document.querySelector(`#${ContentConstants.RESET}`) as HTMLButtonElement;

    const { cars } = UtilService.storeService.getState();
    const carsIds = cars.map(({ id }: Car) => id);
    const promises = carsIds.map((id) => action(id));

    if (action === UtilService.stopDriving) {
      await Promise.all(promises as Promise<void>[]);
      UtilService.removeDisabled(raceBtn);
      return {} as Winner;
    }

    const winner = await UtilService.raceAll(promises as Promise<EngineResponse>[], carsIds);

    UtilService.removeDisabled(resetBtn);

    return winner;
  };
}
