import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class RestProvider {


  constructor(public http: HttpClient) {

  }

  postDatos(dataParam, tokenInput){
   console.log(tokenInput);
    let options = {
      headers: {
        'Authorization': 'Bearer ' + tokenInput
      }
    };
   var url = 'https://automl.googleapis.com/v1beta1/projects/291579994438/locations/us-central1/models/ICN8234537249530707968:predict';
  return this.http.post(url,JSON.stringify(dataParam),options);
}
}
