import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Record }  from "./model/record";
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NodejsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 
  constructor(private http: HttpClient) { 
  }

  getSrc(src: string):Observable<Record[]> {
    return this.http.get<Record[]>('/api/v1/transactions?src='+src);
  }

  getJson(src: string):Observable<string> {
    return this.http.get<string>('/api/v1/categories?json='+src);
  }

  postJson(file: string, content: string):Observable<any> {
    return this.http.post('/api/v1/categories?json='+file, content, this.httpOptions);
  }

  getConfig(): Observable<any> {
    return this.http.get<any>('/api/v1/home');
  }
 

}
