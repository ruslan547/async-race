import { Button } from '../../../shared/components/button/button';
import { ClassesConstants } from '../../../shared/constants/classes.constants';
import { ContentConstants } from '../../../shared/constants/content.constants';
import { SettingsConstants } from '../../../shared/constants/settings.constants';
import { Component } from '../../../shared/interfaces';
import './race-board.css';

export class RaceBoard implements Component {
  private raceBoard = document.createElement('div');

  private raceBtn = new Button({
    content: ContentConstants.RACE,
    type: SettingsConstants.MAIN,
  }).render();

  private resetBtn = new Button({
    content: ContentConstants.RESET,
    type: SettingsConstants.MAIN,
  }).render();

  private generateBtn = new Button({
    content: ContentConstants.GENERATE_CARDS,
  }).render();

  private addClasses = (): void => {
    this.raceBoard.classList.add(ClassesConstants.RACE_BOARD);
    this.generateBtn.classList.add(ClassesConstants.GENERATE_BTN);
  };

  public render = (): HTMLElement => {
    this.addClasses();
    this.raceBoard.append(this.raceBtn, this.resetBtn, this.generateBtn);

    return this.raceBoard;
  };
}
