import { PathsConstants } from '../constants/paths.constants';
import { Car, Winner } from '../interfaces';

const {
  BASE,
  GARAGE,
  WINNERS,
  PAGE_QUERY,
  LIMIT_QUERY,
  ID_QUERY,
  STATUS_QUERY,
  SORT_QUERY,
  ORDER_QUERY,
  ENGINE,
} = PathsConstants;

export class ApiService {
  public static getCars = async (
    page: number,
    limit = 7,
  ): Promise<{ cars: Car[] | never[], carsCount: number }> => {
    const response = await fetch(`${BASE}/${GARAGE}?${PAGE_QUERY}=${page}&${LIMIT_QUERY}=${limit}`);
    const header = response.headers.get('X-Total-Count');
    const carsCount = header ? parseInt(header) : 0;

    return {
      cars: await response.json(),
      carsCount,
    };
  };

  public static getCar = async (id: number): Promise<Car> => {
    const response = await fetch(`${BASE}/${GARAGE}/${id}`);
    return response.json();
  };

  public static createCar = async (body: Car): Promise<{ id: number }> => {
    const response = await fetch(`${BASE}/${GARAGE}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  public static deleteCar = async (id: number): Promise<Car> => {
    const response = await fetch(`${BASE}/${GARAGE}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  };

  public static updateCar = async (id: number, body: Car): Promise<Car> => {
    const response = await fetch(`${BASE}/${GARAGE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  public static startEngine = async (id: number): Promise<{ velocity: number, distance: number }> => {
    const response = await fetch(`${BASE}/${ENGINE}?${ID_QUERY}=${id}&${STATUS_QUERY}=started`);
    return response.json();
  };

  public static stopEngine = async (id: number): Promise<{ velocity: number, distance: number }> => {
    const response = await fetch(`${BASE}/${ENGINE}?${ID_QUERY}=${id}&${STATUS_QUERY}=stopped`);
    return response.json();
  };

  public static drive = async (id: number): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE}/${ENGINE}?${ID_QUERY}=${id}&${STATUS_QUERY}=drive`).catch();
    return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  };

  private static getSortOrder = (sort: string | null, order: string | null): string => {
    if (sort && order) {
      return `&${SORT_QUERY}=${sort}&${ORDER_QUERY}=${order}`;
    }

    return '';
  };

  public static getWinners = async (
    winnersPage: number,
    sortBy: string | null,
    sortOrder: string | null,
    limit = 10,
  ): Promise<{ winners: Winner[] | never[], winnersCount: number }> => {
    const url = `${BASE}/${WINNERS}`;
    const queries = `?${PAGE_QUERY}=${winnersPage}&${LIMIT_QUERY}=${limit}${ApiService.getSortOrder(sortBy, sortOrder)}`;
    const response = await fetch(url + queries);
    const items = await response.json();
    const header = response.headers.get('X-Total-Count');
    const winnersCount = header ? parseInt(header) : 0;

    return {
      winners: await Promise.all(
        items
          .map(async (winner: Winner) => ({ ...winner, car: await ApiService.getCar(winner.id) })),
      ),
      winnersCount,
    };
  };

  public static getWinner = async (id: number): Promise<{ id: number, name: string, color: string, wins: number, time: number }> => {
    const response = await fetch(`${BASE}/${WINNERS}/${id}`);
    return response.json();
  };

  public static createWinner = async (body: Winner): Promise<Winner> => {
    const response = await fetch(`${BASE}/${WINNERS}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  public static deleteWinner = async (id: number): Promise<Winner> => {
    const response = await fetch(`${BASE}/${WINNERS}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  };

  public static updateWinner = async (id: number, body: Winner): Promise<Winner> => {
    const response = await fetch(`${BASE}/${WINNERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

  public static getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${BASE}/${WINNERS}/${id}`)).status;

  public static saveWinner = async (winner: Winner): Promise<void> => {
    const { id, time } = winner;
    const winnerStatus = await ApiService.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await ApiService.createWinner({
        ...winner,
        wins: 1,
      } as Winner);
    } else {
      const winner = await ApiService.getWinner(id);

      await ApiService.updateWinner(id, {
        id,
        car: {
          id,
          color: winner.color,
          name: winner.name,
        },
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      } as Winner);
    }
  };
}
