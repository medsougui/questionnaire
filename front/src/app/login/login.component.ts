import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emps:any[]=[];
  admins: any[] = [];
  mail: string = '';
  pwd: string = '';
  cin:string='';
  
  ngOnInit(): void {
    localStorage.setItem('user', '');
  }
  constructor (private router:Router){}
  verif() {
    this.fetchadmin()
    let c=false;
    setTimeout(() => {
      if (this.mail.trim() !== '' && this.pwd.trim() !== '') {
        
        if (this.isValidEmail(this.mail.trim())) {
            
            for (let i = 0; i < this.admins.length; i++) {
              if(this.admins[i].email.trim().toString()===this.mail && this.admins[i].psw.trim().toString()===this.pwd){
                c=true
                this.cin=this.admins[i].empid
              }          
            }
            if(c){
              localStorage.setItem('user', this.cin);
              this.router.navigate(['dash']);
            
            setTimeout(() => {
                window.location.reload();
            }, 10);
        } else {
          alert("your email or password are incorrect")
            }
           

        } 
        else{alert('Invalid email format');}
    } else {
      alert('Email and password cannot be empty');
    }
    }, 200);
}

isValidEmail(email: string) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

  fetchadmin(): void {
    fetch('http://localhost:3000/admin')
      .then(response => response.json())
      .then(data => {
        this.admins = data;
      });
  }
  fetchemp(): void {
    fetch('http://localhost:3000/emp')
      .then(response => response.json())
      .then(data => {
        this.emps = data;
      });
  }
 


}
