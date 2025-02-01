import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  ngOnInit() {
    
      }
  user: string = localStorage.getItem('user') || '';
  constructor() {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', '');
  }}
  title = 'front';
}
