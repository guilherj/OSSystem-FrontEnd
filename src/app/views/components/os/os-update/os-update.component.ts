import { Component, OnInit } from '@angular/core';
import { OS } from '../../../../models/os';
import { Tecnico } from '../../../../models/Tecnico';
import { Cliente } from '../../../../models/Cliente';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';
import { OsService } from '../../../../services/os.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css'] // Corrigido para 'styleUrls'
})
export class OsUpdateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {      
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById(this.os.id);
    this.listarTecnicos();
    this.listarClientes();
    console.log(this.os);
  }

  findById(id: string): void { // Adicionado id como parâmetro
    this.service.findById(id).subscribe(resposta => { // Passando id como argumento para findById
      this.os = resposta;
      this.os.tecnico = resposta.tecnico.id.toString();
      this.os.cliente = resposta.cliente.id.toString();
      this.converteDados();
    })
  }

  update(): void {
    console.log(this.os)
    this.service.update(this.os).subscribe(resposta => { // Substituído 'create' por 'update'
      this.service.message("OS atualizada com sucesso!");
      this.router.navigate(['os'])      
    }, err => {      
      this.service.message(err.error.errors[0].message)      
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos(): void  {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void  {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  converteDados(): void {
    if (this.os.status == 'ABERTO') {
      this.os.status = '0'; // Corrigido para string
    } else if (this.os.status == 'ANDAMENTO') {
      this.os.status = '1'; // Corrigido para string
    } else {
      this.os.status = '2'; // Corrigido para string
    }

    if (this.os.prioridade == 'BAIXA') {
      this.os.prioridade = '0'; // Corrigido para string
    } else if (this.os.prioridade == 'MEDIA') {
      this.os.prioridade = '1'; // Corrigido para string
    } else {
      this.os.prioridade = '2'; // Corrigido para string
    }
  }
}
