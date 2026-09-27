import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements AfterViewInit {
  @Input()
  title = '';

  @Input()
  disabled = false;

  @Output()
  btnClick: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('buttonContent')
  btnRef: ElementRef | undefined;

  value = '';

  ngAfterViewInit(): void {
    console.log(this.btnRef);
  }

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
