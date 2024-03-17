import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OsService } from '../../../../services/os.service';
import { Router } from '@angular/router';
import { OS } from '../../../../models/os';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrl: './os-read.component.css'
})
export class OsReadComponent implements AfterViewInit {

  lista: OS[] = [];
  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) {}

  ngAfterViewInit() {    
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.lista = resposta;      
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['os/create'])

  }
  
  prioridade(x : any) {
    if(x == 'BAIXA') {
      return 'baixa'
    } else if (x == 'MEDIA') {
      return 'media'
    }else {
      return 'alta'
    }
  }

}