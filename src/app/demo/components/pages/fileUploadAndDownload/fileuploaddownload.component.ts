import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { IconService } from 'src/app/demo/service/icon.service';
// Import the correct File type
import { File as AppFile } from "c:/Users/Africa/Desktop/DOSSIER STAGE/Partie Implementation/angular-prime-ng-template-master/src/app/demo/api/file";
import { MessageService } from 'primeng/api';
// import { MyFile } from 'src/app/demo/api/file';
import { FileService } from 'src/app/demo/service/file.service';
import { DemandeService } from 'src/app/demo/service/demande.service';
@Component({
    templateUrl: './fileuploaddownload.component.html',
    providers: [MessageService]
})
export class fileuploaddownloadComponent implements OnInit{
    ngOnInit(): void {
    this.onFileChanged;
    this.onFileSelected;
      this.onFileSelected;
      this.onMultipleFilesSelected;
      // this.uploadSingleFile;
      // this.uploadMultipleFiles;
      // this.downloadFile;
      this.demande = {}; // Initialize your demande object as needed
    }
    // selectedFile: File=null!;
    // selectedFiles: File[]=[];
     private selectedFile: File | null = null;
    private selectedMultipleFiles: File[] = [];
    file!: File;
    demande: any;
  
    constructor(private demandeService: DemandeService) { }
    onFileChange(event: any): void {
      this.file = event.target.files[0];
    }
  
    uploadFile(): void {
      this.demandeService.uploadFile(this.file, this.demande)
        .subscribe(response => {
          console.log('File uploaded successfully:', response);
          // Handle success, e.g., show a success message
        }, error => {
          console.error('Error uploading file:', error);
          // Handle error, e.g., show an error message
        });
    }


  
    // constructor(private fileService: FileService) { }
  
    onFileChanged(event: any): void {
      this.selectedFile = event.target.files[0];
    }


    // constructor(private fileService: FileService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

  onMultipleFilesSelected(event: any): void {
    this.selectedMultipleFiles = Array.from(event.target.files);
  }



    onFilesChanged(event: any): void {
      this.selectedMultipleFiles = event.target.files;
    }
  
//    // Use the imported type in your component
// uploadSingleFile(): void {
//   if (this.selectedFile) {
//     this.fileService.uploadSingleFile(this.selectedFile as AppFile).subscribe(response => {
//       console.log(response);
//     });
//   }
// }


// uploadSingleFile(): void {
//   if (this.selectedFile) {
//     this.fileService.uploadSingleFile(this.selectedFile as File).subscribe(response => {
//       console.log(this.uploadSingleFile, 'File uploaded successfully:', response);
//     }, error => {
//       console.error('Erreur de téléc:', error)
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
  
    // uploadMultipleFiles(): void {
    //   if (this.selectedMultipleFiles.length > 0) {
    //     this.fileService.uploadMultipleFiles(this.selectedMultipleFiles).subscribe(response => {
    //       console.log('Files uploaded successfully:', response);
    //     }, error => {
    //       console.error('Error uploading files:', error);
    //     });
    //   }
    // }


    // downloadFile(fileName: string): void {
    //   this.fileService.downloadFile(fileName).subscribe(response => {
    //     const blob = new Blob([response], { type: 'application/octet-stream' });
    //     const url = window.URL.createObjectURL(blob);
    //     window.open(url);
    //   });
    // }

    // downloadFile(fileName: string): void {
    //   this.fileService.downloadFile(fileName).subscribe(blob => {
    //     const downloadLink = document.createElement('a');
    //     const url = window.URL.createObjectURL(blob);
    //     downloadLink.href = url;
    //     downloadLink.download = fileName;
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    //     window.URL.revokeObjectURL(url);
    //   }, error => {
    //     console.error('Error downloading file:', error);
    //   });
    // }

}
