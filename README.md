# todo-app

A simple to-do app built using HTML, CSS and HTML.

As the project loads it reads existing tasks from ``` allTasks ``` local storage key.
```
allTasks: [{content: string, id: Date.now(), isCompleted: boolean}]
```
``` initTasksList ``` function gets called on the initialisation. It appends a checkbox, label and span (delete button) with the data present in  ``` allTasks ```

``` addTask ``` function takes the input value, adds it to the ``` allTasks ```, clears the rendered list and calls ``` initTasksList ``` to render the list with the latest data.

The app can be tested at  [localhost](http://127.0.0.1:5500/todo.html)
