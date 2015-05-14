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
			angular.forEach(data.items, function (item) {
				item.$$hashKey = null;
				delete item.$$hashKey;
			});
			
			window.localStorage.setItem(key, JSON.stringify(data));
		}
	}
	
}());