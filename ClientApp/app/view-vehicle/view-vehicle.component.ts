import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { VehicleService } from "../vehicle.service";
import { ToastyService } from "ng2-toasty";
import { PhotoService } from "../photo.service";
import { ProgressService } from "../progress.service";

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers:[VehicleService,PhotoService,ProgressService]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput')fileInput:ElementRef;
  photos:any[];
  progress:any={};
  vehicle:any={make:{id:'',name:''},
              model:{id:'',name:''},
              isRegistered:false,
              contact:{name:'',email:'',phone:''},
              features:[]};
  
  model:any={};
  vehicleId:number;

  constructor(
     private zone:NgZone,
     private progressService:ProgressService,
     private route:ActivatedRoute,
     private router:Router,
     private toasty:ToastyService,
     private vehicleService:VehicleService,
     private photoService:PhotoService
      ) { 
        route.params.subscribe(p=>{
              this.vehicleId=+p['id'];
              if(isNaN(this.vehicleId)||this.vehicleId<=0)
                {
                router.navigate(['/vehicles']);
                return;
                }
                  });

        }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId).subscribe(photos=>this.photos=photos);
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v=>{this.vehicle.make=v.make,
                                                                this.vehicle.model=v.model,
                                                                this.vehicle.isRegistered=v.isRegistered,
                                                                this.vehicle.contact=v.contact,
                                                                this.vehicle.features=v.features
                                                                },err=>{
    if(err.status==404){
        
         this.router.navigate(['/vehicles']);
         return;
       }
    });
  }

  delete()
  {
    if(confirm("Are you sure?"))
      {
       this.vehicleService.delete(this.vehicle.id).subscribe(x=>{this.router.navigate(['/vehicles']);})
      }
  }
  uploadPhoto()
  {
      this.progressService.startTracking().subscribe(progress=>{this.zone.run(()=>{this.progress=progress});},null,()=>{this.progress=null});
      var nativeElement:HTMLInputElement=this.fileInput.nativeElement;
      var file=nativeElement.files[0]
       nativeElement.value=''
      this.photoService.upload(this.vehicleId,file).subscribe(photo=>{this.photos.push(photo)},err=>{this.toasty.error({
           title:'Error',
           msg:err.text(),
         theme:'bootstrap',
          showClose:true,
         timeout:5000
                });
        });

  }

}
