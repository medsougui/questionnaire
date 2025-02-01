import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquest',
  templateUrl: './addquest.component.html',
  styleUrls: ['./addquest.component.css']
})
export class AddquestComponent {
  
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('container2', { static: true }) container2!: ElementRef;
  ngOnInit() {}
  question = "";

  sendquest() {
    const checkboxes = Array.from(this.container.nativeElement.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    const atLeastOneChecked = checkboxes.some((checkbox) => checkbox.checked);
    const listreps= this.container.nativeElement.querySelectorAll('input[name="reps"]');
    if (this.question !== '') {
      if (this.areAtLeastTwoRepsNotEmpty()) {
        if(atLeastOneChecked){
        const list=this.checkedList()
        const myData = [{"question":this.question},{"tab":list}];
        fetch("http://localhost:3000/quest-Send", {
          method: "POST",
          body: JSON.stringify(myData),
          headers: { "Content-Type": "application/json" }
        }).then((response) => response.json())
          .then((json) => console.log(json));
          setTimeout(() => {
            this.router.navigate(['/quest']);
          }, 500);
          
      } else{
        alert('alertand one answer must be checked')}
    }
      else {
        alert('ervy question must get two answer ');
      }
    } else {
      alert('You must write a question');
    }
  }

  x = 3;
  checkedList() {
    const listCheck = Array.from(this.container.nativeElement.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    const listReps = Array.from(this.container.nativeElement.querySelectorAll('input[name="reps"]')) as HTMLInputElement[];
    const resultList: { 'reponse': any; 't/f': any; }[] = [];
  
    listCheck.forEach((checkbox, index) => {
      const response = listReps[index].value;
      const isChecked = checkbox.checked;
  
      if (response.trim() !== '') {
        resultList.push({ 'reponse': response, 't/f': isChecked });
      }
    });
  
    return resultList;
  }
  
  
  addQuestion() {
    if (this.x !== 6) {
      const dElement = this.renderer.createElement('div');
const textInput = this.renderer.createElement('input');
const checkboxInput = this.renderer.createElement('input');
dElement.classList.add('mb-4', 'justify-content-center', 'd-flex');

this.renderer.setAttribute(textInput, 'type', 'text');
this.renderer.setAttribute(textInput, 'name', 'reps');
textInput.classList.add('form-control', 'd-inline-block', 'mr-3','w-75');
textInput.setAttribute('placeholder', 'Answer ' + this.x++);

this.renderer.setAttribute(checkboxInput, 'type', 'checkbox');
checkboxInput.classList.add('ms-3', 'form-check-input');

this.renderer.appendChild(dElement, textInput);
this.renderer.appendChild(dElement, checkboxInput);

this.renderer.appendChild(this.container2.nativeElement, dElement);

    } else {
      alert('Max 5 answers');
    }
  }

  areAtLeastTwoRepsNotEmpty(): boolean {
    const repInputs = this.container.nativeElement.querySelectorAll('input[name="reps"]');
    let count = 0;

    repInputs.forEach((input: HTMLInputElement) => {
      if (input.value.trim() !== '') {
        count++;
      }
    });

    return count >= 2;
  }

  constructor(private renderer: Renderer2,private router:Router) {}
}
