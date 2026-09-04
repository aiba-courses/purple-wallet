import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  title = '';

  value = '';

  onClickEvent(event: Event) {
    console.log(event);
    this.value = 'Новое значение';
  }
}
