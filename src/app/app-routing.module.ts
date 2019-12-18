import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { IndexComponent } from './common/index/index.component';
import { RegisterComponent } from './common/register/register.component';
import { CommunicationComponent } from './common/communication/communication.component';
import { FolderComponent } from './common/communication/folder/folder.component';
import { MessageComponent } from './common/communication/message/message.component';
import { NewsComponent } from './common/communication/news/news.component';


const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'communication',
    component: CommunicationComponent,
    children: [
      { path: 'message', component: MessageComponent},
      { path: 'message/:selectedFriend', component: MessageComponent},
      { path: 'folder', component: FolderComponent },
      { path: 'news', component: NewsComponent },
      { path: '', redirectTo: '/communication/message', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
