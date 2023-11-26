import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'recapProject';
  show:boolean = false;

  constructor(private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/register' || event['url'] == '/profile' || event['url'] == '/cards'){
            this.show = false;
          } else {
            this.show = true;
          }
        }
      });
    }
}
