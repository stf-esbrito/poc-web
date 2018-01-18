import { Component, OnInit } from "@angular/core";
import { AbstractHttpService } from "../shared/service/abstract-http.service";
import { Http, ResponseContentType } from "@angular/http";
import { UploadFormService } from "./service/upload-form.service";
import { RequestOptions, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Headers } from "@angular/http";
import 'rxjs/Rx' ;

@Component({
    selector: 'upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})

export class UploadFormComponent implements OnInit {
    protected apiUrl: string = environment.apiUrl;
    public arquivo : any;

    constructor(private uploadFormService : UploadFormService, private http: Http){}

    ngOnInit(){}
    
    public onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target : HTMLInputElement = <HTMLInputElement> eventObj.target;
        let fileList: FileList = target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('degree_attachment', file, file.name);
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.apiUrl+'upload', formData,options).subscribe();
            }
    }
    public buscar(){
        this.getFileDownload().subscribe(res => {
            let fileUrl = URL.createObjectURL(res);
            var link = document.createElement("a");
            link.download = name;
            link.href = fileUrl;
            link.click();
        });
    }
    public getFileDownload(): any{
        return this.http.get(this.apiUrl+'upload', { responseType: ResponseContentType.Blob }).map(res => {return new Blob([res.blob()],{ type: 'image/png' })});      
    }
}   