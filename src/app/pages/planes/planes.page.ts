import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {

constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.getPlanes()
  }

  planes:any[] = []

  getPlanes () {
    this.api.getPlanes().subscribe({
      next: (res:any) => {
        console.log(res)
        this.planes = res.data
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }
}
