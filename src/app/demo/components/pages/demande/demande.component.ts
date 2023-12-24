import { HttpResponse } from '@angular/common/http';
import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Table } from 'primeng/table';
import { Demande } from 'src/app/demo/api/demande';
import { DemandeService } from 'src/app/demo/service/demande.service';
import { Agent } from 'src/app/demo/api/agent';
import { FileService } from 'src/app/demo/service/file.service';
import { FormsModule } from '@angular/forms';

@Component(
    {
        templateUrl:'./demande.component.html',
        providers:[MessageService]
    }
)
export class DemandeComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
     file!: File ;
     demande: any;
    selectedCertificateType: string = '';
    uploadedFiles: any[] = [];
    requiredFiles: any[] = [];
    // selectedFile: File=null!;
    selectedFiles: File[]=[];
    submitted: boolean = false;
    demandeDialog: boolean = false;
    demandes: Demande[] = [];
    // demande: Demande = new Demande();
    selectedDemandes: Demande[] = [];
    deleteDemandeDialog: boolean = false;
    deleteDemandesDialog: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    private selectedFile: File | null = null;
    private selectedMultipleFiles: File[] = [];



    constructor(private demandeService:DemandeService,private messageService:MessageService,private fileService:FileService,private renderer: Renderer2){}
    



    ngOnInit(): void {
        this.getDemandes();
        this.updateRequiredFiles();
        this.updatesDemandes();
        this.demande = {}; // Initialize your demande object as needed
       
    }

    // createDemande(){
    //   this.demandeService.createDemande(this.demande)
    //     .subscribe(response => {
    //       console.log('Demande created successfully:', response);
    //     }, error => {
    //       console.error('Error creating demande:', error);
    //     });
    // }


    onFileChange(event: any): void {
      this.file = event.target.files[0];
    }



    // onFileUploadDocumentSimple(event: any) {
    //   const fileInput = event.target;
      
    //   if (fileInput.files && fileInput.files[0]) {
    //     const reader = new FileReader();
    //     const fileType = fileInput.files[0].type;
    //     const fileName = fileInput.files[0].name;
    
    //     reader.readAsDataURL(fileInput.files[0]);
    //     reader.onload = () => {
    //       const file: any = reader.result;
    //       const fileBase64: string[] = file.split('base64,');
    //       const fileContent: string = fileBase64[1];
    //     };
    //   }
    // }


    onFileUploadDocumentSimple(event: any, fieldName: string) {
      const fileInput = event.files[0];
    
      if (fileInput) {
        const reader = new FileReader();
    
        reader.onload = () => {
          const fileContent: string = reader.result as string;
          // Vous pouvez maintenant utiliser le contenu du fichier selon vos besoins (par exemple, le télécharger sur le serveur)
    
          // Vous voudrez peut-être stocker le contenu du fichier dans une propriété pour chaque fichier
          // Par exemple, si fieldName est 'file1', vous pouvez avoir une propriété comme ceci :
          // this.file1Content = fileContent;
    
          // Vous pouvez également envoyer le contenu du fichier au serveur en utilisant une méthode de service
          // this.uploadFile(fieldName, fileContent);
        };
    
        reader.readAsDataURL(fileInput);
      }
    }






    // onFileUploadDocumentSimple(event: any) {
    //   const fileInput = event.files[0];
    //   //const fileInput = event.target;
      
    //   if (fileInput.files && fileInput.files[0]) {
    //     const reader = new FileReader();
    //     const fileType = fileInput.files[0].type;
    //     const fileName = fileInput.files[0].name;
    
    //     reader.readAsDataURL(fileInput.files[0]);
    //     reader.onload = () => {
    //       const file: any = reader.result;
    //       const fileBase64: string[] = file.split('base64,');
    //       const fileContent: string = fileBase64[1];
    //     };
    //   }
    // }




  //  getDemandes(){
  //     this.demandeService.getDemande().subscribe(
  //       data=>{this.demandes=data.body!}
  //     )

  //   }





  getDemandes(){
    this.demandeService.getDemande().subscribe((res: HttpResponse<Demande[]>) => {
      const data = res.body ?? [];
      this.demandes = data;
      console.log(this.demandes)
    });
  }





    // deletedDemande(id:number){
    //   this.demandeService.deleteDemande(id).subscribe(data=>{
    //     console.log(data);
    //     this.getDemandes;
    //   })
    // }





    openNew() {
        this.demande = new Demande();
        this.submitted = false;
        this.demandeDialog = true;
    }




    deleteSelectedDemandes() {
        this.deleteDemandesDialog = true;
    }






  //   editDemande(demande: Demande) {
  //     this.demande = { ...demande };
  //     this.demandeDialog = true;
  // }



  editDemande(demande: Demande) {
    this.demande = { ...demande };
    this.demandeDialog  = true;
}




  // deleteDemande(demande: Demande) {
  //     this.deleteDemandeDialog = true;
  //     this.demande = { ...demande };
  // }

  deleteDemande(demande: Demande) {
    this.deleteDemandeDialog = true;
    this.demande = { ...demande };
}







    hideDialog() {
        this.demandeDialog = false;
        this.submitted = false;
    }








    confirmDeleteSelected() {
        this.deleteDemandesDialog = false;
        this.demandes = this.demandes.filter(val => !this.selectedDemandes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Deleted', life: 3000 });
        this.selectedDemandes = [];
    }






    
    // confirmDelete() {
    //     this.deleteDemandeDialog = false;
    //     this.demandes = this.demandes.filter(val => val.id !== this.demande.id);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Deleted', life: 3000 });
    //     this.demande =new Demande();
    // }



//     confirmDelete(demande: Demande) {
//       this.deleteDemandeDialog = false;
//     this.demandeService.deleteDemande(demande.id).subscribe(
//        () => {
//            this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: ` ${this.demande.etatDossier} a été supprimé avec succès`, life: 3000 });
//            this.getDemandes();  
//            this.demande=new Demande();
          
//        },
//        (error) => {
//            console.error("Erreur lors de la suppression :", error);
//        }
//     );
//   }




    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }



    saveDemande() {

      this.submitted = true;
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk")
      // Vérification si l'ID du Agent est nul
      if (this.demande.id === null || this.demande.id === undefined) {
          // On va créer un nouveau Agent
          this.demandeService.createDemande(this.demande).subscribe(
              (response) => {
                  console.log('agent créé avec succès :', response);
                  this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Chantier créé avec succès!', life: 3000 });
                  this.demandeDialog = false;
                  this.getDemandes();
                  this.demande=new Demande();

              });
      } else {

        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          // Si Id existe on met à jour le agent existant
          // this.updatesAgent();
      }
    }





  //   saveDemande() {
  //     this.submitted = true;

  //     if (this.demande.id) {
  //         if (this.demande.id) {
  //             this.demandes[this.findIndexById(this.demande.id)] = this.demande;
  //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Updated', life: 3000 });
  //         } else {
  //             this.demandes.push(this.demande);
  //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Created', life: 3000 });
  //         }

  //         this.demandes = [...this.demandes];
  //         this.demandeDialog = false;
  //         this.demande = new Demande();
  //     }
  // }




