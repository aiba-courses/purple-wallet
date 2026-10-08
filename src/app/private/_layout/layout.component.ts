import {
  Component,
} from '@angular/core';
import { LeftMenu } from '../../shared/components/left-menu/left-menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NavButton } from '../../shared/components/nav-button/nav-button';
import { INavConst, NAV_CONST } from '../../shared/const/menu-items.const';
import { FontWeightDirective } from '../../shared/directives/font-weight.directive';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    LeftMenu,
    RouterOutlet,
    NgOptimizedImage,
    NavButton,
    RouterLink,
    RouterLinkActive,
    FontWeightDirective,
  ],
})
export class PrivateLayoutComponent {
  navLinks: INavConst[] = NAV_CONST;

  onLogoutClick() {
    console.log('logout');
  }
}
