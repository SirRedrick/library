const library = [];
const root = document.querySelector('.book-list');
const form = document.querySelector('.form');

export default function Book({ author, title, pages, isRead }) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.isRead = isRead;
}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(form);

	const obj = {};

	for (var p of formData.entries()) {
		obj[p[0]] = p[1];
	}

	if (obj.hasOwnProperty('isRead')) {
		obj.isRead = true;
	} else {
		obj.isRead = false;
	}

	const book = new Book(obj);
	library.push(book);
	render();
});

root.addEventListener('click', ({ target }) => {
	if (target.id === 'read') {
		library[target.dataset.index].isRead = !library[target.dataset.index].isRead;
	} else if (target.classList.contains('delete')) {
		library.splice(target.dataset.index, 1);
	}
	console.log(library);
	render();
});

function render() {
	root.innerHTML = '';

	library.forEach((book, index) => {
		const item = document.createElement('div');
		item.classList.add('item');

		const itemHeader = document.createElement('div');
		itemHeader.classList.add('item-header');

		const bookTitle = document.createElement('h2');
		bookTitle.appendChild(document.createTextNode(book.title));
		bookTitle.classList.add('book-title');
		itemHeader.appendChild(bookTitle);

		const author = document.createElement('div');
		author.appendChild(document.createTextNode('by '));
		const span = document.createElement('span');
		span.appendChild(document.createTextNode(book.author));
		author.appendChild(span);
		author.classList.add('author');
		itemHeader.appendChild(author);
		item.appendChild(itemHeader);

		const itemBody = document.createElement('div');
		itemBody.classList.add('item-body');

		const list = document.createElement('ul');
		list.classList.add('list');

		const listItem1 = document.createElement('li');
		listItem1.classList.add('list-item');
		listItem1.appendChild(document.createTextNode(`Number of pages: ${book.pages}`));
		list.appendChild(listItem1);

		const listItem2 = document.createElement('li');
		listItem2.classList.add('list-item');
		listItem2.appendChild(document.createTextNode('Have read: No '));

		const checkbox = document.createElement('input');
		checkbox.classList.add('switch');
		checkbox.type = 'checkbox';
		checkbox.name = 'read';
		checkbox.id = 'read';
		checkbox.checked = book.isRead;
		checkbox.dataset.index = index;
		listItem2.appendChild(checkbox);

		listItem2.appendChild(document.createTextNode(' Yes'));
		list.appendChild(listItem2);
		itemBody.appendChild(list);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete');
		deleteButton.appendChild(document.createTextNode('Delete'));
		itemBody.appendChild(deleteButton);

		item.appendChild(itemBody);

		root.appendChild(item);
	});
}

render();
