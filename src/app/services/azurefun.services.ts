import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AzureFunService {
  baseUrl: string = "https://my-sample-func-app-20220127.azurewebsites.net/api/task";

  constructor(private http: HttpClient) {}

  getAzureFunData() {
    return this.http.get(this.baseUrl);
  }
  getAzureFunDataId(id) {
    return this.http.get(this.baseUrl + '/' + id);
  }
  updateAzureFunDataId(data, id) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }
  postAzureFunData(data) {
    return this.http.post(this.baseUrl, data);
  }
  deleteAzureFunData(id) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
