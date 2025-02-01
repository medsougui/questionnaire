import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  dis: { [key: number]: boolean } = {};
  isChecked: boolean = false;
  quests: any[] = [];
  questq = this.quests;
  s!: string;
  by: string = 'questions';
  page: number = 1;

  ngOnInit(): void {
    this.fetchQuestions();
    setTimeout(() => {
      this.questq = this.quests;
    }, 70);
  }

  fetchQuestions(): void {
    fetch('http://localhost:3000/quest')
      .then(response => response.json())
      .then(data => {
        this.quests = data;
      });
  }

  delete(id: number) {
    fetch("http://localhost:3000/Delete-quest", {
      method: "delete",
      body: JSON.stringify({ 'id': id }),
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }

  search(name: string) {
    this.questq = this.quests;
    setTimeout(() => {
      this.questq = this.questq.filter(quest => quest[this.by].toString().toLowerCase().includes(name.toLowerCase()));
    }, 40);
  }

  changeWithCooldown(id: string) {
    if (!this.dis[id]) {
      this.change(id);
      this.dis[id] = true;
      setTimeout(() => {
        this.dis[id] = false;
      }, 1000);
    }
  }

  change(id: string) {
    let checkboxes = document.getElementsByName('cc') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      if (checkbox.id == id) {
        console.log(checkbox.id);
        console.log(checkbox.checked)
        fetch("http://localhost:3000/quest-upd", {
          method: "put",
          body: JSON.stringify({ 'id': id, "t": checkbox.checked }),
          headers: { "Content-Type": "application/json" }
        }).then((response) => response.json())
          .then((json) => console.log(json));
      }
    });
  }

  det() {
    Router
  }
}
