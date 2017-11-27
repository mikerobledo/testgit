import { inject } from 'aurelia-framework';
import { Todos } from '../resources/data/todos';
import { AuthService } from 'aurelia-auth';

@inject( Todos, AuthService )
export class List {

	constructor(todos, auth){
		this.todos = todos;
		this.auth = auth;

		this.user = JSON.parse(sessionStorage.getItem('user'));
		this. showList = true;
	}

	async activate(){
		await this.todos.getUserTodos(this.user._id);
	}
