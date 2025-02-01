import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questdet',
  templateUrl: './questdet.component.html',
  styleUrls: ['./questdet.component.css']
})
export class QuestdetComponent {
  reps:any[]=[];
  quests:any[]=[];
  Id: string | undefined;
  x!:'1';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
    });
    this.fetchQuestions()
    this.fetchdet()
    
    setTimeout(() => {
      console.log(this.quests)
      console.log(this.reps)
    }, 1000);
    
  }
  fetchdet(): void {
    fetch('http://localhost:3000/det',{
      method:"put",
      body: JSON.stringify({'id':this.Id}),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
      .then(data => {
        this.reps = data;
      });
  }
  fetchQuestions(): void {
    fetch('http://localhost:3000/quest')
      .then(response => response.json())
      .then(data => {
        this.quests = data;
      });
  }

}
