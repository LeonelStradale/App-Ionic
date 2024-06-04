import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

id:any;

  constructor(private api:ApiService, private act:ActivatedRoute) { 
   this.id = this.act.snapshot.paramMap.get('id');
  }

  planes:any[] = [];
  clientes:any[] = [];
  servicio:any[] = [];

  ngOnInit() {
    this.getPlanes();
    this.getClientes();
    this.getServicio(this.id);
  }

  getPlanes () {
  this.api.getPlanes().subscribe({
      next: (res:any) => {
        console.log(res)
        this.planes = res.data;
      },error:(errors:any) => {
        console.log(errors);
      }
    })
  }

  getClientes () {
    this.api.getClientes().subscribe({
      next: (res:any) => {
        console.log(res)
        this.clientes = res;
      },error:(errors:any) => {
        console.log(errors);
      }
    })
  }

  getServicio(id:any) {
    this.api.getServicio(id).subscribe({
      next: (res:any) => {
console.log(res)
this.servicio = res.data;
      }, error: (error:any) => {
console.log(error)
      }
    })
  }
}