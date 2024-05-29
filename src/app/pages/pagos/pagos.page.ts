import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.getPagos()
  }

  pagos:any[] = []

  getPagos () {
    this.api.getPagos().subscribe({
      next: (res:any) => {
        console.log(res)
        this.pagos = res.data
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }
}
