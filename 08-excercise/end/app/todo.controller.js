(function () {
	'use strict';
	
	/**
	 * interface ITodo {
	 * 	id:number;
	 * 	name:string;
	 * 	isCompleted:boolean;
	 * }
	 */
	
	/**
	 * 1. Get the module
	 * 
	 * 2. Create a controller
	 * 
	 * 3. Inject LocalStorageService (see localstorage.service.js)
	 * 
	 * 4. Create a function initialize and get the items from localstorage
	 * 	4.1 Define a constant:
	 * 			var STORAGE_KEY = "TODO_ITEMS";
	 * 	    We'll use this key to save and get items from localStorage
	 *  4.2 create the function, call the localStorage method and save the result on your controller instance
	 * 		HINT: 'var vm = this;'
	 */
	angular.module('app')
		.controller('TodoController', TodoController);
		
	TodoController.$inject = ['TodoService', '$log'];
	function TodoController(todoService, $log) {
		
		var vm = this;
		
		vm.filter = undefined;
		vm.addTodo = addTodo;
		vm.updateTodo = updateTodo;
		
		// Initialize the application :-)
		initialize();

		function updateTodo(todoItem) {
			return todoService.updateTodoItem(todoItem).then(function (item) {
				$log.log('Item updated ;)', todoItem);
			});
		}
		
		function addTodo(todoItem) {
			return todoService.addTodoItem(todoItem).then(function(item) {
				vm.todo.items.push(angular.copy(item));
			})
			
			// Clear form data
			vm.formData = {};
		}
		
		function initialize() {
			return todoService.getTodoItems().then(function (result) {
				vm.todo = result;
			});
		}
	}
	
	
}());