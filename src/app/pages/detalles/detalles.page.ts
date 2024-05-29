import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.getDetalles()
  }

  detalles:any[] = []

  getDetalles () {
    this.api.getDetalles().subscribe({
      next: (res:any) => {
        console.log(res)
        this.detalles = res.data
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }
}
