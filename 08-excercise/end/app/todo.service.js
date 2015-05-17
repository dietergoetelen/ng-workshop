(function () {
	'use strict';
	
	angular.module('app')
		.service('TodoService', TodoService);
	
	TodoService.$inject = ['$q', 'LocalStorageService'];
	function TodoService($q, localStorageService) {
		var STORAGE_KEY = "TODO_ITEMS";
		var vm = this;
		
		vm.getTodoItems = getTodoItems;
		vm.addTodoItem = addTodoItem;
		vm.updateTodoItem = updateTodoItem;
				
		function getTodoItems() {
			var deferred = $q.defer();
			var todo = localStorageService.getItem(STORAGE_KEY);
			
			if (!todo.items) {
				todo.items = [];
			}
			
			deferred.resolve(todo);
			
			return deferred.promise;
		}

		function updateTodoItem(todoItem) {
			return vm.getTodoItems().then(function (result) {
				angular.forEach(result.items, function (item) {
					if (todoItem.id === item.id) {
						angular.extend(item, todoItem);
					}
				});
				
				localStorageService.setItem(STORAGE_KEY, result);
				
				return todoItem;
			});
		}

		function addTodoItem(todoItem) {
			return vm.getTodoItems().then(function (result) {
				todoItem.id = result.items.length + 1;
				todoItem.isCompleted = !!todoItem.isCompleted;
				
				result.items.push(todoItem);
				
				localStorageService.setItem(STORAGE_KEY, result);
				
				return todoItem;
			});
		}
	}
	
}());