//   saveDemande() {
//     this.submitted = true;
//     const fileInput = this.fileInput.nativeElement;
//     const file = fileInput.files?.[0];


//     if (this.demande.id === 0 && file) {
//         this.demandeService.uploadFile(this.demande, this.file).subscribe(
//             (response) => {
//                 console.log('Demande créé avec succès :', response);
//                 this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Demande créé avec succès!', life: 3000 });
//                 this.demandeDialog = false;
//                 this.demande = new Demande();
//                 this.getDemandes();
//             },
//             (error) => {
//                 console.error('Error creating demande:', error);
//             }
//         );
//     } else {
//         this.updatesDemandes();
//     }
// }





  updatesDemandes() {
    this.submitted = true;
        this.demandeService.updateDemande(this.demande).subscribe(
            (response) => {
              this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Opération Modification réussie!', life: 3000 });
                this.demandeDialog = false;
                this.getDemandes();
            },
        );
  }


  // uploadSingleFile(file:File){
  //   this.demandeDialog=false;
  //   this.fileService.uploadSingleFile(this.selectedFile).subscribe(
  //     (response)=>{
  //       this.messageService.add({severity:'success',summary:'chargement réussie',detail:'fichier chargé avec succès',life:3000})
  //     }
  //   )
  // }



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

  uploadSingleFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadSingleFile(this.selectedFile as File).subscribe(response => {
        console.log(this.uploadSingleFile, 'File uploaded successfully:', response);
      }, error => {
        console.error('Error uploading file:', error);
      });
    }
  }


  uploadMultipleFiles(): void {
    if (this.selectedMultipleFiles.length > 0) {
      this.fileService.uploadMultipleFiles(this.selectedMultipleFiles).subscribe(response => {
        console.log('Files uploaded successfully:', response);
      }, error => {
        console.error('Error uploading files:', error);
      });
    }
  }



  downloadFile(fileName: string): void {
    this.fileService.downloadFile(fileName).subscribe(blob => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading file:', error);
    });
  }




    updateRequiredFiles() {
        // console.log('Selected Certificate Type:', this.selectedCertificateType);
        // Mettez à jour les fichiers requis en fonction du type de certificat sélectionné
        console.log('Selected Certificate Type:', this.selectedCertificateType);
        switch (this.selectedCertificateType) {
          case 'certificat1':
            this.requiredFiles = [
              { fieldName: 'fichier', label: 'certficat de nationalité' },
              { fieldName: 'fichier', label: 'fichier' },
              {fieldName:'fichier',label:'fichier'}
            ];
            break;
          case 'certificat2':
            this.requiredFiles = [
              { fieldName: 'fichier', label: 'Fichier 3' },
              { fieldName: 'fichier', label: 'Fichier 4' },
            ];
            break;
            case 'certificat3':
            this.requiredFiles = [
              { fieldName: 'file5', label: 'Fichier 5' },
              { fieldName: 'file6', label: 'Fichier 6' },
            ];
            break;
            case 'certificat4':
            this.requiredFiles = [
              { fieldName: 'file7', label: 'Fichier 7' },
              { fieldName: 'file8', label: 'Fichier 8' },
            ];
            break;
            case 'certificat5':
            this.requiredFiles = [
              { fieldName: 'file9', label: 'Fichier 9' },
              { fieldName: 'file10', label: 'Fichier 10' },
            ];
            break;
            case 'certificat6':
            this.requiredFiles = [
              { fieldName: 'file11', label: 'Fichier 11' },
              { fieldName: 'file12', label: 'Fichier 12' },
            ];
            break;
            case 'certificat7':
            this.requiredFiles = [
              { fieldName: 'file13', label: 'Fichier 13' },
              { fieldName: 'file14', label: 'Fichier 14' },
            ];
            break;
            case 'certificat8':
            this.requiredFiles = [
              { fieldName: 'file15', label: 'Fichier 15' },
              { fieldName: 'file16', label: 'Fichier 16' },
            ];
            break;
            case 'certificat9':
            this.requiredFiles = [
              { fieldName: 'file17', label: 'Fichier 17' },
              { fieldName: 'file18', label: 'Fichier 18' },
            ];
            break;
            case 'certificat10':
            this.requiredFiles = [
              { fieldName: 'file19', label: 'Fichier 19' },
              { fieldName: 'file20', label: 'Fichier 20' },
            ];
            break;
            case 'certificat11':
            this.requiredFiles = [
              { fieldName: 'file21', label: 'Fichier 21' },
              { fieldName: 'file22', label: 'Fichier 22' },
            ];
            break;
          // Ajoutez des cas pour les types de certificat supplémentaires
          default:
            this.requiredFiles = [];
            break;
        }
        console.log('Updated required files:', this.requiredFiles);
      }








      certificateTypes: any[] = [
        { label: 'Certificat de retraite', value: 'certificat1' },
        { label: 'Certificat de disponibilité', value: 'certificat2' },
        { label: 'Certificat de detachement', value: 'certificat3' },
        { label: 'Certificat d\'affectation', value: 'certificat4' },
        { label: 'Certificat de demission', value: 'certificat5' },
        { label: 'Certificat retraite enticipé', value: 'certificat6' },
        { label: 'Certificat de deccès', value: 'certificat7' },
        { label: 'Certificat de révocation', value: 'certificat8' },
        { label: 'Certificat de licenciement', value: 'certificat9' },
        { label: 'Certificat de fin d\'engagement', value: 'certificat10' },
        { label: 'Certificat 11', value: 'certificat11' }, // Ajoutez cette option
        // ... Ajoutez d'autres options pour les types de certificat
      ];






      
     // Ass // requiredFiles: any[] = []; urez-vous que requiredFiles est initialisé correctement dans votre logique.
      createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }





  // onUpload(event: any) {
  //       for (const file of event.files) {
  //           this.uploadedFiles.push(file);
  //       }

  //       this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  //   }





    // onBasicUpload() {
    //     this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    // }
}