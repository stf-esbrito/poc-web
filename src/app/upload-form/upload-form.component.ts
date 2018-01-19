import { Component, OnInit, ElementRef } from "@angular/core";
import { AbstractHttpService } from "../shared/service/abstract-http.service";
import { Http, ResponseContentType } from "@angular/http";
import { UploadFormService } from "./service/upload-form.service";
import { RequestOptions, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Headers } from "@angular/http";
import 'rxjs/Rx';
import { Colaborador } from "../model/colaborador.model";

@Component({
    selector: 'upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})

export class UploadFormComponent implements OnInit {
    protected apiUrl: string = environment.apiUrl;

    constructor(private element: ElementRef, private uploadFormService: UploadFormService, private http: Http) { }

    ngOnInit() { }

    public onClick() {
        
        let file = this.getFileFromInput();
        if (this.fileIsValid(file)) {
            let formData: FormData = new FormData();
            let colaborador = new Colaborador();
            colaborador.name = "Teste";
            formData.append('colaborador', JSON.stringify(colaborador));
            formData.append('file', file, file.name);
            this.uploadFormService.post(formData).subscribe();
        }
    }
    public downloadFile(id: number) {
        this.getFileDownload(id).subscribe(res => {
            this.downloadAction(res);
        });
    }

    public getFileDownload(id: number): any {
        return this.uploadFormService.getFile(id);
    }

    public getFileFromInput(): File {
        return this.element.nativeElement.querySelector("#file").files == null ? null : this.element.nativeElement.querySelector("#file").files[0];
    }

    public fileIsValid(file: File) {
        if (file != null) {
            if (file.type == "aplication/pdf"
                || file.type == "image/png"
                || file.type == "image/jpeg") {
                return true;
            }
        }
        return false;
    }

    public downloadAction(res: any) {
        let fileUrl = URL.createObjectURL(res);
        var link = document.createElement("a");
        link.download = name;
        link.href = fileUrl;
        link.click();
    }
}   