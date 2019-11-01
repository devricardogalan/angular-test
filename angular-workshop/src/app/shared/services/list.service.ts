import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './list.interface';

@Injectable({
    providedIn: 'root',
  })

export class ListService{
    constructor(private httpClient:HttpClient){

    }

    getList(){
        return this.httpClient.get<List[]>("http://localhost:3000/peliculas");
    }
}