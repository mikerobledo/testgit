import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class ToDos {
	constructor(data) {
        		this.data = data;
        		this.TODO_SERVICE = 'todos';
   		 }

async deleteTodo(id){
    let response = await this.data.delete(this.TODOS_SERVICE + "/" + id);
    if(!response.error){
        for(let i = 0; i < this.todosArray.length; i++){
            if(this.todosArray[i]._id === id){
                this.todosArray.splice(i,1);
            }
        }
    }
}




async save(todo){
        if(todo){
            if(!todo._id){
                let response = await this.data.post(todo, this.TODOS_SERVICE);
                if(!response.error){
                    this.todosArray.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(todo, this.TODOS_SERVICE + "/" + todo._id);
                if(!response.error){
                    // this.updateArray(response);
                }
                return response;
            }
        }
    }
}
