import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Car, Component } from '../../../shared/interfaces';
import { ApiService } from '../../../shared/services/api.service';
import { StoreService } from '../../../shared/services/store.service';
import './car-create.css';

export class CarCreate implements Component {
  protected storeService = new StoreService();

  protected element = document.createElement('div');

  protected field = document.createElement('input');

  protected colorInput: HTMLInputElement = document.createElement('input');

  protected btn = new Button({ content: ContentConstants.CREATE }).render();

  protected alert = document.createElement('div');

  constructor(protected redrawPage: () => void) {
    this.setAttributes();
  }

  private setAttributes = () => {
    const { createText, createColor } = this.storeService.getState();

    this.field.type = 'text';
    this.colorInput.type = 'color';
    this.field.required = true;
    this.field.pattern = '[^\\s]*';
    this.field.value = createText;
    this.colorInput.value = createColor;
    this.alert.textContent = 'field can not be empty';
  };

  private addClasses = (): void => {
    this.element.classList.add(ClassesConstants.CAR_CREATE);
    this.field.classList.add(ClassesConstants.FIELD);
    this.colorInput.classList.add(ClassesConstants.COLOR_INPUT);
    this.alert.classList.add(ClassesConstants.ALERT);
  };

  protected clearFields = (): void => {
    const { getState, setState } = this.storeService;
    const { children } = this.element;
    const cb = (field: HTMLInputElement) => {
      if (field.classList.contains(ClassesConstants.COLOR_INPUT)) {
        field.value = SettingsConstants.BASE_COLOR;
      } else {
        field.value = '';
      }
    };

    [].forEach.call(children, cb);
    setState({
      ...getState(),
      createText: '',
      createColor: SettingsConstants.BASE_COLOR,
      updateText: '',
      updateColor: SettingsConstants.BASE_COLOR,
    });
  };

  protected handleInput = ({ target }: Event): void => {
    const { setState, getState } = this.storeService;
    const elem = target as HTMLInputElement;

    if (elem.type === 'text') {
      setState({ ...getState(), createText: elem.value });
    }

    if (elem.type === 'color') {
      setState({ ...getState(), createColor: elem.value });
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

    const car = {
      name: this.field.value,
      color: this.colorInput.value,
    };

    this.clearFields();

    const response = await ApiService.createCar(car as Car);

    if (response && response.id) {
      this.redrawPage();
    }
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.btn.addEventListener('click', this.handleClick);
    this.element.addEventListener('input', this.handleInput);
    this.element.append(this.field, this.colorInput, this.btn);

    return this.element;
  };
}
