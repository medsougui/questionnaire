import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  x=0
  ngOnInit(): void {
    localStorage.setItem('user', '');
    document.addEventListener('keydown', (event) => {
      const keyCombination = event.key.toLowerCase();
      if (event.ctrlKey && event.altKey && keyCombination === '2') {
        document.addEventListener('keydown', (event) => {
          if (event.key.toLowerCase() === '0') {
            document.addEventListener('keydown', (event) => {
              if (event.key.toLowerCase() === '0') {
                document.addEventListener('keydown', (event) => {
                  if (event.key.toLowerCase() === '3') {
                    this.router.navigate(['/login']);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  mat: string = '';
  emps: any[] = [];
  nom: string = '';
  cin: string = '';
  constructor (private router:Router){

  }
  login() {
    this.fetchemp()
    let c=false
    if (this.nom.trim() !== '' && this.mat.trim()!== '' ) {
      if (/^\d{8}$/.test(this.cin)) {
        setTimeout(() => {
          for (let i = 0; i < this.emps.length; i++) {
            const n=this.emps[i].name.trim()
            if(this.cin == this.emps[i].cin && this.nom==n &&this.mat==this.emps[i].mat){
              c=true
              this.router.navigate(['/answer',{ nom: this.nom ,id:this.emps[i].id}]);
            }        
          }
          if(!c)
              {alert("your identity or your mat or your name are incorrect")}
        }, 100);
          
      } else {
        alert('CIN must be 8 numbers');
      }
    } else {
      alert('Please fill in all fields');
    }
  }
  fetchemp(): void {
    fetch('http://localhost:3000/emp')
      .then(response => response.json())
      .then(data => {
        this.emps = data;
      });
  }
  }
