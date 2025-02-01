import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  constructor(private router: Router) {}
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  nom!:string
  cin: string = localStorage.getItem('user')||'';
  emps:any[]=[]
  ngOnInit(){
    console.log(this.cin)
    this.getname()
  }
  logout() {
    localStorage.setItem('user', '');
    this.router.navigate(['']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
  fetchemp(): void {
    fetch('http://localhost:3000/emp')
      .then(response => response.json())
      .then(data => {
        this.emps = data;
      });
  }
  getname(){
    this.fetchemp()
    setTimeout(() => {
      this.emps.forEach(emp => {
        if(this.cin==emp.id)
        {
          this.nom=emp.name.trim()
        }
      });
    }, 100);
  }
}