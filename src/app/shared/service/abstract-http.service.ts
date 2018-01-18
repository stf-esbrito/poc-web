import { environment } from '../../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { log } from 'util';
import { Router } from '@angular/router';

export abstract class AbstractHttpService<T> {

    protected apiUrl: string = environment.apiUrl;

    constructor(protected resource : string, private http: Http){
        
    }
    
    public queryAll(queryParams?: any): Observable<T[]> {
        return this.http.get(`${this.apiUrl}${this.resource}?${this.buildQueryParams(queryParams)}`, this.getCustomOptions())
            .map(response => response.json());
    }

    public queryAllPath(path: string, queryParams?: any): Observable<T[]> {
        console.log(queryParams);
        return this.http.get(`${this.apiUrl}${this.resource}/${path}?${this.buildQueryParams(queryParams)}`, this.getCustomOptions())
        .map(response => response.json());
    }

    public get(id: any): Observable<T> {
        return this.http.get(`${this.apiUrl}${this.resource}/${id}`, this.getCustomOptions())
            .map(response => response.json());
    }

    public post(requestBody: T): Observable<any> {
        return this.http.post(`${this.apiUrl}${this.resource}`, requestBody, this.getCustomOptions())
            .map(response => response.json());
    }
    
    public postAndRedirect(requestBody: T, path: string): Observable<any> {
        return this.http.post(`${this.apiUrl}${this.resource}`, requestBody, this.getCustomOptions())
            .map(response => response.json());
    }

    public put(requestBody: T): Observable<any>{
        return this.http.put(`${this.apiUrl}${this.resource}`, requestBody, this.getCustomOptions())
            .map(response => response.json());
    }

    public delete(requestBody: number) {
        return this.http.delete(`${this.apiUrl}${this.resource}/${requestBody}`, this.getCustomOptions())
            .map(response => response);
    }

    private buildQueryParams(params: any, pagina?: any): string {
        let queryParams: string = '';
        for (let property in params) {
            queryParams += this.addParam(queryParams, property, params);
        }
        if(pagina){
            queryParams += this.addPaginateParams(pagina, queryParams);
        }
        return queryParams;
    }

    private addParam(queryParams, property: any, params: any) {
      if (params[property]) {
        if (queryParams === '') {
          return `${[property]}=${params[property]}`;
        }
        else {
          return `&${[property]}=${params[property]}`;
        }
      }
      return '';
    }

    private addPaginateParams(pagina,queryParams) {
      if (pagina) {
        if (queryParams === '') {
          return `?page=${pagina.page}&size=${pagina.size}`;
        }
        else {
          return `&page=${pagina.page}&size=${pagina.size}`;
        }
      }
    }

    public getCustomOptions(): RequestOptions {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new RequestOptions({headers: headers});
    }

}
