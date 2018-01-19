import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { AbstractHttpService } from "../../shared/service/abstract-http.service";
declare var $: any;

@Injectable()
export class UploadFormService extends AbstractHttpService<any>{
    constructor(http: Http){
        super('upload', http);
    }

    public post(requestBody: any) : Observable<Blob> {
        return super.post(requestBody);
    }

    public getFile(id: number) : Observable<Blob>{
        return super.getFile(id);
    }
}