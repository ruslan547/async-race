import { CarsList } from "../../pages/garage/cars-list/cars-list";
import { ClassesConstants } from "../constants/classes.constants";

export class UtilService {
  public static redrawList = (): void => {
    const curList = document.querySelector(`.${ClassesConstants.CARS_LIST}`);
    curList?.replaceWith(new CarsList().render());
  };
}
