import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Record }  from "./record";
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NodejsService {
  constructor(private http: HttpClient) { 
    /*
    const name = '/api/v1/transactions';
  	this.http.get(name).subscribe((data:any) => {
      this.src = new Category(data.records, name);
      console.log(this.src);
    }, error => {
        console.log("There was an error generating the proper GUID on the server", error);
    });
    */
  }

  getSrc():Observable<Record[]> {
    return this.http.get<Record[]>('/api/v1/transactions');
  }
}
