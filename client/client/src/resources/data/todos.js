import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class ToDos {
	constructor(data) {
        		this.data = data;
        		this.TODO_SERVICE = 'todos';
   		 }

async save(todo){
        if(todo){
            let serverResponse = await this.data.post(user, this.TODO_SERVICE);
            return serverResponse;
        }
    }
    

}

