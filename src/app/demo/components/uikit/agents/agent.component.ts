import { HttpResponse } from "@angular/common/http";
import { OnInit, Component } from "@angular/core";
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Agent } from "src/app/demo/api/agent";
import { AgentService } from "src/app/demo/service/agent.service";

@Component({
    templateUrl: './agent.component.html',
    providers:[MessageService]
})


export class AgentComponent implements OnInit { 

    agentDialog: boolean = false;

    deleteAgentDialog: boolean = false;

    deleteAgentsDialog: boolean = false;

    agents: Agent[] = [];

    agent: Agent = new Agent();

    deleteProductsDialog : boolean = false;

    // selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private agentService: AgentService, 
        private messageService: MessageService
        ) { }

    ngOnInit() {
        // this.agentService.getAgent().subscribe(data => this.agent = data);
        // this.cols = [
        // ];
        this.getAgents();
        this.updatesAgents();
        this.saveAgent();
        

    }



    
    //     getAgents(){
    //     this.agentService.getAgent().subscribe(
    //       data=>{this.agents=data.body!}
    //     )
    //   }
    




      getAgents(){
        this.agentService.getAgent().subscribe((res: HttpResponse<Agent[]>) => {
          const data = res.body ?? [];
          this.agents = data;
          console.log(this.agents)
        });
      }






    openNew() {
        this.agent = new Agent();
        this.submitted = false;
        this.agentDialog = true;
    }




    // deleteSelectedProducts() {
    //     this.deleteProductsDialog = true;
    // }





    editAgent(agent: Agent) {
        this.agent = { ...agent };
        this.agentDialog  = true;
    }





    deleteAgent(agent: Agent) {
        this.deleteAgentDialog = true;
        this.agent = { ...agent };
    }




    // confirmDeleteSelected() {
    //     this.deleteAgentsDialog = false;
    //     this.agents = this.agents.filter(val => !this.deleteAgent.includes(val));
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     this.selectedAgents = [];
    // }

    // confirmDelete() {
    //     this.deleteAgentDialog = false;
    //     this.agentService.deleteAgent(this.agent.id)
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agent Spprimer', life: 3000 });
    //     this.agent = new Agent();
    // }





    confirmDelete(agent: Agent) {
        this.deleteAgentDialog = false;
      this.agentService.deleteAgent(agent.id).subscribe(
         () => {
             this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: ` ${this.agent.nom} a été supprimé avec succès`, life: 3000 });
             this.getAgents();  
             this.agent=new Agent();
            
         },
         (error) => {
             console.error("Erreur lors de la suppression :", error);
         }
     );
   }





    hideDialog() {
        this.agentDialog = false;
        this.submitted = false;
    }




    saveAgent() {
        this.submitted = true;
        if (this.agent.id === 0) {
            this.agentService.createAgent(this.agent).subscribe(
                (response) => {
                    console.log('Agent créé avec succès :', response);
                    this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Agent créé avec succès!', life: 3000 });
                    this.agentDialog = false;
                    this.agent=new Agent();
                    this.getAgents();
                });
        } else {
             this.updatesAgents();
        }
      }
      
      updatesAgents() {
        this.submitted = true;
            this.agentService.updateAgent(this.agent).subscribe(
                (response) => {
                  this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Opération Modification réussie!', life: 3000 });
                    this.agentDialog = false;
                    this.getAgents();
                },
            );
      }







    

    saveProduct() {
        this.submitted = true;

        console.log(this.agents);

        if (this.agent.nom?.trim()) {
            if (this.agent.matriculeAgent) {
                // @ts-ignore
                // this.agent.inventoryStatus = this.agent.inventoryStatus.value ? this.agent.inventoryStatus.value : this.agent.inventoryStatus;
                this.agents[this.findIndexById(this.agent.matriculeAgent)] = this.agent;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.agent.matriculeAgent = this.createId();
                this.agent.matriculeAgent = this.createId();
                // this.agent.image = 'product-placeholder.svg';
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                // this.products.push(this.product);
                // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.agents = [...this.agents];
            this.agentDialog = false;
            this.agent = new Agent();
        }
    }

    

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.agents.length; i++) {
            if (this.agents[i].matriculeAgent === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}



