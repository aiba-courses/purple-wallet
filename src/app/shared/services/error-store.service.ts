import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IErrorModel {
  code: number | null;
  message: string | null;
  url: string | null;
  time: string;
}

const STORE_INITIAL_STATE: IErrorModel[] = [];

@Injectable({ providedIn: 'root' })
export class ErrorStoreService {
  private readonly _dataSubject = new BehaviorSubject<IErrorModel[]>(
    STORE_INITIAL_STATE
  );

  public getValue(): IErrorModel[] {
    return this._dataSubject.getValue();
  }

  public reset(): void {
    return this._dataSubject.next(STORE_INITIAL_STATE);
  }

  public getValueAsync(): Observable<IErrorModel[]> {
    return this._dataSubject.asObservable();
  }

  public setValue(value: IErrorModel): void {
    this._dataSubject.next([...this._dataSubject.getValue(), value]);
  }
}
