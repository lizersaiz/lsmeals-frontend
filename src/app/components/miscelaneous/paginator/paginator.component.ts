import { Component, OnInit, Input } from '@angular/core';
import { PaginatorService } from 'src/app/services/paginator.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  //pageEvent: PageEvent;

  pageIndex: number;
  length: number;
  pageSize: number;
  pageSizeOptions: number[];


  constructor(private paginatorService: PaginatorService) { }

  ngOnInit(): void {

    // paginator default options
    this.pageIndex = 0;
    this.length = 100;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 50, 100];

    this.paginatorService.configurePaginator(this.pageIndex, this.pageSize);
  }

  /**
   * Method triggered by the event that will refresh the current paginator properties,
   * both in the component and in the services for external comunication
   * @param event
   */
  pageChanged(event: PageEvent){

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.paginatorService.emitEvent(this.pageIndex, this.pageSize);
  }
}
