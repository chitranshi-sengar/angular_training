import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AzureFunService } from "src/app/services/azurefun.services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  data$: Observable<Object>;
  description: string;
  isDone: string;
  descriptionEdit: string;
  isDoneEdit: any;
  isEdit: Object = {};
  constructor(private azureFunService: AzureFunService) {}

  ngOnInit() {
    this.data$ = this.azureFunService.getAzureFunData();
  }
  getDataById(id) {
    this.azureFunService.getAzureFunDataId(id).subscribe((data) => {
      console.log(data);
    });
  }
  addData() {
    if (this.description) {
      let data = {
        description: this.description,
        isDone: this.isDone === "true",
      };
      this.azureFunService.postAzureFunData(data).subscribe(() => {
        this.data$ = this.azureFunService.getAzureFunData();
        this.description = "";
      });
    }
  }
  editData(data) {
    this.isEdit = {};
    this.isEdit[data.id] = true;
    console.log(this.isEdit, data);
    this.descriptionEdit = data.description;
    this.isDoneEdit = data.isDone.toString();
  }
  updateData(id) {
    let c = {
      description: this.descriptionEdit,
      isDone: this.isDoneEdit === "true",
    };
    this.azureFunService.updateAzureFunDataId(c, id).subscribe((data) => {
      this.data$ = this.azureFunService.getAzureFunData();
      this.cancelEditData();
    });
  }
  cancelEditData() {
    this.descriptionEdit = "";
    this.isDoneEdit = "";
    this.isEdit = {};
  }
  deleteData(id) {
    this.azureFunService.deleteAzureFunData(id).subscribe((data) => {
      this.data$ = this.azureFunService.getAzureFunData();
    });
  }
}
