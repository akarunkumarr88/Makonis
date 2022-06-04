import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup,Validators } from '@angular/forms';
import { EmployeedetailsService } from '../employeedetails.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  dataSaved = false;
  message = null;
  employeeForm = new FormGroup ({
    firstname: new FormControl(),
    lastname: new FormControl()
  });
  constructor(private fb: FormBuilder, private employeeService: EmployeedetailsService, httpclient: HttpClient) { // <--- inject FormBuilder
    this.createForm();
  }
  createForm() {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname:['', Validators.required ]
    });
  }
  onSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.SaveEmployeeDetails(employee);
    console.log(this.employeeForm.value);
  }
  SaveEmployeeDetails(employee: Employee)
  {
    this.employeeService.createEmployee(employee).subscribe(
      () => {
        this.dataSaved = true;
        this.message = 'Record saved Successfully';
        this.employeeForm.reset();
      }
    );
  }
  
  resetForm() {
    this.employeeForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
