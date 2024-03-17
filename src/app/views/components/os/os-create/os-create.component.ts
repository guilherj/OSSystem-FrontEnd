import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';
import { Tecnico } from '../../../../models/Tecnico';
import { Cliente } from '../../../../models/Cliente';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrl: './os-create.component.css'
})
export class OsCreateComponent implements OnInit {

  selected = ''

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {  
    this.listarTecnicos();
    this.listarClientes();
  }

  listarTecnicos():void  {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes():void  {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }
 

}
