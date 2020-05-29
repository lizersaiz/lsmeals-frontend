import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoBarService {

  _success = new Subject<string>();
  _visible = new Subject<boolean>();

  constructor() { }

  giveSuccessMessage(message: String){

    if (message === "createCustomer"){
      this._success.next("Customer Created Successfully")
    }
    if (message === "updateCustomer"){
      this._success.next("Customer Updated Successfully")
    }
    else if (message === "deleteCustomer"){
      this._success.next("Customer Deleted Successfully")
    }
    this._visible.next(true);
  }
}
