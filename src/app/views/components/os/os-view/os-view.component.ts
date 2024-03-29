import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from '../../../../models/os';
import { OsService } from '../../../../services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrl: './os-view.component.css'
})
export class OsViewComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    prioridade: '',
    status: ''
  }

  constructor(private route: ActivatedRoute,
    private service: OsService,
    private router: Router) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");   
    this.findById();
  }

  findById():void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os.dataAbertura = resposta.dataAbertura,
      this.os.dataFechamento = resposta.dataFechamento,
      this.os.id = resposta.id,
      this.os.observacoes = resposta.observacoes,
      this.os.prioridade = resposta.prioridade,
      this.os.status = resposta.status,
      this.os.cliente = resposta.cliente.nome,
      this.os.tecnico = resposta.tecnico.nome
    })
  }

  return(): void {
    this.router.navigate(['os'])
  }

}
