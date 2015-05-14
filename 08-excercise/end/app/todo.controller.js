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
		
	TodoController.$inject = ['LocalStorageService'];
	function TodoController(localStorageService) {
		var STORAGE_KEY = "TODO_ITEMS";
		
		var vm = this;
		
		// Initialize the application :-)
		initialize();
		
		function initialize() {
			vm.todo = localStorageService.getItem(STORAGE_KEY);
		}
	}
	
	
}());