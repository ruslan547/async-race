import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { Car } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { UtilService } from '../../../shared/services/util.service';
import { CarCreate } from '../car-create/car-create';

export class CarUpdate extends CarCreate {
  protected btn = new Button({ content: ContentConstants.UPDATE }).render();

  constructor(redrawPage: () => void) {
    super(redrawPage);
    const { updateText, updateColor } = this.storeService.getState();

    this.element.classList.add(ClassesConstants.CAR_UPDATE);
    this.field.value = updateText;
    this.colorInput.value = updateColor;

    if (!updateText) {
      queueMicrotask(() => UtilService.addDisabledToFields(this.element));
    }
  }

  protected handleInput = ({ target }: Event): void => {
    const { setState, getState } = this.storeService;
    const elem = target as HTMLInputElement;

    if (elem.type === 'text') {
      setState({ ...getState(), updateText: elem.value });
    }

    if (elem.type === 'color') {
      setState({ ...getState(), updateColor: elem.value });
    }
  };

  protected handleClick = async (): Promise<void> => {
    if (!this.field.validity.valid) {
      this.field.placeholder = 'field can not be empty';
      return;
    }

    const id = this.storeService.getState().updateId;

    if (id === null) {
      this.clearFields();
      UtilService.addDisabledToFields(this.element);
      return;
    }

    const car: Car = {
      id,
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();
    UtilService.addDisabledToFields(this.element);
    await ApiService.updateCar(id, car);
    this.redrawPage();
  };
}
