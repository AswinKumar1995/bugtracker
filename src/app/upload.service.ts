import { Injectable } from '@angular/core';
///import * as AWS from "aws-sdk";
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import { NODATA } from 'dns';
import { Cookie } from 'ng2-cookies/ng2-cookies';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public FOLDER = "assignment-files"

  constructor() { }


  uploadFile(file):any {
    const contentType = file.type;
    const bucket = new S3(
          {
            accessKeyId: '**',
            secretAccessKey: '**',
            region: '**'
          }
      );
      const params = {
          Bucket: 'edwisor-aswinkumar-bucket',
          Key: this.FOLDER + file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              let nodata = {"Location":""}
              Cookie.set('fileLocation',"")
              return nodata;
          }
          console.log('Successfully uploaded file.');
          console.log(data)
          console.log(typeof data["Location"])
          Cookie.set('fileLocation',data["Location"])
          console.log("New file Location")
          console.log(Cookie.get("fileLocation"))
          return data;
      });

}





}
