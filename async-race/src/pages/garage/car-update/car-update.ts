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
      queueMicrotask(() => UtilService.applyFunctionToFields(this.element, UtilService.addDisabled));
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

    if (document.querySelector(`.${ClassesConstants.ALERT}`)) {
      this.alert.remove();
    }
  };

  protected handleClick = async (): Promise<void> => {
    if (!this.field.validity.valid) {
      this.element.after(this.alert);
      return;
    }

    const id = this.storeService.getState().updateId;

    if (id === null) {
      this.clearFields();
      UtilService.applyFunctionToFields(this.element, UtilService.addDisabled);
      return;
    }

    const car: Car = {
      id,
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();
    UtilService.applyFunctionToFields(this.element, UtilService.addDisabled);
    await ApiService.updateCar(id, car);
    this.redrawPage();
  };
}
