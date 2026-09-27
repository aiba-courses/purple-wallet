import {
  Component,
} from '@angular/core';
import { PublicLayoutComponent } from './public/_layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [PublicLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'purple-wallet';

  isButtonClicked = false;

  protected onButtonClick() {
    this.isButtonClicked = !this.isButtonClicked;
  }
}
