import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, dematerialize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FileService{
    private basUrl = environment.apiUrl

    constructor(private http: HttpClient) { }
  
    uploadSingleFile(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(`${this.basUrl}/upload-single-file`, formData);
    }
  
    uploadMultipleFiles(files: File[]): Observable<any> {
      const formData: FormData = new FormData();
      files.forEach(file => {
        formData.append('files', file, file.name);
      });
      return this.http.post(`${this.basUrl}/upload-multiple-files`, formData);
    }
  
    downloadFile(fileName: string): Observable<any> {
      return this.http.get(`${this.basUrl}/download-file/${fileName}`, { responseType: 'blob' });
    }
}