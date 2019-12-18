import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-folder-component',
  styleUrls: ['./folder.component.css'],
  templateUrl: './folder.component.html'
})

export class FolderComponent implements OnInit {
  uploadedFiles: any[] = [];
  imageUrl = '';

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    console.log(1);
  }

  onBeforeSend(event) {
    // 设置http请求的相关信息
    event.formData.append('userName', sessionStorage.getItem('userName'));
  }

  onUpload(event) {
    console.log(event);
    this.imageUrl = event.originalEvent.body;
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
