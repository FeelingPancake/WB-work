const modalPay = document.getElementsByClassName('modalPay')[0];
const btnPay = document.getElementsByClassName('btn-payment-method')[0];
const btnEdit = document.getElementsByClassName('summary__edit-pay')[0];
const methods = document.getElementsByClassName('modal-main__payments')[0];
const closePay = document.getElementsByClassName('modal-heading__close')[1];
const modalDelivery = document.getElementsByClassName('modalDelivery')[0];
const btnDelivery = document.getElementsByClassName('btn-change-delivery')[0];
const closeDelivery = document.getElementsByClassName(
	'modal-heading__close'
)[0];
const modalCouriers = document.getElementById('points-of-delivery');
const modalAddresses = document.getElementById('couriers');
const btnEditDelivery = document.getElementsByClassName(
	'summary__edit-delivery'
)[0];

btnDelivery.onclick = function () {
	modalDelivery.style.display = 'block';
};

closeDelivery.onclick = function () {
	modalDelivery.style.display = 'none';
};

btnEditDelivery.onclick = function () {
	modalDelivery.style.display = 'block';
};

btnPay.onclick = function () {
	modalPay.style.display = 'block';
};

btnEdit.onclick = function () {
	modalPay.style.display = 'block';
};

closePay.onclick = function () {
	modalPay.style.display = 'none';
};

window.onclick = function (event) {
	if (event.target == modalPay) {
		modalPay.style.display = 'none';
	}
};

window.onclick = function (event) {
	if (event.target == modalDelivery) {
		modalDelivery.style.display = 'none';
	}
};

const payMethods = [
	{
		id: 78,
		img: 'mir.png',
		name: 'mir',
		number: '1234 5678 1234 5678',
	},

	{
		id: 25,
		img: 'visa.png',
		name: 'visa',
		number: '1234 5678 1234 5678',
	},

	{
		id: 34,
		img: 'mastercard.png',
		name: 'mastercard',
		number: '1234 5678 1234 5678',
	},

	{
		id: 42,
		img: 'dnkmethod.png',
		name: 'others',
		number: '1234 5678 1234 5678',
	},
];

const pointsofDelivery = [
	{
		id: 'isa',
		address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
		rating: '4.99',
		img: 'star.png',
	},
	{
		id: 'jal',
		address: '"г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1"',
		rating: '',
		img: 'star.png',
	},
	{
		id: 'bish',
		address: 'г. Бишкек, улица Табышалиева, д. 57',
		rating: '4.85',
		img: 'star.png',
	},
];

const couriers = [
	{
		id: '57',
		address: 'Бишкек, улица Табышалиева, 57',
	},
	{
		id: '77',
		address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
	},
	{
		id: '67',
		address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
	},
];

function openAdresses(evt, Address) {
	const tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	const tablinks = document.getElementsByClassName('tablinks');
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}
	document.getElementById(Address).style.display = 'block';
	evt.currentTarget.className += ' active';
}

function choosePayments() {
	const listpayments = document.querySelectorAll('.methods-radio');
	listpayments.forEach((value, key) => {
		if (value.checked) {
			const secret = payMethods[key].number.replace(
				payMethods[key].number.slice(6, 11),
				'•• ••••'
			);
			document.querySelectorAll('.payment__info').forEach((value) => {
				value.innerHTML = `<img src="img/${payMethods[key].img}" class="payment-icon" alt="${payMethods[key].name}" /> <p>${secret} </p>`;
			});
		}
	});
}

function chooseAddresses() {
	const listpayments = document.querySelectorAll('.delivery-radio');
	listpayments.forEach((value, key) => {
		if (value.checked) {
			document.querySelectorAll('.delivery__address-info').forEach((value) => {
				value.innerHTML = `<p>${pointsofDelivery[key].address} </p>`;
			});
		}
	});
	const courierslist = document.querySelectorAll('.couriers-radio');
	courierslist.forEach((value, key) => {
		if (value.checked) {
			document.querySelectorAll('.delivery__address-info').forEach((value) => {
				value.innerHTML = `<p>${couriers[key].address} </p>`;
			});
		}
	});
}

function createAdresses() {
	pointsofDelivery.forEach((value, key) => {
		const newDiv = document.createElement('div');
		newDiv.className = 'modal-main__addresses-item';
		newDiv.innerHTML = `
		<div>
		<input type="radio" id="${value.id}" name="points-market" value="${value.address}" class="delivery-radio"/>
		<label for="isa">${value.address}</label>
		<div><img src="img/${value.img}" alt="rating-logo" />${value.rating} Пункт выдачи</div>
		</div>
		<div>
		<span><img src="img/delete.svg"</span>
		</div>
    `;
		modalCouriers.appendChild(newDiv);
	});
	couriers.forEach((value, key) => {
		const newDiv = document.createElement('div');
		newDiv.className = 'modal-main__addresses-item';
		newDiv.innerHTML = `
		<div>
		<input type="radio" id="${value.id}" name="points-market" value="${value.address}" class="couriers-radio"/>
		<label for="isa">${value.address}</label>
		</div>
		<div>
		<span><img src="img/delete.svg"</span>
		</div>
    `;
		modalAddresses.appendChild(newDiv);
	});
}

function createPayments() {
	payMethods.forEach((value, key) => {
		const secret = value.number.replace(value.number.slice(6, 11), '•• ••••');
		const newDiv = document.createElement('div');
		newDiv.className = 'modal-main__payments-item';
		newDiv.innerHTML = `

  <input type="radio" id="${value.id}" name="payments" value="${value.number}" class="methods-radio" />
  <label for=${value.id}><img src="img/${value.img}" alt="${value.name}" /> ${secret}</label>

    `;
		methods.appendChild(newDiv);
	});
}

createPayments();
createAdresses();
