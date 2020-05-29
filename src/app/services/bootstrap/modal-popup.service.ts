import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPopupService {

  _title: Subject<string> = new Subject<string>();
  _body: Subject<any> = new Subject<any>();
  _cancelButton: Subject<boolean> = new Subject<boolean>();

  ok: boolean = false;
  cancel: boolean = false;

  constructor() { }

  call(title: string, body: any, cancelButton: boolean){

    this._title.next(title);
    this._body.next(body);
    this._cancelButton.next(cancelButton);
  }
}
