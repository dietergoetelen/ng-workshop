# NG-Workshop - Oefening

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
