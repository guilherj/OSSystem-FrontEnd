import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from '../../../../models/Tecnico';
import { TecnicoService } from '../../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrl: './tecnico-read.component.css'
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service : TecnicoService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();

  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      console.log(this.tecnicos)
    })
  }
}
