
const urlfood = 'http://localhost:3000/food';
const urldrink = 'http://localhost:3000/drink';
let id = ' ';
const addModalForm = document.querySelector('.form-product');
const editModalForm = document.querySelector('#edit_roduct .form-product');


function renderFood(food) {
  const tableFood = document.querySelector('#tbl');
  const output = `<tr data-id='${food.id}'>
    <td>${food.name}</td>
    <td>
      <img src="${food.image}" style="width: 70px; height: 70px;">
    </td>
    <td>${food.price}</td>
    <td>${food.quantity}</td>
    <td><span>${food.detail}</span></td>
    <td><button class='edit-btn' (${food.id})>Edit</button></td>
    <td><button class='delete-btn' ${food.id}>Delete</button></td>
  </tr>`;
  tableFood.insertAdjacentHTML('beforeend', output);
  // deletefood
  const btlDelFood = document.querySelector(`[data-id ='${food.id}'] .delete-btn`);
  btlDelFood.addEventListener('click', (e) => {
    fetch(`${urlfood}/${food.id}`, {
      method: 'Delete',
    })
      .then(res => res.json())
      .then(() => location.reload());
  })
  // editfood
  const btnEditFood = document.querySelector(`[data-id ='${food.id}'] .edit-btn`);

  btnEditFood.addEventListener('click', (e) => {
    e.preventDefault();
    $("#edit_roduct").modal('show');
    id = food.id;
    editModalForm.name.value = food.name;
    editModalForm.price.value = food.price;
    editModalForm.quantity.value = food.quantity;
    editModalForm.detail.value = food.detail;
  })

}

function Food() {
  const tableFood = document.querySelector('#tbl');
  tableFood.innerHTML = ''; // Xóa nội dung bảng trước khi thêm dữ liệu mới
  fetch(urlfood)
    .then(res => res.json())
    .then(data => {
      data.forEach(food => {
        renderFood(food);
      });
    });


  editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${urlfood}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editModalForm.name.value,
        price: editModalForm.price.value,
        quantity: editModalForm.quantity.value,
        detail: editModalForm.detail.value,
      })
    })
      .then(res => res.json())
      .then(() => location.reload())
    editModalForm.name.value = '';
    editModalForm.price.value = '';
    editModalForm.quantity.value = '';
    editModalForm.detail.value = '';

  })
  
}

function renderDrink(drink) {
  const tableDrink = document.querySelector('#tbl');
  const output = `<tr data-id='${drink.id}'>
    <td>${drink.name}</td>
    <td>
      <img src="${drink.image}" style="width: 70px; height: 70px;">
    </td>
    <td>${drink.price}</td>
    <td>${drink.quantity}</td>
    <td><span>${drink.detail}</span></td>
    <td><button class='edit-btn' ${drink.id}>Edit</button></td>
    <td><button class='delete-btn'${drink.id}>Delete</button></td>
  </tr>`;
  tableDrink.insertAdjacentHTML('beforeend', output);
  // delete drink
  const btlDelDrink = document.querySelector(`[data-id ='${drink.id}'] .delete-btn`);
  btlDelDrink.addEventListener('click', (e) => {
    fetch(`${urldrink}/${drink.id}`, {
      method: 'Delete',
    })
      .then(res => res.json())
      .then(() => location.reload());
  })
  //edit drink
  const btnEditDrink = document.querySelector(`[data-id ='${drink.id}'] .edit-btn`);
  btnEditDrink.addEventListener('click', (e) => {
    e.preventDefault();
    $("#edit_roduct").modal('show');
    id = drink.id;
    editModalForm.name.value = drink.name;
    editModalForm.price.value = drink.price;
    editModalForm.quantity.value = drink.quantity;
    editModalForm.detail.value = drink.detail;

  })


}
function Drink() {
  const tableDrink = document.querySelector('#tbl');
  tableDrink.innerHTML = ''; // Xóa nội dung bảng trước khi thêm dữ liệu mới
  fetch(urldrink)
    .then(res => res.json())
    .then(data => {
      data.forEach(drink => {
        renderDrink(drink);
      });
    });

  editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${urldrink}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editModalForm.name.value,
        price: editModalForm.price.value,
        quantity: editModalForm.quantity.value,
        detail: editModalForm.detail.value,
      })
    })
      .then(res => res.json())
      .then(() => location.reload())
    editModalForm.name.value = '';
    editModalForm.price.value = '';
    editModalForm.quantity.value = '';
    editModalForm.detail.value = '';

  })

}

addModalForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const productType = document.querySelector('input[name="product"]:checked').value;

  let url = '';
  if (productType === 'food') {
      url = urlfood;
  } else if (productType === 'drink') {
      url = urldrink;
  }

  fetch(url,{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: addModalForm.name.value,
          img: addModalForm.img.value, 
          price: addModalForm.price.value,
          quantity: addModalForm.quantity.value,
          detail: addModalForm.detail.value,      
      })
  })
  .then(res => res.json())
  .then(data=>{
      const dataArr=[];
      dataArr.push(data);
      renderUsers(dataArr);
  })
  .catch(error => console.error('Error:', error));

  // Reset form fields
  addModalForm.name.value = '';
  addModalForm.img.value = '';
  addModalForm.price.value = '';
  addModalForm.quantity.value = '';
  addModalForm.detail.value = '';
});


function displayAllProducts() {
  const tableFood = document.querySelector('#tbl');
  tableFood.innerHTML = '';
  Food(); // Hiển thị danh sách sản phẩm thức ăn
  Drink(); // Hiển thị danh sách sản phẩm đồ uống

}