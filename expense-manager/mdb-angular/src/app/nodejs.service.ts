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

  // connect to nodejs.service /transactions
  // load transaction cvs file "src" from sub-folder: data
  getSrc(src: string):Observable<Record[]> {
    console.log("*** nodejs.service: getSrc ...")
    return this.http.get<Record[]>('/api/v1/transactions?src='+src);
  }

  // connect to nodejs.service /categories
  // load json file "src" from sub-folder: repository
  getJson(src: string):Observable<string> {
    console.log("*** nodejs.service: getJson ...")
    return this.http.get<string>('/api/v1/categories?json='+src);
  }

  // connect to nodejs.service /categories
  postJson(file: string, content: string):Observable<any> {
    return this.http.post('/api/v1/categories?json='+file, content, this.httpOptions);
  }

  // connect to nodejs.service /home
  // load all accounts from nodejs ActiveAccountManager
  getConfig(): Observable<any> {
    console.log("*** nodejs.service: getConfig ...")
    return this.http.get<any>('/api/v1/home');
  }
 

}
