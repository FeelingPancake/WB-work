let body = document.querySelector('body');
let listCard = document.querySelector('.basket-list');
let lackList = document.querySelector('.basket-lack');
let divDelivery = document.querySelector('.delivery__data-address');
let missing = document.querySelector('.basket__heading-lack');
let SummaryPrice = document.querySelector('.heading__summary');
let summaryInfo = document.querySelector('.summary__info');
let orderBtn = document.querySelector('.order-btn');

const currency = 'сом';

const products = [
	{
		id: 1,
		img: 't-shirt.png',
		name: 'Футболка UZcotton мужская',
		options: ['Цвет белый', 'Размер: 56'],
		owner: 'Коледино WB ',
		creator: 'OOO Вайлдберриз',
		price: 100,
		discount: 0,
		quantity: 2,
		lasts: 2,
	},
	{
		id: 2,
		img: 'cases.png',
		name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
		options: ['Цвет: прозрачный'],
		owner: 'Коледино WB ',
		creator: 'OOO Мегапрофстиль',
		price: 11500,
		discount: 10,
		quantity: 200,
		lasts: 200,
	},
	{
		id: 3,
		img: 'pencils.png',
		name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,Faber-Castell ',
		options: [''],
		owner: 'Коледино WB ',
		creator: 'OOO Вайлдберриз',
		price: 475,
		discount: 0,
		quantity: 2,
		lasts: 3,
	},
];

const delivery = [
	{
		id: 1,
		img: 'star.png',
		address: 'Бишкек, улица Ахматбека Суюмбаева, 12/1',
		rating: '4.99',
		options: 'Ежедневно с 10 до 21 ',
		price: 'Бесплатно',
	},
];

function reloadCard() {
	let listCard = document.querySelector('.basket-list');
	listCard.innerHTML = '';
	createCard();
}

function changeQuantity(key, id, lasts, newQuantity) {
	if (newQuantity === 0) {
		delete products[key];
	} else if (newQuantity > lasts) {
		document.querySelector('.btn__right').disable = true;

		document.querySelector(`.btn__${id}`).classList.add('btn-disabled');
	} else {
		products[key].quantity = newQuantity;
		reloadCard();
	}
}

function selects() {
	const checkboxes = document.querySelectorAll('.basket-card__checkbox');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = !checkbox.checked;
	});
}

function createSumPrice() {
	price = 0;
	products.forEach((value) => {
		const number =
			value.price * ((100 - value.discount) / 100) * value.quantity;
		price += number;
	});
	SummaryPrice.innerHTML = `
	${price}  <span class="basket-card__price-currency">${currency}</span> `;
}

