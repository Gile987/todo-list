// declare constants/variables
const form = document.querySelector('#form');
const itemInput = document.querySelector('.item-input');
const itemList = document.querySelector('.item-list');
const alert = document.querySelector('.alert');
const clearList = document.querySelector('#clear-items');

let todoItems = [];

const handleItem = (itemName) => {
  const items = itemList.querySelectorAll('.item');

  items.forEach(item => {
    if (item.querySelector('.item-name').textContent === itemName) {
      // completed item event listener
      item.querySelector('.complete-item').addEventListener('click', () => {
        item.querySelector('.item-name').classList.toggle('completed');
        item.classList.toggle('visibility');
      });
      // delete item from list event listener
      item.querySelector('.delete-item').addEventListener('click', () => {
        itemList.removeChild(item);
        todoItems = todoItems.filter(item => {
          return item !== itemName;
        });
        // delete item from local storage
        setLocalStorage(todoItems);
      });
      // edit item event listener
      item.querySelector('.edit-item').addEventListener('click', () => {
        itemInput.value = itemName;
        itemList.removeChild(item);
        todoItems = todoItems.filter((item) => {
          return item !== itemName;
        });
      });
    };
  });
};

const setLocalStorage = todoItems => {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

const getLocalStorage = () => {
  const todoStorage = localStorage.getItem('todoItems');
  if (todoStorage === 'undefined' || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  };
};

// render the list items
const getList = todoItems => {
  itemList.innerHTML = '';
  todoItems.forEach(item => {
    // use beforeend parameter to insert items after last child
    itemList.insertAdjacentHTML('beforeend', `<div class="item"><h5 class="item-name">${item}</h5>
      <div class="item-icons"><a href="#" class="complete-item item-icon"><i class="fa fa-check-circle"></i>
      </a><a href="#" class="edit-item item-icon"><i class="fa fa-edit"></i></a>
      <a href="#" class="delete-item item-icon"><i class="fa fa-times-circle"></i></a></div></div>`);
    handleItem(item);
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const itemName = itemInput.value;
  // show a warning if no item name has been entered
  if (itemName.length === 0) {
    alert.innerHTML = 'You can\'t leave the field empty';
    alert.classList.add('display-alert', 'alert');
    setTimeout(() => {
      alert.classList.remove('display-alert');
    }, 3000);
    // push the item name into the array & save into local storage  
  } else {
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
  };
  itemInput.value = '';
});

// empty the todoItems array and clear local storage when clicking on the "clear items" button
clearList.addEventListener('click', () => {
  todoItems = [];
  localStorage.clear();
  getList(todoItems);
});

getLocalStorage();