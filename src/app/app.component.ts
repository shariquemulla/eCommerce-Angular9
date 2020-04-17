import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-ecommerce';
  val : String ="";

  ngOnInit(){

  //   const source = new EventSource('http://localhost:8080/MumbhaicharaWeb-Dev/users/auth/stream-sse');
  //   source.onopen = () => {
  //     console.log('on open');
  //   };
  //   source.onerror = () => {
  //     console.log('on error');
  //   };
  //   source.onmessage = (message) => {
  //     console.log(message);
  //     const n: Notification = JSON.parse(message.data);
  //     this.val=message.data;
  //     console.log(this.val)
  //   };
  }
}
