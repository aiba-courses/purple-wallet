import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFontWeight]',
})
export class FontWeightDirective implements OnChanges {
  @Input() fontWeight = 'bold';

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null && changes['fontWeight'] != null) {
      this._renderer.setStyle(
        this._el.nativeElement,
        'font-weight',
        changes['fontWeight'].currentValue
      );
    }
  }
}
