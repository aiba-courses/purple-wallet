import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { LeftMenu } from '../../shared/components/left-menu/left-menu';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NavButton } from '../../shared/components/nav-button/nav-button';
import { INavConst, NAV_CONST } from '../../shared/const/menu-items.const';
import { FontWeightDirective } from '../../shared/directives/font-weight.directive';
import { Header } from './components/header/header';
import { AuthService } from '../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    Header,
  ],
})
export class PrivateLayoutComponent implements OnInit {
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  navLinks: INavConst[] = NAV_CONST;

  onLogoutClick() {
    this._authService.logout$().subscribe();
  }

  ngOnInit(): void {
    this._authService.isAuthenticated$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(isAuth => {
        if (!isAuth) {
          this._router.navigate(['/public']);
        }
      });
  }
}
