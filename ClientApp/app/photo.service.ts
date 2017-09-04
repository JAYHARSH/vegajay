import { Injectable, Inject } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class PhotoService {

    constructor(private http:Http,@Inject('ORIGIN_URL')private originUrl:string) { }

    upload(vehicleId,photo)
    {
    var formData=new FormData();
    formData.append('file',photo);
    return this.http.post(this.originUrl + `/api/vehicles/${vehicleId}/photos`, formData).map(res=>res.json());
    }

    getPhotos(vehicleId)
    {
    return this.http.get(this.originUrl+`/api/vehicles/${vehicleId}/photos`).map(res=>res.json());
    }
}