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
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditamenu.component.html',
  styleUrl: './creaeditamenu.component.css'
})
export class CreaeditamenuComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  menu: Menu = new Menu();
  id: number = 0;
  edicion: boolean = false;
  listaSedes: Cafeteria[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private cS: CafeteriaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.cS.list().subscribe((data) => {
      this.listaSedes = data;
    });
  
    this.form = this.formBuilder.group({
      codigo_menu: [''],
      entrada: ['', Validators.required],
      platoPrincipal: ['', Validators.required],
      postre: ['', Validators.required],
      refresco: ['', Validators.required],
      precioMenu: ['', Validators.required],
      cafeteria_: ['', Validators.required],
    });

  }

  aceptar(): void {
    if (this.form.valid) {
      this.menu.idMenu = this.form.value.codigo_menu;
      this.menu.entrada = this.form.value.entrada;
      this.menu.platoPrincipal = this.form.value.platoPrincipal;
      this.menu.postre = this.form.value.postre;
      this.menu.refresco = this.form.value.refresco;
      this.menu.precioMenu = this.form.value.precioMenu;
      this.menu.cafeteria.idCafeteria = this.form.value.cafeteria_;
  
      if (this.edicion) {
        this.mS.update(this.menu).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {

        this.mS.insert(this.menu).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['menu']);
    }
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo_menu: new FormControl(data.idMenu),
          entrada: new FormControl(data.entrada),
          platoPrincipal: new FormControl(data.platoPrincipal),
          postre: new FormControl(data.postre),
          refresco: new FormControl(data.refresco),
          precioMenu: new FormControl(data.precioMenu),
          cafeteria_: new FormControl(data.cafeteria),
        });
      });
    }
  }






}
