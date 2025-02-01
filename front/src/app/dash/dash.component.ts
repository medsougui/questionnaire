import { Component} from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  active :number=0;
  total: number = 0;
  winners:number= 0;
  ques: any[] = [];
  quests: any[] = [];
  inq: any[] = [];
  randnum!:number;
  quest!:string;
  tabquests: any[] = [];
  ngOnInit(): void {
    setTimeout(() => {
      this.fetchQuestions()
      this.fetchq()
      this.fetchqq()
      setTimeout(() => {
        this.randnum=Math.floor(Math.random() * this.inq.length);
        for (let i = 0; i < this.quests.length; i++) {
          if(this.inq[this.randnum].idq==this.quests[i].id){
            this.quest=this.quests[i].questions;
          }
          if(this.quests[i].inuse)
          {this.active++}
        }
        this.fetchqqq()
      }, 100);
      setTimeout(() => {
        console.log(this.tabquests)
      }, 200);
      
    }, 200);
    
  }
  get winnersPercentage(): number {
    return (this.winners / this.total);
  }
  fetchQuestions(): void {
    fetch('http://localhost:3000/quest')
      .then(response => response.json())
      .then(data => {
        this.quests = data;
      });
  }
  fetchq(): void {
    fetch('http://localhost:3000/questionnaire')
      .then(response => response.json())
      .then(data => {
        this.ques= data;
      });
  }
  fetchqq(): void {
    fetch('http://localhost:3000/questused')
      .then(response => response.json())
      .then(data => {
        this.inq= data;
      });
  }
  fetchqqq(): void {
    fetch('http://localhost:3000/selectquestu',{
      method:"put",
      body: JSON.stringify({'id':this.inq[this.randnum].idq}),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
      .then(data => {
        this.tabquests = data;
        this.total=data.length
        for (let i = 0; i < data.length; i++) {
          if(data[i].correct){
            this.winners++
          }
          
        }
      });
}
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
}
