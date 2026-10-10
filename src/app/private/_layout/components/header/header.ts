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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../../shared/services/store.service';
import { ProfileService } from '../../../../shared/services/profile.service';
import { IAppProfieStore } from '../../../../shared/services/profile-store.service';
import { ErrorStoreService } from '../../../../shared/services/error-store.service';

@Component({
  imports: [SearchInputComponent, ReactiveFormsModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  providers: [ProfileService],
})
export class Header implements OnInit {
  private _titleService = inject(Title);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _store = inject(StoreService);
  private _profileService = inject(ProfileService);
  private _errorStore = inject(ErrorStoreService);

  title = signal<string>('');

  profileData = toSignal<IAppProfieStore>(this._profileService.profile$);
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
    this._errorStore.getValueAsync().subscribe(console.log);

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

    this._setFormValueToStore();
  }

  protected onInputChange(q: string) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { q },
      queryParamsHandling: 'merge',
    });
  }

  searchValue = toSignal(
    this._activatedRoute.queryParamMap.pipe(map(v => v.get('q') ?? ''))
  );

  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  private _setFormValueToStore() {
    this.form.valueChanges.subscribe();
    this.form.controls['search'].valueChanges
      .pipe(
        tap(value => this._store.setFormValue('search', value)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
