# NG-Workshop - Oefening
####[Github](https://github.com/dietergoetelen/ng-workshop)
####[Slides](https://slides.com/dietergoetelen/deck/edit)

## 1. TodoService uitbreiden
Als dataservice laag maken we gebruik van local storage. Local storage is in principe synchroon, toch is het interessant om asynchroon te werk te gaan. Als er in de toekomst beslist wordt om local storage te vervangen met een database hoeven we niet heel de applicatie te herschrijven. We maken gebruik van `$q`, een promise library om asynchroon te werk te gaan. 

```javascript
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
```javascript
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
```javascript
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
```html
<body ng-controller="TodoController as vm">
  <pre>{{ vm.todo | json }}</pre>
  ...
</body>
```
**Tip: Via de `<pre>` tag en de `| json` filter kunnen we de data mooi weergeven op het scherm**

Vervolgens kunnen we itereren over het items object via `ng-repeat`.

```html
<div class="list-group-item" ng-repeat="item in vm.todo.items | filter:vm.filter">
	<div class="checkbox">
		<label><input ng-model="item.isCompleted" type="checkbox">{{ item.name }}</label>
	</div>
</div>
```

## 4. Let's add a new todo!
De HTML is al voorzien
```html
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

```javascript
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
Deze applicatie wordt een offline applicatie. We maken hiervoor gebruik van localStorage.
De service hiervoor is al geschreven en kan je als volgt injecteren in de todoService:

```javascript
TodoService.$inject = ['LocalStorageService', '$q'];
function TodoService(localStorageService, $q) {
    
}
```

De localstorage service heeft 2 functies:
```javascript
getItem(key); 
setItem(key, data);
```

Data wordt opgeslagen in localstorage door een key mee te geven. 
Via deze key kan je vervolgens de storage uitlezen. 
Indien er nog niets in localstorage zit wordt er een leeg object teruggestuurd `{}`.

De functie `getTodoItems` kunnen we dus als volgt aanpassen zodat deze gebruik maakt van localStorage:
```javascript
function TodoService(localStorageService, $q) {
    var STORAGE_KEY = "TODO_ITEMS";
    
    ... SNIP ...
    
    vm.getTodoItems = getTodoItems;
    
    function getTodoItems() {
        var deferred = $q.defer();
        
        var todo = localStorageService.getItem(STORAGE_KEY);
        
        if (!todo.items) {
            todo.items = [];
        }
        
        deferred.resolve(todo);
        
        return deferred.promise;
    }
}
```

In de controller roepen we de `addTodoItem`functie op maar is nog niet geïmplementeerd.
Als implementatie halen we eerst alle todo items op, vervolgens voegen we de nieuwe todoItem toe aan deze array en saven we deze data opnieuw op in localstorage. 

```javascript
    ... SNIP ...
    vm.addTodoItem = addTodoItem;
    
    function addTodoItem(todoItem) {
        return vm.getTodoItems().then(function (result) {
            todoItem.id = result.items.length + 1;
            todoItem.isCompleted = !!todoItem.isCompleted;
				
            result.items.push(todoItem);
				
            localStorageService.setItem(STORAGE_KEY, result);
            
            return todoItem;
        });
    }
    ... SNIP ...
```

In deze functie zorgen we ervoor dat het `id` uniek is en dat `isCompleted` true of false bevat. 
Om er zeker van te zijn dat `isCompleted` een boolean is, maken we gebruik van twee uitroeptekens. 

```javascript
    ! undefined; // result = true
    !! undefined; // result = false;
    !! true; // result = true;
```

**Btw: this is why I love JavaScript :-)**

Ondertussen kunnen we items toevoegen en verwijderen. Op naar de implementatie van de filter!

## 6. Filter data
De filter is al toegevoegd aan de `ng-repeat`. We moeten deze enkel nog de juiste waarde meegeven. 
Dit kan heel eenvoudig door de `isCompleted` property van de filter op true of false te zetten. 
Als er geklikt wordt op `alle` dan moet de filter gecleared worden.

```html
ng-click="vm.filter = undefined"
ng-click="vm.filter.isCompleted = true"
ng-click="vm.filter.isCompleted = false" 
```

Via ng-class kunnen we de buttons actief maken door de bootstrap klasse `btn-primary` te gebruiken.
```html
<button ng-click="vm.filter = undefined" ng-class="{'btn-primary': !vm.filter }" class="btn btn-default">Alle</button>
<button ng-click="vm.filter.isCompleted = false" ng-class="{'btn-primary': vm.filter.isCompleted === false}" class="btn btn-default">Todo</button>
<button ng-click="vm.filter.isCompleted = true" ng-class="{'btn-primary': vm.filter.isCompleted === true}" class="btn btn-default">Completed</button>
```

## 7. Update data!
Als laatste stap moeten we nog data kunnen aanpassen. 
We kunnen een `ng-click` toevoegen op de checkbox. We geven het model mee door als parameter zodat we deze vanuit onze controller kunnen doorgeven aan de service. 

```html
<input ng-click="vm.updateTodo(item)" type="checkbox" ng-model="item.isCompleted"> Completed?
```

De implementatie in de controller is zéér eenvoudig, we geen het aangepaste todoItem door naar de service

```javascript
function updateTodo(todoItem) {
    return todoService.updateTodoItem(todoItem).then(function (item) {
        console.log('item updated', item);
        
        return item;
    });
}
```

Zoals je ziet, door gebruik te maken van promises kunnen we functies gaan chainen via `.then`. 
Een ander voordeel van promises is dat je `callback hell` kan vermijden. 

```javascript
// Van dit
functionA(function(resultA) {
    functionB(resultA, function (resultB) {
        functionC(resultB, function (resultC) {
            // doe iets met resultC
        });
    });
});

// Naar dit
functionA()
    .then(functionB)
    .then(functionC)
    .then(function(resultC) {
        // Doe iets met resultC
    });
```

De implementatie van de service is bijvoorbeeld als volgt.

```javascript
vm.updateTodoItem = updateTodoItem;

function updateTodoItem(todoItem) {
    return vm.getTodoItems().then(function (result) {
        angular.forEach(result.items, function (item) {
            if (todoItem.id === item.id) {
                // Angular extend vervangt alle properties met nieuwe properties vanop todoItem
                angular.extend(item, todoItem);
            }
        });

        localStorageService.setItem(STORAGE_KEY, result);

        return todoItem;
    });
}
```