import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { Car } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { CarCreate } from '../car-create/car-create';

export class CarUpdate extends CarCreate {
  private idField: HTMLInputElement = document.createElement('input');

  protected btn = new Button({ content: ContentConstants.UPDATE }).render();

  constructor() {
    super();
    this.element.classList.add(ClassesConstants.CAR_UPDATE);
    queueMicrotask(this.disableFields);
  }

  private disableFields = () => {
    const { children } = this.element;
    const cb = (field: HTMLInputElement | HTMLButtonElement) => {
      field.disabled = true;
    };

    [].forEach.call(children, cb);
  };

  protected handleClick = async (): Promise<void> => {
    const id = +this.idField.value;
    const car: Car = {
      id,
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();
    this.disableFields();
    await ApiService.updateCar(id, car);
  };
}
