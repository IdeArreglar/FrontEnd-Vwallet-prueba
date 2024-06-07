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
import { Biblioteca } from '../../../models/Biblioteca';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-creaeditabiblioteca',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditabiblioteca.component.html',
  styleUrl: './creaeditabiblioteca.component.css'
})
export class CreaeditabibliotecaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  biblioteca: Biblioteca = new Biblioteca();
  id: number = 0;
  edicion: boolean = false;

  listaSedes: { value: string; viewValue: string }[] = [
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'Villa', viewValue: 'Villa' },
    { value: 'Monterrico', viewValue: 'Monterrico' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private bS: BibliotecaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo_bib: [''],
      sede_bib: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.biblioteca.idBiblioteca = this.form.value.codigo_bib;
      this.biblioteca.sedeBiblioteca = this.form.value.sede_bib;
      if (this.edicion) {
        this.bS.update(this.biblioteca).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      } else {
        this.bS.insert(this.biblioteca).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
        this.router.navigate(['biblioteca']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_bib: new FormControl(data.idBiblioteca),
          sede_bib: new FormControl(data.sedeBiblioteca),
        });
      });
    }
  }

}
