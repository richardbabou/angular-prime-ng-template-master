import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, dematerialize, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FileService{
    private basUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    uploadSingleFile(file: File): Observable<HttpResponse<object>> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(this.basUrl+ `upload-single-file`, formData,{observe:'response'});
    }


    // uploadSingleFile(file: File): Observable<any> {
    //   const formData: FormData = new FormData();
    //   formData.append('file', file, file.name);
  
    //   return this.http.post<any>(`${this.baseUrl}+ `upload-single-file`, formData);
    // }
    getfileById(id:number):Observable<Object>{
      return this.http.get<File>('${apiUrl}/${id}')
  }
  deleteFile(id:number):Observable<HttpResponse<{}>>{
    return this.http.delete(`${this.basUrl +'fileSupprimer'}/${id}`, { observe: 'response' });
}
    uploadMultipleFiles(files: File[]): Observable<any> {
      const formData: FormData = new FormData();
      files.forEach(file => {
        formData.append('files', file, file.name);
      });
      return this.http.post(this.basUrl+`upload-multiple-files`, formData);
    }

    // uploadMultipleFiles(files: File[]): Observable<any> {
    //   const formData: FormData = new FormData();
    //   files.forEach(file => {
    //     formData.append('files', file, file.name);
    //   });
  
    //   return this.http.post<any>(`${this.baseUrl}/upload-multiple-files`, formData);
    // }
  
    downloadFile(fileName: string): Observable<any> {
      return this.http.get(this.basUrl+`download-file/${fileName}`, { responseType: 'blob' });
    }

    // downloadFile(fileName: string): Observable<Blob> {
    //   return this.http.get(`${this.baseUrl}/download-file/${fileName}`, { responseType: 'blob' });
    // }
}