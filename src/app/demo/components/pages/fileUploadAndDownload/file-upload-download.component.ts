import { Component, OnInit } from '@angular/core';
// Import the correct File type
import { File as AppFile } from "c:/Users/Africa/Desktop/DOSSIER STAGE/Partie Implementation/angular-prime-ng-template-master/src/app/demo/api/file";
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { File } from 'src/app/demo/api/file';
import { FileService } from 'src/app/demo/service/file.service';
@Component({
    templateUrl: './file-upload-download.component.html',
    providers: [MessageService]
})
export class fileuploaddownloadComponent implements OnInit{
    ngOnInit(): void {
    this.onFileChanged;
    }
    selectedFile: File=null!;
    selectedFiles: File[]=[];
  
    constructor(private fileService: FileService) { }
  
    onFileChanged(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    onFilesChanged(event: any): void {
      this.selectedFiles = event.target.files;
    }
  
//    // Use the imported type in your component
// uploadSingleFile(): void {
//   if (this.selectedFile) {
//     this.fileService.uploadSingleFile(this.selectedFile as AppFile).subscribe(response => {
//       console.log(response);
//     });
//   }
// }
  
    // uploadMultipleFiles(): void {
    //   if (this.selectedFiles && this.selectedFiles.length > 0) {
    //     this.fileService.uploadMultipleFiles(this.selectedFiles).subscribe(response => {
    //       console.log(response); // Handle the response as needed
    //     });
    //   }
    // }
  
    downloadFile(fileName: string): void {
      this.fileService.downloadFile(fileName).subscribe(response => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    }
}
