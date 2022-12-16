import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'strength-password',
  templateUrl: './strength-password.component.html',
  styleUrls: ['./strength-password.component.css']
})

export class StrengthPasswordComponent implements OnInit {
  formPassword: string;
  field1: string = 'gray';
  field2: string = 'gray';
  field3: string = 'gray';

  ngOnInit(){
    this.initForm()
  };
  initForm(){};

  checkForce() {
    if (this.formPassword.length === 0) {
      return this.establishForce(0)
    };
    if (this.formPassword.length < 8) {
      return this.establishForce(1)
    };
    
    let onlyLetters = /^[a-zA-Z]+$/g;
    let onlyDigits = /^[0-9]+$/g;
    let onlySymbols = /^[`~!@#$%^&*()\-_=+\[{\]};:'"\\|,<.>/? ]+$/g;

    if (
      onlyLetters.test(this.formPassword) ||
      onlyDigits.test(this.formPassword) ||
      onlySymbols.test(this.formPassword)
      ) {
        return this.establishForce(2);
      };

    let lettersSymbols = /^[a-zA-Z`~!@#$%^&*()\-_=+\[{\]};:'"\\|,<.>/? ]+$/g;
    let lettersDigits = /^[a-zA-Z0-9]+$/g;
    let digitsSymbols = /^[0-9`~!@#$%^&*()\-_=+\[{\]};:'"\\|,<.>/? ]+$/g;

    
    if (
      lettersDigits.test(this.formPassword) ||
      lettersSymbols.test(this.formPassword) ||
      digitsSymbols.test(this.formPassword)
      ) {
        return this.establishForce(3);
      };
      
    let lettersDigitsSymbols = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+\[{\]};:'"\\|,<.>/? ]+$/g;
      
    if (lettersDigitsSymbols.test(this.formPassword) ) {
      return this.establishForce(4);
    };
  };

  establishForce(strenght){
    switch(strenght){
      case 0 :
        this.field1 = 'gray';
        this.field2 = 'gray';
        this.field3 = 'gray';
        break;
      case 1 :
        this.field1 = 'red';
        this.field2 = 'red';
        this.field3 = 'red';
        break;
      case 2 :
        this.field1 = 'red';
        this.field2 = 'gray';
        this.field3 = 'gray';
        break;
      case 3 :
        this.field1 = 'yellow';
        this.field2 = 'yellow';
        this.field3 = 'gray';
        break;
      case 4 :
        this.field1 = 'green';
        this.field2 = 'green';
        this.field3 = 'green';
        break;
    }
  }
}
