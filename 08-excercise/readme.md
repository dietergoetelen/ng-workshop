# NG-Workshop - Oefening
####[Github](https://github.com/dietergoetelen/ng-workshop)
####[Slides](https://slides.com/dietergoetelen/deck/edit)

## 1. TodoService uitbreiden
Als dataservice laag maken we gebruik van local storage. Local storage is in principe synchroon, toch is het interessant om asynchroon te werk te gaan. We maken gebruik van `$q`, een promise library om asynchroon te werk te gaan. 

```
function getHelloWorldAsync() {
    var deferred = $q.defer();
    deferred.resolve('Hello World');
    return deferred.promise;
}

getHelloWorldAsync().then(function (helloWorld) {
    alert(helloWorld);
});
```

De eerste functie die we uitschrijven is de functie `getTodoItems`.
Open het bestand `todo.service.js` en vul aan met onderstaande code.
Voorlopig maken we nog geen gebruik van de LocalStorageService.
```
function TodoService($q) {
    ... SNIP ...
    
    vm.getTodoItems = getTodoItems; // use a pointer to the function getTodoItems, do not use inline functions
    
    function getTodoItems() {
        var deferred = $q.defer();
        
        var todo = {
            items: [
                {
                    id: 1,
                    name: 'Some Todo Item',
                    isCompleted: false
                }
            ]
        };
        
        deferred.resolve(todo);
        
        return deferred.promise;
    }
}
```

## 2. TodoController uitbreiden
Via de service kunnen we nu de todoItems gaan ophalen. Dit zou moeten uitgevoerd worden als de applicatie opstart. 
```
TodoController.$inject = ['TodoService']; // Uppercase - class
function TodoController(todoService) { // Lowercase - instance
    ... SNIP ...
    var vm = this;
    
    function initialize() {
        return todoService.getTodoItems().then(function (result) {
            vm.todo = result;
        });
    }
}
```
Het resultaat zetten we op de property `todo`. Deze property kunnen we benaderen vanuit onze view. 

## 3. View uitbreiden
Als eerste moeten we een instantie maken van onze controller om mee te werken. 
```
<body ng-controller="TodoController as vm">
  <pre>{{ vm.todo | json }}</pre>
  ...
</body>
```
**Tip: Via de `<pre>` tag en de `| json` filter kunnen we de data mooi weergeven op het scherm**

Vervolgens kunnen we itereren over het items object via `ng-repeat`.

```
<div class="list-group-item" ng-repeat="item in vm.todo.items | filter:vm.filter">
	<div class="checkbox">
		<label><input ng-model="item.isCompleted" type="checkbox">{{ item.name }}</label>
	</div>
</div>
```

## 4. Let's add a new todo!
De HTML is al voorzien
```
<form class="form" ng-submit="vm.addTodo(vm.formData)">
	<div class="form-group">
		<label>Name</label>
		<input type="text" class="form-control" ng-model="vm.formData.name">
	</div>
	
	<div class="checkbox">
		<label>
			<input type="checkbox" ng-model="vm.formData.isCompleted"> Completed?
		</label>
	</div>
	
	<div class="form-group">
        <!-- will call ng-submit -->
		<button class="btn btn-primary">
			Save
		</button>
	</div>
</form>
```

Als men op de `Save` knop duwt, wordt de `ng-submit` functie opgeroepen. Deze functie krijgt het model binnen en kunnen we als volgt implementeren.

```
function TodoController(todoService) {
   ... SNIP ...
   vm.addTodo = addTodo;
   
   function addTodo(todoItem) {
    todoService.addTodoItem(todoItem).then(function (item) {
        // Add it to our local array
        vm.todo.items.push(angular.copy(item));
        
        // Clear the formData
        vm.formData = {};
    });
   }
}
```

## 5. Service verder uitbreiden
