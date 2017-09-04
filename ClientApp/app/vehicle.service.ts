import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveVehicle } from "./components/app/models/vehicle";


@Injectable()
export class VehicleService {
 

constructor(private http:Http,@Inject('ORIGIN_URL')private originUrl:string) { }
headers:Headers=new Headers({'Content-Type': 'application/json'});

getFeatures(){
  return  this.http.get(this.originUrl+'/api/features').map(res=>res.json());
             }
getMakes()
   {
   return this.http.get(this.originUrl+'/api/makes')
   .map(res =>res.json());
   }
create(vehicle)
  {
   
    let authToken = localStorage.getItem('access_token');
    let idtoken=localStorage.getItem('id_token');
    let expiresat=localStorage.getItem('expires_at');
    console.log(authToken);
    this.headers.append('Authorization', `Bearer ${authToken}`);
    this.headers.append('Content-Type','application/json');
  
    console.log(this.headers.get('Authorization'));
    return this.http.post(this.originUrl + '/api/vehicles',vehicle,{headers:this.headers})
   .map(res =>res.json());
  }
 
  update(vehicle:SaveVehicle)
  {
 return this.http.put(this.originUrl+'/api/vehicles/'+vehicle.id,vehicle)
   .map(res=>res.json());
  } 
  
  delete(id)
  {
  return this.http.delete(this.originUrl+'/api/vehicles/'+id)
  .map(res=>res.json());
  }
getVehicle(id)
  {
  return this.http.get(this.originUrl+'/api/vehicles/'+id).map(res=>res.json());
  }
toQueryString(obj)
{
var parts=[];
  for(var property in obj) 
    {
     var value=obj[property];
     if(value!=null&&value!=undefined)
      {
        parts.push(encodeURIComponent(property)+"="+encodeURIComponent(value));
      }
    }
    return parts.join('&');
}
getVehicles(query)
{
  return this.http.get(this.originUrl+'/api/vehicles'+"?"+this.toQueryString(query)).map(res=>res.json());
}
}
