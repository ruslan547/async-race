import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { Car } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { UtilService } from '../../../shared/services/util.service';
import { CarCreate } from '../car-create/car-create';

export class CarUpdate extends CarCreate {
  private idField: HTMLInputElement = document.createElement('input');

  protected btn = new Button({ content: ContentConstants.UPDATE }).render();

  constructor(redrawPage: () => void) {
    super(redrawPage);
    this.element.classList.add(ClassesConstants.CAR_UPDATE);
    this.idField.style.display = 'none';
    this.element.append(this.idField);
    queueMicrotask(() => UtilService.toggleDisabledFields(this.element));
  }

  protected handleClick = async (): Promise<void> => {
    const id = +this.idField.value;
    const car: Car = {
      id,
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();
    UtilService.toggleDisabledFields(this.element);
    await ApiService.updateCar(id, car);
    this.redrawPage();
  };
}
