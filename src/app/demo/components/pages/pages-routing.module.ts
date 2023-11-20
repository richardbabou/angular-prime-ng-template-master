import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        {path:'demande',loadChildren:()=>import('./demande/demande.module').then(m => m.DemandeModule)},
        {path:'fichier',loadChildren:()=>import('./fileUploadAndDownload/file-upload-download.module').then(m => m.FileuploaddownloadModule)},
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
