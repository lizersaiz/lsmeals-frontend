import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  pageIndex: Subject<number> = new Subject<number>();
  pageSize: Subject<number> = new Subject<number>();

  pageEvent: Subject<any> = new Subject<any>();

  constructor() { }

  /**
   * Assigns new values to the paginator property observables
   * @param pageIndex The page index
   * @param pageSize The page size
   */
  configurePaginator(pageIndex: number, pageSize: number){

    this.pageIndex.next(pageIndex);
    this.pageSize.next(pageSize);
  }

  /**
   * Gives the services new values and emits an empty event
   * @param pageIndex The page index
   * @param pageSize The page size
   */
  emitEvent(pageIndex: number, pageSize: number){

    this.configurePaginator(pageIndex, pageSize);
    this.pageEvent.next();
  }
}
