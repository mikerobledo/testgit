import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class List {
  constructor(router) {
	  this.router = router;
    this.message = 'List';
  }

  logout(){
    sessionStorage.removeItem('home');
    this.auth.logout();
}

createTodo(){	
  this.todoObj = {
    todo: "",
    description: "",
    dateDue: new Date(),
     userId: this.user._id,
    priority: this.priorities[0]
  }
  this.showList = false;		
}


}
