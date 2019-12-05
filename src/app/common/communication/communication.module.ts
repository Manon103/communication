import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@NgModule({
  declarations: [

  ],
  imports: [

    ModalModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalRef],
})
export class AppModule { }
