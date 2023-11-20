import { HttpClient, HttpResponse } from '@angular/common/http';
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
        return this.http.get<Demande[]>(this.basUrl+"demandes",{ observe: 'response' })
    }

    

    createDemande(demande:Demande):Observable<EntityResponseType>{
        return this.http.post<Demande>(this.basUrl+ 'agent', demande, {  observe: 'response' });
      
    }



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

    

    deleteDemande(idDemande:number):Observable<HttpResponse<{}>>{
        return this.http.delete(`${this.basUrl +'demandeSupprimer'}/${idDemande}`, { observe: 'response' });
    }



    // deleteAgent(idAgent: number): Observable<HttpResponse<{}>> {
    //     return this.http.delete(`${this.basUrl +'agentSupprimer'}/${idAgent}`, { observe: 'response' });
    // }
   
}