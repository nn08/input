import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DescriptionService } from './description.service';
import { Description } from './description';
import { Employee } from './description';
import { Rate } from './rate';
import { RATES } from './rate_value';


@Component({
   selector: 'app-description',
   templateUrl: './description.component.html',
   styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
   //Component properties
   //list of all skill info in the page, get from db
   public allDescriptions: Description[];
   employeeInfo: Employee[];
   statusCode: number;
   requestProcessing = false;
   recordIdToUpdate = null;
   resultToEdit = false;
   processValidation = false;
   readioSelected:any;
   //Create form
   descriptionForm = new FormGroup({
     skill_id: new FormControl('', Validators.required),
     rate: new FormControl('', Validators.required)
   });

   SelectedRate:number;
   SelectedItem:string="";
   rateList: Rate[] = RATES;

   //Create constructor to get service instance
   constructor(private descriptionService: DescriptionService) {
   }


   //Create ngOnInit() and load records
   ngOnInit(): void {
     //debugger;
	   this.getAllDescriptions();
     this.getAllEmployeeInfo();
     this.rateList = RATES;
     //this.SelectedRate = "";
   }
   //Fetch all records
   getAllDescriptions() {
		this.descriptionService.getAllDescriptions()
		  .subscribe(
                data => this.allDescriptions = data,
                errorCode =>  this.statusCode = errorCode);

   }

   getAllEmployeeInfo() {
     this.descriptionService.getAllEmployeeInfo()
     .subscribe(
        data => {
          this.employeeInfo = data;
          console.log("data: ",this.employeeInfo);
        },
        errorCode => this.statusCode = errorCode);
   }

   trackByIndex(index, item) {
     return index;
   }

   //create new records
   createNewRecord() {
    /* if (this.descriptionForm.valid) {
           // simulate new model creation and send the new data to external service
           this.newModel = {
               value: this.descriptionForm.value.selectedRate,
               name: this.descriptionForm.name.selectedRate
           };
       } else {
           this.newModel = null;
       }
   }*/

          console.log(this.allDescriptions);
          //debugger;
          this.preProcessConfigurations();
          let arr=[];
          for(let i=0; i< this.allDescriptions.length; i++){
              let sub_arr = [];
              sub_arr.push(this.allDescriptions[i].skill_id, this.allDescriptions[i].rate)
              arr.push(sub_arr);
          }

          this.descriptionService.createRecord(arr)
              .subscribe(description => {
                      //console.log(arr);
                      this.processValidation = true;
                      this.requestProcessing = false;
                  },
                  errorCode =>  this.statusCode = errorCode);
      }


    getSelectedRate(event: any){
      var index=event.target.id.split("_")[0];
      //console.log(this);
      this.allDescriptions[index].rate=event.target.value;
      //console.log(this.allDescriptions[index].skill_id,this.allDescriptions[index].rate);
    }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	    this.requestProcessing = true;
   }

}
