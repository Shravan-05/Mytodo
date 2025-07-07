let container = document.getElementById('container')
    let edit = document.getElementsByClassName('edit')[0];
    let topinput = document.getElementById('maininput');
    let add = document.getElementById('add');
    let remove = document.getElementsByClassName('delete')[0];


    window.addEventListener('load', () => {
      let mytodoarray = JSON.parse(localStorage.getItem('todos')) || [];
      let value = mytodoarray.forEach(text => {
        creataetodo(text);
      });
    });

function todoedit(mytodoinput, oldtext, edit) {
  edit.addEventListener('click', () => {
    if (mytodoinput.value == '') {
      alert('todo cant be empty');
      return;  // stop further execution
    }

    if (edit.textContent == 'edit') {
      mytodoinput.removeAttribute('readonly');
      mytodoinput.focus();
      edit.textContent = 'save';
    } else {
      edit.textContent = 'edit';
      let mytodoarray = JSON.parse(localStorage.getItem('todos')) || [];
      mytodoarray = mytodoarray.map((e) => oldtext == e ? mytodoinput.value : e);
      localStorage.setItem('todos', JSON.stringify(mytodoarray));
      mytodoinput.setAttribute('readonly', true);  
      oldtext = mytodoinput.value;  
    }
  });
}

    add.addEventListener('click', () => {
      if (topinput.value == '') {
        alert('fill the inputbox');
      }
      else {
        let value = topinput.value;
        creataetodo(value);
        savetostoarge(value);
        topinput.value='';
      }

    });
    function creataetodo(text) {
      let todos = document.createElement('div');
      todos.className = 'todos';
      todos.innerHTML = `  <input type="text" class="content" readonly>
      <div class="buttons">
      <button class="delete">-</button>
      <button class="edit">edit</button>`;
      container.append(todos);
      let mytodoinput = todos.querySelector('.content');
      let edit = todos.querySelector('.edit');

      mytodoinput.value = text;
      deletetodo(text, todos);
      todoedit(mytodoinput, text, edit)

    }
    function savetostoarge(text) {
      let mytodoarray = JSON.parse(localStorage.getItem('todos')) || [];
      mytodoarray.push(text);
      localStorage.setItem('todos', JSON.stringify(mytodoarray));
    }
    function deletetodo(text, todos) {
      let del = todos.querySelector('.delete');
      del.addEventListener('click', () => {
        todos.remove();
        let mytodoarray = JSON.parse(localStorage.getItem('todos')) || [];
        mytodoarray = mytodoarray.filter((e) => { return e != text });
        localStorage.setItem('todos', JSON.stringify(mytodoarray));

      })
    }
