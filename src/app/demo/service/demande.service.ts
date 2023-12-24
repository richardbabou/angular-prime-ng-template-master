import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, dematerialize } from 'rxjs';
import { Demande } from '../api/demande';
import { environment } from 'src/environments/environment';
export type EntityResponseType = HttpResponse<Demande>;
export type EntityArrayResponseType = HttpResponse<Demande[]>;
@Injectable()
export class DemandeService{
    private basUrl = environment.apiUrl

    constructor(private http:HttpClient){}


    getDemande():Observable<HttpResponse<Demande[]> >{
        return this.http.get<Demande[]>(this.basUrl+"/demande/all",{ observe: 'response' })
    }

    

    // createDemande(demande:Demande,file:File):Observable<EntityResponseType>{
    //     const formData=new FormData()
    //     formData.append('demande', JSON.stringify(demande));
    // formData.append('file', file, file.name);
    //      // Set content type explicitly
    // const headers = new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    // });
    //     return this.http.post<Demande>(this.basUrl+ 'demande', formData, { headers, observe: 'response' });
      
    // }
    // createDemande(demande: Demande, file: File): Observable<any> {
    //     const formData: FormData = new FormData();
    //     formData.append('file', file);
    //     formData.append('demande', JSON.stringify(demande));

    //    // Set the correct headers for multipart/form-data
    // const headers = new HttpHeaders({
    //     'Accept': 'application/json'
    //     // No need to set Content-Type manually, let HttpClient handle it for FormData
    // }); 

    //     return this.http.post(this.basUrl+ 'demande', formData,{ headers: headers });
    // }
    


    getDemandeById(id:number):Observable<Object>{
        return this.http.get<Demande>('${apiUrl}/${id}')
    }

    updateDemande(demande:Demande):Observable<EntityResponseType>{
        return this.http.put<Demande>(
                    `${this.basUrl}demandeUpdate/${demande.id}`,
                    demande,
                    { observe: 'response' }
                );
    }

    deleteDemande(id:number):Observable<HttpResponse<{}>>{
        return this.http.delete(`${this.basUrl +'demandeSupprimer'}/${id}`, { observe: 'response' });
    }
    uploadFile(file: File, demande: any): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('demande', JSON.stringify(demande));
        
        const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
        
        return this.http.post<any>(`${this.basUrl}upload-single-file`, formData, { headers: headers });
    }
    
    createDemande(demande : Demande ) : Observable<EntityResponseType> {
        return this.http.post<Demande>(this.basUrl+ '/demande/create', demande, {  observe: 'response' });
      }


    // deleteAgent(idAgent: number): Observable<HttpResponse<{}>> {
    //     return this.http.delete(`${this.basUrl +'agentSupprimer'}/${idAgent}`, { observe: 'response' });
    // }
   
}