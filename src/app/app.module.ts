import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { PickerModule } from 'ngx-odinvt-emoji-mart';
import { FileUploadModule } from 'primeng/fileupload';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { IndexComponent } from './common/index/index.component';
import { RegisterComponent } from './common/register/register.component';
import { CommunicationComponent } from './common/communication/communication.component';
import { NewsComponent } from './common/communication/news/news.component';
import { FolderComponent } from './common/communication/folder/folder.component';
import { MessageComponent } from './common/communication/message/message.component';
import { UserInfoService } from './common/service/user-info.service';
import { WebSocketService } from './common/service/websocket.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CommunicationComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    NewsComponent,
    MessageComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextModule,
    ListboxModule,
    InputTextareaModule,
    ToastModule,
    PickerModule,
    FileUploadModule
  ],
  providers: [UserInfoService, HttpClient, WebSocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
