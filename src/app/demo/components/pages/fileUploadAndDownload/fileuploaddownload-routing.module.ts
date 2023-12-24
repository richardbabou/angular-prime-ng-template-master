import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fileuploaddownloadComponent } from './fileuploaddownload.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: fileuploaddownloadComponent }
	])],
	exports: [RouterModule]
})
export class fileuploaddownloadRoutingModule { }