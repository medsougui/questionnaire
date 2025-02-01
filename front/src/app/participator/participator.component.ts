import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participator',
  templateUrl: './participator.component.html',
  styleUrls: ['./participator.component.css']
})
export class ParticipatorComponent implements OnInit {
  year: string = '';
  month: string = '';
  day: string = '';
  datap: any[] = [];
  data: any[] = [];
  emps: any[] = [];
  ques: any[] = [];
  s!: string;
  by: string = 'name';
  page: number = 1;

  ngOnInit(): void {
    this.createdata();
  }

  fetchemp(): void {
    fetch('http://localhost:3000/emp')
      .then(response => response.json())
      .then(data => {
        this.emps = data;
      });
  }

  fetchq(): void {
    fetch('http://localhost:3000/questionnaire')
      .then(response => response.json())
      .then(data => {
        this.ques = data;
      });
  }

  createdata() {
    this.fetchq();
    this.fetchemp();

    setTimeout(() => {
      this.ques.forEach(q => {
        this.emps.forEach(emp => {
          if (emp.id == q.userid) {
            this.datap.push({
              mat: emp.mat,
              name: emp.name,
              score: q.score,
              num: q.numquest,
              date: q.date
            });
          }
        });
      });
      this.data = [...this.datap]; // Initialize data with datap
    }, 100);
  }

  search(name: string) {
    this.data = this.datap;
    if (this.by != 'date') {
      setTimeout(() => {
        this.data = this.data.filter(d => d[this.by].toString().toLowerCase().includes(name.toLowerCase()));
      }, 40);
    } else {
      if (this.year != '') {
        setTimeout(() => {
          this.data = this.data.filter(d => d.date.substring(0, 4).toString().toLowerCase().includes(this.year.toString().toLowerCase()));
        }, 40);
      }
      if (this.month != '') {
        setTimeout(() => {
          this.data = this.data.filter(d => d.date.substring(5, 7).toString().toLowerCase().includes(this.month.toString().toLowerCase()));
        }, 40);
      }
      setTimeout(() => {
        this.data = this.data.filter(d => d.date.substring(8, 10).toString().toLowerCase().includes(this.day.toString().toLowerCase()));
      }, 40);
    }
  }
}
