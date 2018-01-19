import { Http, RequestOptions, Headers, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map'
import { Options } from 'selenium-webdriver';
import { environment } from "../../../environments/environment";



export abstract class AbstractHttpService<T> {

    private apiUrl: string = environment.apiUrl;

    constructor(
        private resource: string, 
        private http: Http) {
    }

    public queryAll(queryParams?: any): Observable<T[]> {
        return this.http.get(`${this.apiUrl}${this.resource}?${this.buildQueryParams(queryParams)}`, this.getCustomOptions())
            .map(response => response.json());
    }

    public get(id: number): Observable<T> {
        return this.http.get(`${this.apiUrl}${this.resource}/${id}`, this.getCustomOptions())
            .map(response => response.json());
    }

    public getFile(id: number) : Observable<Blob> {
        return this.http.get(`${this.apiUrl}${this.resource}/${id}`, this.getCustomOptions()).map(res => {
            return new Blob([res.blob()], { type: res.blob().type })
        });
    }

    public post(requestBody: T): Observable<T> {
        return this.http.post(`${this.apiUrl}${this.resource}`, requestBody, this.getCustomOptions())
            .map(response => response.json());
    }

    public put(requestBody: T): Observable<T> {
        return this.http.put(`${this.apiUrl}${this.resource}/${requestBody['id']}`, requestBody, this.getCustomOptions())
            .map(response => response.json());
    }

    public delete(requestBody: number) {
        return this.http.delete(`${this.apiUrl}${this.resource}/${requestBody}`, this.getCustomOptions())
            .map(response => response);
    }
    
    private buildQueryParams(params: any): string {
        let queryParams: string = '';

        for (let property in params) {
            if (queryParams === '') {
                queryParams += `${[property]}=${params[property]}`;
            } else {
                queryParams += `&${[property]}=${params[property]}`;
            }
        }

        return queryParams;
    }

    private getCustomOptions(): RequestOptions {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Content-Disposition', 'form-data');
        return new RequestOptions({headers: headers, responseType : ResponseContentType.Blob},);
    }
}