function createCard() {
	products.forEach((value, key) => {
		const newLi = document.createElement('li');
		newLi.className = 'basket-card';
		newLi.innerHTML = `
		<div class="container">
      <input type="checkbox" id=${value.id} name="${
			value.id
		}" class="basket-card__checkbox" value="${value.quantity}">
      <img src="img/${value.img}" class="basket-card__img" />
      <div class="basket-card__product">
	  <div class="basket-card__price_isMobile">
      <div class="basket-card__price-real_isMobile">${
				value.price * ((100 - value.discount) / 100) * value.quantity
			} <span class="basket-card__price-currency">${currency}</span> 
		</div>
		<div class="basket-card__price-fake_isMobile"> <s>${
			value.price * value.quantity
		} сом</s>
	</div>		
      </div>  
      <div class="basket-card__name">${value.name}</div>
      <div class="basket-card__options">${value.options}</div>
      <div class="basket-card__owner">${value.owner}</div>
      <div class="basket-card__creator">
	  <div class="creator__name">${value.creator}</div>
	  <div class="tooltip"> 
	  <img class="creator__info"src="img/info.svg" alt="info-icon"/>
	  <div class="tooltip-text">
	  <h4 class="tooltip-text__heading">${value.creator}</h4>
	  <p class="tooltip-text__info">ОГРН: 5167746237148<p>
	  <p class="tooltip-text__address">129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34 </p>
	  </div>
	  </div>	
	  <div>
	  </div>
      </div>
	  </div>
	  </div>
	  <div  class="container">
      <div class="basket-card__center">
      <div class="basket-card__quantity">
        <button type="button" class="basket-card__btn btn__left 
				}" onclick="changeQuantity(${key},${value.id}, ${value.lasts}, ${
			value.quantity - 1
		})">-</button>
        <div class="basket-card__count">${value.quantity}</div> 
        <button  type="button"  id="${
					value.id
				}" class="basket-card__btn  btn__right btn__${
			value.id
		}" onclick="changeQuantity(${key}, ${value.id},
			${value.lasts}, ${value.quantity + 1})">+</button>
      </div>
	  <div class="basket-card__product-delete">
        Осталось ${value.lasts} шт.
	  </div>
      <div class="basket-card__icons">
      <span><img src="img/heart.svg" class="icons__heart"/></span> 
      <span><img src="img/delete.svg" class="icons__delete"/></span>
      </div>
      </div>
      <div class="basket-card__price">
      <div class="basket-card__price-real">${
				value.price * ((100 - value.discount) / 100) * value.quantity
			} <span class="basket-card__price-currency">${currency}</span> 
		</div>
		<div class="basket-card__price-fake"> 
		<div class="tooltip"> 
		<s>${value.price * value.quantity} сом</s>
		<div class="tooltip-text">
		<div class="tooltip-discount"> 
		<div class="tooltip-discount__percent"> Скидка ${value.discount}% </div>
		<div class="tooltip-discount__price"> -${
			value.price * (value.discount / 100)
		} сом </div>
		</div>
		</div>
		</div>	
		
	</div>		
      </div>  
      `;
		const last = newLi.querySelector('.basket-card__product-delete');
		if (value.lasts > 2) {
			last.style.display = 'none';
		}

		const discount = newLi.querySelector('.basket-card__price-fake');
		if (value.discount == 0) {
			discount.style.display = 'none';
		}

		const discountMob = newLi.querySelector(
			'.basket-card__price-fake_isMobile'
		);
		if (value.discount == 0) {
			discountMob.style.display = 'none';
		}
		listCard.appendChild(newLi);
		createSumPrice();
		createInfoSummary();
	});
}

function createLacklist() {
	products.forEach((value, key) => {
		const newLi = document.createElement('li');
		newLi.className = 'lack-list';
		newLi.innerHTML = `
	<div class="container">	
    <img src="img/${value.img}" class="lack-list__img"/>
    <div class="lack-list__product">
    <div class="lack-list__name">${value.name}</div>
    <div class="lack-list__options">${value.options}</div>
    </div>
	</div>
	<div class="container">	
    <div class="lack-list__icons">
    <span><img src="img/heart.svg" class="icons__heart"/></span> 
    <span><img src="img/delete.svg" class="icons__delete"/></span>
    </div>
	</div>
    `;
		lackList.appendChild(newLi);
	});
	missing.innerHTML = `
	Отсутствуют · ${products.length} товара`;
}

function createInfoSummary() {
	let count = 0;
	let price = 0;
	let discountAll = 0;
	products.forEach((value) => {
		count += value.quantity;
		const actualPrice = value.price * value.quantity;
		price += actualPrice;
		discountAll +=
			value.price * value.quantity -
			value.price * ((100 - value.discount) / 100) * value.quantity;
	});

	summaryInfo.innerHTML = `
	<div class="info-products">
	<div class="info-count">${count} товаров</div>
	<div class="info-price">${price} сом</div>
	</div>
	<div class="info-discount"><div class="info-discount__heading">Скидка</div>
	<div class="info-discount__number">-${discountAll} сом</div>
	</div>
	<div class="info-transfer"><div class="info-transfer__heading">Доставка</div>
	<div class="info-tranfer__price">${delivery[0].price}</div>
	</div>`;
}

function paymentNow() {
	const checkbox = document.querySelector('#pay-moment');
	if (checkbox.checked) {
		document.querySelector('.order-btn').innerHTML = `Оплатить ${price} сом`;
	} else {
		document.querySelector('.order-btn').innerHTML = `Оплатить`;
	}
}

createCard();
createLacklist();
