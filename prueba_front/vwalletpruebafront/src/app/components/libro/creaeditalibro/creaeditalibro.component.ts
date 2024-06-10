import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';



import { Libro } from '../../../models/Libro';
import { LibroService } from '../../../services/libro.service';
import { BibliotecaService } from '../../../services/biblioteca.service';
import { Biblioteca } from '../../../models/Biblioteca';
@Component({
  selector: 'app-creaeditalibro',
  standalone: true,
  imports: [   MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditalibro.component.html',
  styleUrl: './creaeditalibro.component.css'
})
export class CreaeditalibroComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  libro: Libro = new Libro();
  id: number = 0;
  edicion: boolean = false;
  listaSedes: Biblioteca[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private lS: LibroService,
    private router: Router,
    private route: ActivatedRoute,
    private bS: BibliotecaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.bS.list().subscribe((data) => {
      this.listaSedes = data;
    });

    this.form = this.formBuilder.group({
      codigo_lib: [''],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anioPublicacion: ['', Validators.required],
      genero: ['', Validators.required],
      biblioteca: ['', Validators.required],
    });
 
  }

  aceptar(): void {
    if (this.form.valid) {
      this.libro.idLibro = this.form.value.codigo_lib;
      this.libro.titulo = this.form.value.titulo;
      this.libro.autor = this.form.value.autor;
      this.libro.anioPublicacion = this.form.value.anioPublicacion;
      this.libro.genero = this.form.value.genero;
      this.libro.biblioteca.idBiblioteca = this.form.value.biblioteca;
  
      if (this.edicion) {
        this.lS.update(this.libro).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.libro).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
        this.router.navigate(['libro']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idLibro: new FormControl(data.idLibro),
          titulo: new FormControl(data.titulo),
          autor: new FormControl(data.autor),
          anioPublicacion: new FormControl(data.anioPublicacion),
          genero: new FormControl(data.genero),
          biblioteca: new FormControl(data.biblioteca),
        });
      });
    }
  }

}
