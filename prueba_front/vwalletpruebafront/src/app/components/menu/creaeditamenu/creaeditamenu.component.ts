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


import { Menu } from '../../../models/Menu';
import { MenuService } from '../../../services/menu.service';
import { Cafeteria } from '../../../models/Cafeteria';
import { CafeteriaService } from '../../../services/cafeteria.service';


@Component({
  selector: 'app-creaeditamenu',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditamenu.component.html',
  styleUrl: './creaeditamenu.component.css'
})
export class CreaeditamenuComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  menu: Menu = new Menu();
  listaSedes: Cafeteria[] = [];
  id: number = 0;
  edicion: boolean = false;

  listaentradas: { value: string; viewValue: string }[] = [
    { value: 'Sopa', viewValue: 'Sopa' },
    { value: 'Causa', viewValue: 'Causa' },
    { value: 'Papa Rellena', viewValue: 'Papa Rellena' },
    { value: 'Tequenio', viewValue: 'Tequenio' },
  ];

  listaplatos: { value: string; viewValue: string }[] = [
    { value: 'Cau cau', viewValue: 'Cau cau' },
    { value: 'Aji de gallina', viewValue: 'Aji de gallina' },
    { value: 'Pollo frito', viewValue: 'Pollo frito' },
    { value: 'Lentejas', viewValue: 'Lentejas' },
  ];

  listapostres: { value: string; viewValue: string }[] = [
    { value: 'Gelatina', viewValue: 'Gelatina' },
    { value: 'Helado', viewValue: 'Helado' },
    { value: 'Torta', viewValue: 'Torta' },
  ];

  listabebidas: { value: string; viewValue: string }[] = [
    { value: 'Limonada', viewValue: 'Limonada' },
    { value: 'Maracuya', viewValue: 'Maracuya' },
    { value: 'Gaseosa', viewValue: 'Gaseosa' },
    { value: 'Agua mineral', viewValue: 'Agua mineral' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MenuService,
    private cS: CafeteriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo_menu: ['',],
      entrada: ['', Validators.required],
      platoprincipal: ['', Validators.required],
      postre: [ '', Validators.required ],
      refresco: ['', Validators.required],
      preciomenu: ['', Validators.required],
      cafeteriaMenu: ['', Validators.required],
    });
    this.cS.list().subscribe((data) => {
      this.listaSedes = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.menu.idMenu = this.form.value.codigo_menu;
      this.menu.entrada = this.form.value.entrada;
      this.menu.platoPrincipal = this.form.value.platoprincipal;
      this.menu.postre = this.form.value.postre;
      this.menu.refresco = this.form.value.refresco;
      this.menu.precioMenu = this.form.value.preciomenu;
      this.menu.cafeteria.idCafeteria = this.form.value.pelicula;

      this.mS.insert(this.menu).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });

      this.router.navigate(['menu']);
    }
  }
}
