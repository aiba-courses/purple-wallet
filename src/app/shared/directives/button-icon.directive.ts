import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface AppButtonIconContext {
  $implicit: string
  active: boolean
}

@Directive({
  selector: '[appButtonIcon]',
})
export class ButtonIconDirective implements OnChanges {
  @Input('appButtonIcon')
  isActive = false;

  @Input('appButtonIconUrl')
  url: string | null = null;

  @Input('appButtonIconActiveUrl')
  activeUrl: string | null = null;

  private _viewRef?: EmbeddedViewRef<AppButtonIconContext>;

  constructor(
    private _tpl: TemplateRef<AppButtonIconContext>,
    private _vcr: ViewContainerRef
  ) {
    this._createOrUpdateView();
  }

  ngOnChanges(): void {
    this._createOrUpdateView();
  }

  private _createOrUpdateView(): void {
    const current = this.activeUrl ?? this.url ?? '';
    const ctx = {
      $implicit: current,
      active: this.isActive
    };

    if (!this._viewRef) {
      this._vcr.clear();
      this._viewRef = this._vcr.createEmbeddedView(this._tpl, ctx);
    } else {
      this._viewRef.context.$implicit = current;
      this._viewRef.context.active = this.isActive;
      this._viewRef.markForCheck();
    }
  }
}
