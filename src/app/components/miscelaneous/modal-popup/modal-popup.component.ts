import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Customer } from 'src/app/common/customer';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-popup-content.component.html',
  styleUrls: ['./modal-popup-content.component.css']
})
export class ModalPopupContent {
  @Input() title: string;
  @Input() body: any;
  @Input() cancelButton: boolean;

  constructor(public activeModal: NgbActiveModal,
              private commonModule: CommonModule) { }
}

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html'
})
export class ModalPopupComponent {

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(customer: Customer): Promise<string> {

    const modalRef = this.modalService.open(ModalPopupContent, { centered: true, size: "lg" });
    modalRef.componentInstance.title = 'Are you sure you want to delete this customer?';
    modalRef.componentInstance.body = customer;
    modalRef.componentInstance.cancelButton = true;

    return modalRef.result;
  }
}
