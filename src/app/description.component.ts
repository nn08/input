import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DescriptionService } from './description.service';
import { Description } from './description';
import { DescriptionComponent } from './description.component';

@Component({
   selector: 'app-description',
   templateUrl: './description.component.html',
   styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
   //Component properties
   allDescriptions: Description[];
   statusCode: number;
   requestProcessing = false;
   recordIdToUpdate = null;
   resultToEdit = false;
   processValidation = false;
   //Create form
   descriptionForm = new FormGroup({
     rate: new FormControl('', Validators.required)
   });

   //Create constructor to get service instance
   constructor(private descriptionService: DescriptionService) {
   }
   //Create ngOnInit() and load records
   ngOnInit(): void {
	   this.getAllDescriptions();
   }
   //Fetch all records
   getAllDescriptions() {
		this.descriptionService.getAllDescriptions()
		  .subscribe(
                data => this.allDescriptions = data;
                this.displayData= true;
				errorCode =>  this.statusCode = errorCode);

   }

   //create new records
   createNewRecord() {
      this.preProcessConfigurations();
      let arr[];
      for(leti=0;i< this.descriptionForm.data.length;i++){
        arr.push(this.BuildFormDynamic(this.descriptionForm.data[i]))
      }
      //this.rateForm.setValue({ skill_id: descriptionForm.skill_id });
      let rate = this.descriptionForm.value.rate;
      this.descriptionService.createRecord(rate)
      .subscribe(description => {
        console.log(description);
        this.processValidation = true;
        this.requestProcessing = false;
		   },
		   errorCode =>  this.statusCode = errorCode);
   }
/*   //Load record by id to edit
   loadRecordToEdit(skillId: string) {
      this.preProcessConfigurations();
      this.recordService.getRecordById(skillId)
	      .subscribe(record => {
			console.log(record,'poiuytre');
		            this.recordIdToUpdate = record.id;
					this.recordForm.setValue({ period: record.period, rating: record.rating });
					this.processValidation = true;
					this.requestProcessing = false;
		        },
		        errorCode =>  this.statusCode = errorCode);
   }

   //CNN Load record by priod to edit
   loadRecordByPeriod(recordPeriod: string) {
      this.preProcessConfigurations();
      this.resultToEdit = true;
      this.recordService.getRecordByPeriod(recordPeriod).subscribe (
          data => this.allRecords = data,
          errorCode =>  this.statusCode = errorCode
   )
 }

 //Handle create and update record
 onRecordFormSubmit() {
  this.processValidation = true;
  if (this.recordForm.invalid) {
       return; //Validation failed, exit from method.
  }
  //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let period = this.recordForm.value.period;
      this.loadRecordByPeriod(period);
 }

   //Delete record
   deleteRecord(recordId: string) {
      this.preProcessConfigurations();
      this.recordService.deleteRecordById(recordId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllRecords();
				    this.backToCreateRecord();
			    },
		        errorCode => this.statusCode = errorCode);
   }
   */
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }
   //Go back from update to create
  /* backToCreateRecord() {
      this.recordIdToUpdate = null;
      this.descriptionForm.reset();
	  this.processValidation = false;
  }*/
}
