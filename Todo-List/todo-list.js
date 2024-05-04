const todoList = [];

renderTodoList();

function renderTodoList(){
  let todolistHTML = ''

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject
    const html = 
    `<div>${name}</div> 
    <div>${dueDate}</div>
    <button class="delete-todo-button">Delete</button>`;
    todolistHTML += html;
  });

  document.querySelector('.todo-list').innerHTML = todolistHTML;

  document.querySelectorAll('.delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index,1); 
      renderTodoList();
    })
  });
}

document.querySelector('.add-button').addEventListener('click', () => {
  addTodo();
});

function addTodo(){
  const inputElement = document.querySelector('.input-taskname');
  const name = inputElement.value;
  const dateinputElement = document.querySelector('.input-dueDate');
  const dueDate = dateinputElement.value;
  
  todoList.push({name, dueDate});

  inputElement.value = '';

  renderTodoList();
}