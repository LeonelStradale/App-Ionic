import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.api;

  constructor(private http: HttpClient) {}

  getServicios(pages: any, num: any) {
    return this.http.get(
      this.url +
        '/servicios?pagination[page]=' +
        pages +
        '&pagination[pageSize]=' +
        num +
        '&populate=*'
    );
  }

  getServicio(id: any) {
    return this.http.get(this.url + '/servicios/' + id + '?populate=*');
  }

  getPlanes() {
    return this.http.get(this.url + '/plans');
  }

  getPagos() {
    return this.http.get(this.url + '/pagos');
  }

  getDetalles() {
    return this.http.get(this.url + '/detalles');
  }

  getClientes() {
    return this.http.get(this.url + '/users');
  }

  delServicio(id: any) {
    return this.http.delete(this.url + '/servicios/' + id);
  }

  updateServicio(id: any, direccion: any, ciudad: any, estado: any, cp: any) {
    let data = {
      direccion: direccion,
      ciudad: ciudad,
      estado: estado,
      cp: direccion,
    };
    return this.http.put(this.url + '/servicios/' + id, {data});
  }
}
