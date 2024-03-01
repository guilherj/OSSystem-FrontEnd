import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/Tecnico';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent implements OnInit {

  idTec = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.idTec = this.route.snapshot.paramMap.get('id')!
      this.findById();
    }
   

    findById(): void {
      this.service.findById(this.idTec).subscribe(resposta => {
        this.tecnico = resposta;
      })
    }

    delete(): void {
      this.service.delete(this.idTec).subscribe(resposta => {
        this.router.navigate(['tecnicos'])
        this.service.message('Técnico deletado com sucesso!')
      }, err => {
        if (err.error.error.match('não pode ser deletado.')) {
          this.service.message(err.error.error)
          
        } else {
          console.log(err)
        } 
      })  
    }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }
  

}
