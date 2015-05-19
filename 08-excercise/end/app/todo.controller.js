(function () {
	'use strict';
	
	/**
	 * interface ITodo {
	 * 	id:number;
	 * 	name:string;
	 * 	isCompleted:boolean;
	 * }
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
                
                // Clear form data
			    vm.formData = {};
			});
		}
		
		function initialize() {
			return todoService.getTodoItems().then(function (result) {
				vm.todo = result;
			});
		}
	}
	
	
}());