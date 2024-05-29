import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private api:ApiService, private toastController:ToastController) {}

  ngOnInit(): void {
    this.getServicios()
  }

  backupUpServicios:any[] = [];
  servicios:any[] = [];
  pages = 1;
  pageCount = 0;
  num = 25;

  numRegs () {
    this.servicios = [];
    this.pages = 1;
    this.pageCount = 0;
    this.getServicios();
  }

  getServicios () {
    this.api.getServicios(this.pages, this.num).subscribe({
      next: (res:any) => {
        console.log(res)
        this.servicios.push(...res.data)
        this.backupUpServicios = this.servicios;
        this.pageCount = res.meta.pagination.pageCount
      }, error: (error: any) => {
            this.presentToast("bottom", "Error al cargar los datos", "danger")
        console.log(error)
      }
    })
  }

   doRefresh(event: any) {
    this.presentToast("bottom", "Cargando datos...", "success")
    setTimeout(() => {
      this.servicios = []
      this.getServicios()
      event.target.complete();
    }, 3000);
  }

  onIonInfinite(ev: any) {
    if (this.pages < this.pageCount) {
      this.pages++
      this.getServicios()
    } else {
      this.presentToast("bottom", "Ya se han cargado todos los datos.", "success")
    }
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  filterItems(searchTerm:any) {
    return this.servicios.filter(item => {
      return item.attributes.users_permissions_user.data.attributes.name.
      toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    })
  }

  onChange(event:any) {
    this.servicios = this.filterItems(event.target.value);
    if (event.target.value.length === 0) {
      this.servicios = this.backupUpServicios;
    }
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

  eliminar(id:any) {
    this.api.delServicio(id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.servicios.splice(this.servicios.indexOf(id), 1);
        this.presentToast("bottom", "Se ha eliminado el registro", "success")
      }, error: (error:any) => {
        console.log(error);
      }
    });
  }
}
