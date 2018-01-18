import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { AbstractHttpService } from "../../shared/service/abstract-http.service";
declare var $: any;

@Injectable()
export class UploadFormService{
    constructor(http: Http){
    }
}