import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollee } from 'server/enrollees';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public REST_API_SERVER = "http://localhost:8080/enrollees";

  constructor(private httpClient: HttpClient) { }


  public sendGetRequest(){
    var val= this.httpClient.get(this.REST_API_SERVER);
    return val;
  }

  updateEnrollee(enrollee: Enrollee, id: string): Observable<any> {
    return this.httpClient.put(this.REST_API_SERVER +'/' + id, enrollee);
  }
}
