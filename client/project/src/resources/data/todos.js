import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class ToDos {
  constructor(data) {
    this.data = data;
    this.TODO_SERVICE = 'todos';
    this.todosArray = [];
  }

  async save(todo) {
    if (todo) {
      if (!todo._id) {
        let serverResponse = await this.data.post(todo, this.TODO_SERVICE);
        if (!serverResponse.error) {
          this.todosArray.push(serverResponse);
        }
        return serverResponse;
      } else {
                    let servrResponse = await this.data.put(todo, this.TODOS_SERVICE + "/" + todo._id);
                    if(!serverResponse.error){
                        // this.updateArray(response);
                    }
                    return servrResponse;
                }
            }
      }        



  async deleteTodo(id) {
    let response = await this.data.delete(this.TODO_SERVICE + "/" + id);
    if (!response.error) {
      for (let i = 0; i < this.todosArray.length; i++) {
        if (this.todosArray[i]._id === id) {
          this.todosArray.splice(i, 1);
        }
      }
    }
  }

  async getUserTodos(id) {
    let response = await this.data.get(this.TODO_SERVICE + "/" + id);
    if (!response.error && !response.message) {
      this.todosArray = response;
    }
  }
  async uploadFile(files, userId, todoId) {
    let formData = new FormData();
    
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.TODO_SERVICE + "/upload/" + userId + "/" + todoId);
    return response;
  }
}