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
     * interface ITodoController {
     *  addTodo(todoItem:ITodo);
     *  updateTodo(todoItem:ITodo);
     *  initialize();
     * }
     */
	
    function TodoController() {
        var vm = this;
        
        vm.addTodo = addTodo;
        
        function addTodo(todoItem) {
            // Call the todoservice
            
            // Clear formdata
            
        }
    }
    
    angular.module('app').controller('TodoController', TodoController);
    
}());