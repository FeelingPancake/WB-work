const form = document.getElementsByClassName('form-main')[0];
const email = document.getElementById('email');
const emailError = document.querySelector('#email+span.error');
const fname = document.getElementById('fname');
const fnameError = document.querySelector('#fname+span.error');
const lname = document.getElementById('lname');
const lnameError = document.querySelector('#lname+span.error');
const telephone = document.getElementById('tel');
const telephoneError = document.querySelector('#tel+span.error');
const inn = document.getElementById('INN');
const innError = document.querySelector('#INN+span.error');

const forms = [email, fname, lname, telephone, inn];

form.addEventListener('submit', (event) => {
	forms.forEach((form) => {
		if (!form.validity.valid) {
			showError(form);
			event.preventDefault();
		}
	});
});

email.addEventListener('input', (event) => {
	if (email.validity.valid) {
		emailError.textContent = '';
		emailError.className = 'error';
	}
});

fname.addEventListener('input', (event) => {
	if (fname.validity.valid) {
		fnameError.textContent = '';
		fnameError.className = 'error';
	}
});
lname.addEventListener('input', (event) => {
	if (lname.validity.valid) {
		lnameError.textContent = '';
		lnameError.className = 'error';
	}
});
telephone.addEventListener('input', (event) => {
	if (telephone.validity.valid) {
		telephoneError.textContent = '';
		telephoneError.className = 'error';
	}
});
inn.addEventListener('input', (event) => {
	if (inn.validity.valid) {
		innError.textContent = '';
		innError.className = 'error';
	}
});

function showError(form) {
	switch (form) {
		case email:
			if (email.validity.valueMissing) {
				emailError.textContent = 'Вы должны ввести свою почту.';
			} else if (email.validity.typeMismatch) {
				emailError.textContent = 'Вами веден некорректный почтовый адрес.';
			}
			email.className = 'input active';
			emailError.className = 'error active';
			break;
		case fname:
			if (fname.validity.valueMissing) {
				fnameError.textContent = 'Вы должны ввести своё имя.';
			} else if (fname.validity.patternMismatch) {
				fnameError.textContent = 'Введите имя.';
			}
			fname.className = 'input active';
			fnameError.className = 'error active';
			break;
		case lname:
			if (lname.validity.valueMissing) {
				lnameError.textContent = 'Вы должны ввести своё фамилию.';
			} else if (lname.validity.patternMismatch) {
				lnameError.textContent = 'Введите фамилию.';
			}
			lname.className = 'input active';
			lnameError.className = 'error active';
			break;
		case telephone:
			if (telephone.validity.valueMissing) {
				telephoneError.textContent = 'Вы должны ввести телефон.';
			} else if (telephone.validity.patternMismatch) {
				telephoneError.textContent =
					'Введите телефон в указанном формате +7 999 888 1111.';
			}
			telephone.className = 'input active';
			telephoneError.className = 'error active';
			break;
		case inn:
			if (inn.validity.valueMissing) {
				innError.textContent = 'Вы должны ввести свой ИНН.';
			} else if (inn.validity.patternMismatch) {
				innError.textContent = 'Введите ИНН правильно.';
			}
			inn.className = 'input active';
			innError.className = 'error active';
			break;
	}
}
