import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  constructor(private api: ApiService, private act: ActivatedRoute, private toastController:ToastController) {
    this.id = this.act.snapshot.paramMap.get('id');
  }

  planes: any[] = [];
  clientes: any[] = [];
  servicio: any = '';
  id: any;
  direccion: any;
  ciudad: any;
  estado: any;
  cp: any;
  plan: any;
  cliente: any;

  ngOnInit() {
    this.getPlanes();
    this.getClientes();
    this.getServicio(this.id);
  }

  getPlanes() {
    this.api.getPlanes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.planes = res.data;
      },
      error: (errors: any) => {
        console.log(errors);
      },
    });
  }

  getClientes() {
    this.api.getClientes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.clientes = res;
      },
      error: (errors: any) => {
        console.log(errors);
      },
    });
  }

  getServicio(id: any) {
    this.api.getServicio(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.servicio = res.data;
        this.direccion = this.servicio.attributes.direccion;
        this.ciudad = this.servicio.attributes.ciudad;
        this.estado = this.servicio.attributes.estado;
        this.cp = this.servicio.attributes.cp;
        this.plan = parseInt(this.servicio.attributes.plan.data.id);
        this.cliente = this.servicio.attributes.users_permissions_user.data.id;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  updateServicio() {
    this.api.updateServicio(this.servicio.id, this.direccion, this.ciudad, this.estado, this.cp)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.data.id) {
            this.presentToast("bottom", "Datos actualizados", "success")
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color,
    });

    await toast.present();
  }
}
