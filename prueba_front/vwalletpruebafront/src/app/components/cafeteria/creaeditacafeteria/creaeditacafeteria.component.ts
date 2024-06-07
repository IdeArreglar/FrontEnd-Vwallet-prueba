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
import { Cafeteria } from '../../../models/Cafeteria';
import { CafeteriaService } from '../../../services/cafeteria.service';

@Component({
  selector: 'app-creaeditacafeteria',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditacafeteria.component.html',
  styleUrl: './creaeditacafeteria.component.css'
})
export class CreaeditacafeteriaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  cafeteria: Cafeteria = new Cafeteria();
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
    private cS: CafeteriaService,
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
      codigo_caf: [''],
      sede_caf: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cafeteria.idCafeteria = this.form.value.codigo_caf;
      this.cafeteria.sedeCafeteria = this.form.value.sede_caf;
      if (this.edicion) {
        this.cS.update(this.cafeteria).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.cafeteria).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
        this.router.navigate(['cafeteria']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_caf: new FormControl(data.idCafeteria),
          sede_caf: new FormControl(data.sedeCafeteria),
        });
      });
    }
  }
}
