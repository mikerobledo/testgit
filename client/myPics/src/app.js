import {AuthorizeStep} from 'aurelia-auth';


export class App {
  selectedFiles;
  
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);    
    config.map([
      { 
	route: ['', 'home'],
	 moduleId: './modules/home',
	 name: 'Home' 
      },
      {
	 route: 'list',
	 moduleId: './modules/list',
   name: 'List',
   auth: true 
     }
    ]);
  }
}
