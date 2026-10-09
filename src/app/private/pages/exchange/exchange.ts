import { Component, computed, OnInit, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  imports: [AsyncPipe, ButtonComponent],
  selector: 'app-exchange',
  styleUrl: './exchange.scss',
  templateUrl: './exchange.html',
})
export class Exchange implements OnInit {
  value = signal(0);
  valueIn2 = computed(() => this.value() * 2);
  valueIn2$ = toObservable(this.valueIn2);

  protected onUpdateClick() {
    this.value.update(v => v + 1);
  }

  ngOnInit() {
    this.valueIn2$.subscribe(console.log);
  }
}
