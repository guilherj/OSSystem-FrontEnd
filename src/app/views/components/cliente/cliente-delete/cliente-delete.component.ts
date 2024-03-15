import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/Cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent implements OnInit {

  idTec = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.idTec = this.route.snapshot.paramMap.get('id')!
      this.findById();
    }
   

    findById(): void {
      this.service.findById(this.idTec).subscribe(resposta => {
        this.cliente = resposta;
      })
    }

    delete(): void {
      this.service.delete(this.idTec).subscribe(resposta => {
        this.router.navigate(['clientes'])
        this.service.message('Cliente deletado com sucesso!')
      }, err => {
        if (err.error.error.match('não pode ser deletado.')) {
          this.service.message(err.error.error)
          
        } else {
          console.log(err)
        } 
      })  
    }

  cancel(): void {
    this.router.navigate(['clientes'])
  }
  

}
