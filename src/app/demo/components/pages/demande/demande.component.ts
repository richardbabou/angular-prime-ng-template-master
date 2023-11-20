import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Table } from 'primeng/table';
import { Demande } from 'src/app/demo/api/demande';
import { DemandeService } from 'src/app/demo/service/demande.service';
import { Agent } from 'src/app/demo/api/agent';
import { FileService } from 'src/app/demo/service/file.service';

@Component(
    {
        templateUrl:'./demande.component.html',
        providers:[MessageService]
    }
)
export class DemandeComponent implements OnInit{


    selectedCertificateType: string = '';
    uploadedFiles: any[] = [];
    requiredFiles: any[] = [];
    submitted: boolean = false;
    demandeDialog: boolean = false;
    demandes: Demande[] = [];
    demande: Demande = new Demande();
    selectedDemandes: Demande[] = [];
    deleteDemandeDialog: boolean = false;
    deleteDemandesDialog: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];




    constructor(private demandeService:DemandeService,private messageService:MessageService){}
    



    ngOnInit(): void {
        this.getDemandes();
        this.updateRequiredFiles();
        
        
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





    deletedDemande(id:number){
      this.demandeService.deleteDemande(id).subscribe(data=>{
        console.log(data);
        this.getDemandes;
      })
    }

  //  



    openNew() {
        this.demande = new Demande();
        this.submitted = false;
        this.demandeDialog = true;
    }




    deleteSelectedDemandes() {
        this.deleteDemandesDialog = true;
    }






    editDemande(demande: Demande) {
      this.demande = { ...demande };
      this.demandeDialog = true;
  }






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
    //     this.demande = {};
    // }


    confirmDelete(demande: Demande) {
      this.deleteDemandeDialog = false;
    this.demandeService.deleteDemande(demande.id).subscribe(
       () => {
           this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: ` ${this.demande.reference} a été supprimé avec succès`, life: 3000 });
           this.getDemandes();  
           this.demande=new Demande();
          
       },
       (error) => {
           console.error("Erreur lors de la suppression :", error);
       }
    );
  }




    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }







    saveDemande() {
      this.submitted = true;

      if (this.demande.motif?.trim()) {
          if (this.demande.id) {
              // @ts-ignore
              this.demandes[this.findIndexById(this.demande.id)] = this.demande;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Updated', life: 3000 });
          } else {
              // @ts-ignore
              this.demandes.push(this.demande);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Demande Created', life: 3000 });
          }

          this.demandes = [...this.demandes];
          this.demandeDialog = false;
          this.demande = new Demande();
      }
  }











    updateRequiredFiles() {
        // console.log('Selected Certificate Type:', this.selectedCertificateType);
        // Mettez à jour les fichiers requis en fonction du type de certificat sélectionné
        switch (this.selectedCertificateType) {
          case 'certificat1':
            this.requiredFiles = [
              { fieldName: 'file1', label: 'certficat de nationalité' },
              { fieldName: 'file2', label: 'fichier' },
              {fieldName:'file',label:'fichier'}
            ];
            break;
          case 'certificat2':
            this.requiredFiles = [
              { fieldName: 'file3', label: 'Fichier 3' },
              { fieldName: 'file4', label: 'Fichier 4' },
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