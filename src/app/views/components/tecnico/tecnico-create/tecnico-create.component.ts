import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/Tecnico';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: 'Guilherme Silva',
    cpf: '483.688.230-30',
    telefone: '(21) 99999-9999'
  }

  constructor(private router: Router,
    private service: TecnicoService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Tecnico criado com sucesso!')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      }

    })

  }

}
