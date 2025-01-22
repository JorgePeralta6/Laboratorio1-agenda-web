document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const select = document.getElementById("priority-select");
    const list = document.getElementById("todo-list");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    renderTodos();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoText = input.value.trim();
      const priority = select.value;
      if (todoText !== "") {
        const todo = {
          text: todoText,
          priority: priority,
        };
        todos.push(todo);
        saveTodos();
        renderTodos();
        input.value = "";
      }
    });

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
      list.innerHTML = "";
      const priorityOrder = ["Alta Prioridad", "Prioridad Normal", "Baja Prioridad"];
      todos.sort(
        (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );

      todos.forEach((todo, index) => {
        const li = document.createElement("li");

        const todoText = document.createElement("span");
        todoText.textContent = `${todo.text} - Prioridad: ${todo.priority}`;
        li.appendChild(todoText);

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("editar-boton");
        editButton.addEventListener("click", function () {
          const editTextInput = document.createElement("input");
          editTextInput.type = "text";
          editTextInput.value = todo.text;

          const editPrioritySelect = document.createElement("select");
          const options = ["Alta Prioridad", "Prioridad Normal", "Baja Prioridad"];
          options.forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            if (todo.priority === optionValue) {
              option.selected = true;
            }
            editPrioritySelect.appendChild(option);
          });

          li.innerHTML = "";
          li.appendChild(editTextInput);
          li.appendChild(editPrioritySelect);

          const confirmButton = document.createElement("button");
          confirmButton.textContent = "Confirmar";
          confirmButton.classList.add("confirmar-boton");
          confirmButton.addEventListener("click", function () {
            todo.text = editTextInput.value.trim();
            todo.priority = editPrioritySelect.value;
            saveTodos();
            renderTodos();
          });

          const cancelButton = document.createElement("button");
          cancelButton.textContent = "Cancelar";
          cancelButton.classList.add("cancelar-boton");
          cancelButton.addEventListener("click", function () {
            renderTodos();
          });

          li.appendChild(confirmButton);
          li.appendChild(cancelButton);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("button-delete");
        deleteButton.addEventListener("click", function () {
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
      });
    }
  });