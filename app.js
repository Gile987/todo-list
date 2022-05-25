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
      item.querySelector('.complete-item').addEventListener('click', () => {
        item.querySelector('.item-name').classList.toggle('completed');
        item.classList.toggle('visibility');
      });

      item.querySelector('.delete-item').addEventListener('click', () => {
        itemList.removeChild(item);
        todoItems = todoItems.filter(item => {
          return item !== itemName;
        });
      });
    };
  });
};

const getList = todoItems => {
  itemList.innerHTML = '';
  todoItems.forEach(item => {
    itemList.insertAdjacentHTML('beforeend', `<div class="item"><h5 class="item-name">${item}</h5><div class="item-icons"><a href="#" class="complete-item item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);
    handleItem(item);
  });
};


form.addEventListener('submit', e => {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName.length === 0) {
    alert.innerHTML = 'You can\'t leave the field empty';
    alert.classList.add('display-alert', 'alert');
    setTimeout( () =>{
      alert.classList.remove('display-alert');
    }, 3000);
  } else {
    todoItems.push(itemName);
    getList(todoItems);
  };
  itemInput.value = '';
});

clearList.addEventListener('click', () => {
  todoItems = [];
  getList(todoItems);
})