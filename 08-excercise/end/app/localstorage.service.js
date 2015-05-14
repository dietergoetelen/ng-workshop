(function () {
	'use strict';
	
	angular.module('app')
		.service('LocalStorageService', LocalStorageService);
		
	function LocalStorageService() {
		var vm = this;
		
		vm.getItem = getItem;
		vm.setItem = setItem;
		
		function getItem(key) {
			 var item = window.localStorage.getItem(key);
			 
			 if (item) {
				 return JSON.parse(item);
			 }
			 
			 return {};
		}
		
		function setItem(key, data) {
			window.localStorage.setItem(key, JSON.stringify(data));
		}
	}
	
}());