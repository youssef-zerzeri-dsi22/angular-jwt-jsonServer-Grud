import { Component, OnInit, NgZone } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
 // To get the route parameter
import { EmployeeService } from '../employee.service'; // Assuming you have an employee service to fetch data
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css'],
  standalone: true, // This makes it standalone
  imports: [FormsModule,ReactiveFormsModule], // Add FormsModule here directly

})

export class EditerComponent implements OnInit {
 // To store the employee ID
  employee = { name: '', status: '' }; // To store employee data
  isEditing: boolean = true; // Assuming you're editing the employee data
  updateForm: FormGroup;
  employeeId:any;
  employees:any;
  constructor(
    private route: ActivatedRoute,
    public formBiulder: FormBuilder,
    private router: Router,
    private activateRout: ActivatedRoute,
    private ngZone: NgZone,
    private employeeService: EmployeeService // Assuming this service fetches employee data
  ) {   

    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
      console.log(data['employee'])
      this.updateForm.setValue({
        name: data['employee']['name'],
        price: data['employee']['status'],
      });
    });
    this.updateForm = this.formBiulder.group({
      name: [''],
      status: [''],
    })
  }

  ngOnInit(): void {
    
  }
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  // This will be called when submitting the form
  updateEmployee(): void {
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.updateForm.value).subscribe((updatedEmployee) => {
        console.log('Employee updated:', updatedEmployee);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]); // Navigate back to the current route to force a reload
          });
        });
      });
    }
  }
}
