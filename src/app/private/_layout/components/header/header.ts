import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { delay, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import {
  FAKE_PROFILE,
  IUserModel,
} from '../../../../shared/const/fake-profile.const';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';

@Component({
  imports: [SearchInputComponent],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private _titleService = inject(Title);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  title = signal<string>('');

  profileData = toSignal<IUserModel>(of(FAKE_PROFILE).pipe(delay(100)));
  isShowSearch = toSignal<boolean>(
    this._router.events.pipe(
      startWith(null),
      filter(e => e === null || e instanceof NavigationEnd),
      map(() => {
        let r: ActivatedRoute | null = this._activatedRoute;
        while (r?.firstChild) {
          r = r.firstChild;
        }
        return r!;
      }),
      switchMap(r => r['data']),
      map(v => v['isShowSearch']) ?? false
    )
  );

  ngOnInit() {
    this._router.events
      .pipe(
        delay(100),
        tap(event => {
          if (event instanceof NavigationEnd) {
            this.title.set(this._titleService.getTitle());
          }
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  protected onInputChange(q: string) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { q },
      queryParamsHandling: 'merge',
    });
  }

  searchValue = toSignal(this._activatedRoute.queryParamMap.pipe(
    map(v => v.get('q') ?? '')
  ));
}
