(function () {
	'use strict';
	
    /**
     * interface ITodoService {
     *  getTodoItems():ng.IPromise<Array<ITodo>>;
     *  updateTodoItem(todoItem:ITodo):ng.IPromise<ITodo>;
     *  addTodoItem(todoItem:ITodo):ng.IPromise<ITodo>;
     * }
     */
    
    TodoService.$inject = ['$q'];
	function TodoService($q) {
        
        /**
         * //Example usage $q:
         * function getHelloWorldAsync() {
         *  var deferred = $q.defer();
         *  deferred.resolve('Hello World');
         *  return deferred.promise;
         * }
         * 
         * getHelloWorldAsync().then(function (helloWorld) {
         *  alert(helloWorld);
         * });
         */
        
        var STORAGE_KEY = "TODO_ITEMS";
        var vm = this;
        
        
    }
    
    angular.module('app').service('TodoService', TodoService);
    
    
}());