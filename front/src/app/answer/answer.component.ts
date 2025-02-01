import { Component, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChildren('checkbox') checkboxes!: QueryList<ElementRef>;
  audioPlayer: any;

  constructor(private route: ActivatedRoute ,private router:Router) {
    this.audioPlayer = new Audio();
    this.audioPlayer.src = '../../assets/sound/Clock.mp3';
   }
  reps: any[] = [];
  quests: any[] = [];
  nom?: string;
  id?:string;
  x=0;
  n=0;
  counteurs: number =2;
  counteurm: number =1;
  ngOnInit(): void {
    this.fetchans();
    this.fetchQuestions();
    setTimeout(() => {
      if(this.quests.length>0){
        alert("you have 5 min to complete the questionaire")
        this.route.paramMap.subscribe(params => {
          this.nom = params.get('nom')!;
        });
        this.route.paramMap.subscribe(params => {
          this.id = params.get('id')!;
        });
        if(this.x==0){
        setInterval(() => {
          if( this.counteurm==0 &&  this.counteurs==0){
            this.x=1
            this.check()
          }
          if(this.n===0 && this.counteurm==1&&this.counteurs==0){
            this.n=1
            this.audioPlayer.play();
            setTimeout(() => {
              this.audioPlayer.src = '';
                    }, 3000);
          }
          if (this.counteurs === 0) {
            this.counteurm--;
            this.counteurs=59;
          }
          else{
            this.counteurs--;
          }
        }, 1000);
      }
      }
      else{
        alert('sorry no questions are availeble')
        this.router.navigate(['']);
      }
    }, 100);

  }
  fetchans(): void {
    fetch('http://localhost:3000/rep')
      .then(response => response.json())
      .then(data => {
        this.reps = data;
      });
  }
  fetchQuestions(): void {
    fetch('http://localhost:3000/questactive')
      .then(response => response.json())
      .then(data => {
        this.quests = data;
      });
  }

  tabData: any[] = []; // Assuming you have this property in your component

  check() {
    const tableCheckboxMap: { [tableId: string]: { tdId: string, checkboxId: string, isChecked: boolean, responses: string[] }[] } = {};
    const tableIds: string[] = [];
    let score = this.quests.length;
  
    for (const checkbox of this.checkboxes) {
      const checkboxId = checkbox.nativeElement.id;
      const isChecked = checkbox.nativeElement.checked;
      const tr = checkbox.nativeElement.closest('tr');
      const tdColspan4 = tr.querySelector('td[colspan="4"]');
      const tdId = tdColspan4 ? tdColspan4.id : null;
      const tableId = checkbox.nativeElement.closest('table').id;
      const responseText = tdColspan4 ? tdColspan4.textContent?.trim() : '';
  
      if (!tableCheckboxMap[tableId]) {
        tableCheckboxMap[tableId] = [];
        if (!tableIds.includes(tableId)) {
          tableIds.push(tableId);
        }
      }
  
      tableCheckboxMap[tableId].push({ tdId, checkboxId, isChecked, responses: [responseText] });
    }
  
    for (let i = 0; i < tableIds.length; i++) {
      let currentTableId = tableIds[i];
      const checkboxes = tableCheckboxMap[currentTableId];
      let x = true;
  
      checkboxes.forEach(checkbox => {
        if (checkbox.checkboxId != checkbox.isChecked.toString()) {
          x = false;
        }
      });
  
      if (!x) {
        score = score - 1;
      }
  
      // Store the data in tabData array
      this.tabData.push({
        qid: currentTableId,
        questId: i + 1,
        isCorrect: x,
        checkboxes: checkboxes
      });
    }
    fetch("http://localhost:3000/questionnaire-Send", {
      method: "POST",
      body: JSON.stringify({tab:this.tabData,'idq':this.id,'score':score}),
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json())
      .then((json) => console.log(json));
    // Output the tabData array or use it as needed
    setTimeout(() => {
      this.router.navigate(['/result',{nom:this.nom}], {
      queryParams: { tabData: JSON.stringify(this.tabData), score: score }
      });
    }, 100);
    this.x=1;
    this.counteurs=60;
    this.counteurm=60;  
  }
  

  
  
}
