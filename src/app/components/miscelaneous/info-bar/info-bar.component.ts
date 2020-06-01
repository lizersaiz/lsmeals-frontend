import { Component, OnInit, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { InfoBarService } from 'src/app/services/bootstrap/info-bar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1})),
      state('false', style({ opacity: 0})),/*
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),*/
      transition('1 => 0', animate('500ms')),
      transition('0 => 1', animate('500ms'))
    ])
  ]
})
export class InfoBarComponent implements OnInit {

  staticAlertClosed = false;
  successMessage = '';

  @Input() isVisible : boolean = false;

  constructor(private infoBarService: InfoBarService) { }

  ngOnInit(): void {

    this.giveAlertBehaviour();
  }

  giveAlertBehaviour(){

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this.infoBarService._success.subscribe(message => this.successMessage = message);
    this.infoBarService._success.pipe(
      debounceTime(5500)
    ).subscribe(() => this.successMessage = '');

    this.infoBarService._visible.subscribe(value => this.isVisible = value);
    this.infoBarService._visible.pipe(
      debounceTime(5000)
    ).subscribe(() => this.isVisible = false);
  }

}
