import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, dematerialize } from 'rxjs';
import { Agent } from '../api/agent';
import { environment } from 'src/environments/environment';
export type EntityResponseType = HttpResponse<Agent>;
export type EntityArrayResponseType = HttpResponse<Agent[]>;
@Injectable()
export class AgentService{
    private basUrl = environment.apiUrl
    constructor(private http:HttpClient){}
    // getAgent():Observable<HttpResponse<Agent[]> >{
    //     return this.http.get<Agent[]>(this.basUrl+"agents",{ observe: 'response' })
    //     console.log("ffcvh")
    // }

    getAgent(): Observable<EntityArrayResponseType> {
        return this.http.get<Agent[]>(this.basUrl+ 'agents', {  observe: 'response' });
      }


    

    
    createAgent(agent : Agent ) : Observable<EntityResponseType> {
        return this.http.post<Agent>(this.basUrl+ 'agent', agent, {  observe: 'response' });
      }

    
    deleteAgent(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.basUrl +'agentSupprimer'}/${id}`, { observe: 'response' });
    }
    


    // createAgent(agent:Agent):Observable<Object>{
    //     return this.http.post('${apiUrl}',agent)
    // }



    // getAgentByMatricule(matriculeAgent:string):Observable<Object>{
    //     return this.http.get<Agent>('${apiUrl}/${id}')
    // }


    // updateAgent(agent:Agent):Observable<EntityResponseType>{
    //     return this.http.put<Agent>(${this.basUrl+"agentUpdate"}/${agent.id},agent,{observe:'response'})
    // }


    updateAgent(agent: Agent): Observable<EntityResponseType> {
        return this.http.put<Agent>(
            `${this.basUrl}agentUpdate/${agent.id}`,
            agent,
            { observe: 'response' }
        );
    }



}