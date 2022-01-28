import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  options:{observe: 'body', responseType: 'json', params}
  apiUrl = "http://54.208.151.99:4000/data/";
  constructor(private httpClient: HttpClient  ) { }

  sendGetRequest(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("page","1").set("limit", "100");
    let result =this.httpClient.get<any>(this.apiUrl);
    console.log(result)
    return (result);
  }
}
