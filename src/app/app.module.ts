import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { IndexComponent } from './common/index/index.component';
import { RegisterComponent } from './common/register/register.component';
import { CommunicationComponent } from './common/communication/communication.component';
import { MessageComponent } from './common/communication/message/message.component';
import { FriendsComponent } from './common/communication/friends/friends.component';
import { NewsComponent } from './common/communication/news/news.component';
import { UserInfoService } from './common/service/user-info.service';
import { WebSocketService } from './common/service/websocket.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    CommunicationComponent,
    MessageComponent,
    FriendsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
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
    ToastModule
  ],
  providers: [UserInfoService, HttpClient, WebSocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
