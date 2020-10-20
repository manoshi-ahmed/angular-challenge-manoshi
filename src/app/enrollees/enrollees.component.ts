import { DataService } from '../data.service';
import { Enrollee } from '../enrollee';

import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.css']
})
export class EnrolleesComponent implements OnInit {
  [x: string]: any;

  enrollees=[];
  selectedEnrollee: Enrollee;

  // formControl variables
  updatedName= new FormControl('');  
  updatedStatus= new FormControl();


  // image variables
  green_dot:string="assets/images/green-dot.png";
  red_dot:string="assets/images/red-dot.png";
  sorting_arrow:string="assets/images/sorting-arrow.png";
  edit_icon:string="assets/images/edit-icon.png";
  search_icon:string="assets/images/search-icon.png";


  // variables used in sort() function
  key:string= 'id';
  reverse:boolean=false;

  // variable used in search() function
  input:string;
  id:string;

  // variables used for pagination
  count: Number=10;
  p: Number = 1;
  pageLength="10";

  error;
  

  // constructor
  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  // gets the data from server else shows error
  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe(
      (data: any[])=>{
        this.enrollees = data;
      }, (err) => {
        this.error = "Service Temporarily Unavailable";
        console.log(err);
    }
    ); 
  }

  // getLength() function used to set pagination
  getLength(count:string){
    this.count=parseInt(count);
  }

  // onSelect() function to select particular enrollee
  onSelect(Enrollee : Enrollee): void {
    this.selectedEnrollee = Enrollee;    
  }

  // search() function to search by name from the table
  search(){
    if(this.input !=""){
      this.enrollees=this.enrollees.filter(res=>{
        let value=(res.id.match(this.input))  || (res.name.toLocaleLowerCase().match(this.input.toLocaleLowerCase()));
        return value;
      });
      
    }else if (this.input ==""){
      this.ngOnInit();
    }
  }
  
  // sort() function used to sort columns
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

  // formatDate() function formats the date of Birth to mm/dd/yyyy
  formatDate(input) {
    if (input == null){
      return "-";
    } else {
      var arrDate = input.split("-");
      return arrDate[1] + "/" +arrDate[2] + "/" + arrDate[0];
    }
  }

  // modifyEnrollee() function is used to modify enrollee
  modifyEnrolle(id:string, name:string, active:string, dateOfBirth:string){

    // if input name is empty => shows error
    if(name==null){
      this.updatedName.reset();
      this.updatedStatus.reset();
      this.openSnackbar('Invalid name! Please try again.', '', 'red-snackbar');
    } 
    // else (input name is not empty)
    else{ 

      var pattern = new RegExp(/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
      let trimmedName = name.trim(); //trim name


      //If input name only includes "space(s)" or starts with number or includes unacceptable character => shows error
      if(trimmedName.length == 0 || parseInt(name)|| pattern.test(name)){

        this.updatedName.reset();
        this.updatedStatus.reset();
        this.openSnackbar('Invalid name! Please try again.', '', 'red-snackbar');
      } 

      // else modifys the data and show notification that information updated
      else{   
        name=name.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '); 
        
        console.log(name);
        this.selectedEnrollee.name = name;
        
        let data = {
          "active": Boolean(active),
          "name": name,
          "dateOfBirth":dateOfBirth
        }
        this.dataService.updateEnrollee(data,id).subscribe();
      
        // user selects activation status
        if(active === ""){
          this.selectedEnrollee.active = false;
        } else{ 
          this.selectedEnrollee.active = true;
        } 

        //resets the form fields
        this.updatedName.reset();
        this.updatedStatus.reset();  

        //shows notification
        this.openSnackbar('Enrollee Information Updated Successfully!', '', 'green-snackbar');
      }
    } 
  }

  // function to show notification using material snackbar
  openSnackbar(message, action, className: string): void{
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: [className]
        });

  }

}
