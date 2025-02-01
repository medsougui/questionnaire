import { Component,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  nom?: string;
  isLgMode?:boolean;
  @ViewChild('pdf') pdf!: ElementRef;

  ngOnInit(): void {
    this.isLgMode=window.innerWidth>=1000;
    this.fetchQuestions();
    this.fetchans();
    this.route.paramMap.subscribe(params => {
      this.nom = params.get('nom')!;
    });  
 // Run every 1000 milliseconds (1 second)
  
  }
  reps: any[] = [];
  quests: any[] = [];
  tabData!: any[];
  score:number | undefined;
  constructor(private route: ActivatedRoute,private router:Router) {
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe(params => {
      this.tabData = JSON.parse(params['tabData']);
      this.score = +params['score']; // Convert to a number if needed
    });
}
fetchQuestions(): void {
  fetch('http://localhost:3000/quest')
    .then(response => response.json())
    .then(data => {
      this.quests = data;
    });
}
fetchans(): void {
  fetch('http://localhost:3000/rep')
    .then(response => response.json())
    .then(data => {
      this.reps = data;
    });
}
generatePDF(){
  let x=confirm('do you want to download you result')
  if(x){
  const pdfElement = this.pdf.nativeElement;
  const options = {
    filename: this.nom+'_results.pdf',
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(pdfElement).set(options).save();
  }
}
logout() {
  let x=confirm('do you want to exit')
  if(x){
    this.router.navigate(['']);
  }
  
}
}
