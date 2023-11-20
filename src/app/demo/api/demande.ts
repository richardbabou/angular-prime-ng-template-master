import { Agent } from "./agent";

export class Demande{
    public id: number=0;
    public etatDossier?:String ;
    public motif?:String;
    // certificateTypes?:String;
    public nom_agent_creer?:String;
    public nom_agent_mise_jour?:String;
    public reference?: string;
    public date?: Date;
    public matriculeAgent?:Agent;
}