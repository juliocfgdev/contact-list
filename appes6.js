class Contact {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

class UI {
    addContactToList(contact) {
        const list = document.getElementById('contact-list');

        // Create tr element
        const row = document.createElement('tr');
        //  Insert cols
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        // Append to list
        list.appendChild(row);
    }

    showAlert(message, className) {
        // create div
        const div = document.createElement('div');

        // add clasees
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));

        // get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#contact-form');

        // insert alert
        container.insertBefore(div, form);

        // disappear after 2 secs
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteContact(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    }
}

// Local Storage Class
class Store {
    static getContact() {
        let contacts;
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }

        return contacts;
    }

    static displayContacts() {
        const contacts = Store.getContact();

        contacts.forEach(function (contact) {
            const ui = new UI;

            //    add to UI
            ui.addContactToList(contact);
        });

    }

    static addContact(contact) {
        const contacts = Store.getContact();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContact(phone) {
        const contacts = Store.getContact();
        contacts.forEach(function (contact, index) {
            if (contact.phone === phone) {
                contacts.splice(index, 1);
            }
        });

        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayContacts);

// Event Listeners
document.getElementById('contact-form').addEventListener('submit',
    function (e) {
        // Get form values
        const name = document.getElementById('name').value,
            email = document.getElementById('email').value,
            phone = document.getElementById('phone').value;

        // Instatiate Contact
        const contact = new Contact(name, email, phone);

        //  Instatiate UI 
        const ui = new UI();

        // Validation
        if (name === '' || email === '' || phone === '') {
            // Error Alert
            ui.showAlert('Please fill i41n all fields', 'error');
        } else {

            // Add  contact to list
            ui.addContactToList(contact);

            // Add to local storage
            Store.addContact(contact);

            // Show success
            ui.showAlert('Contact Added!', 'success');


            // clear fields
            ui.clearFields();
        }
        e.preventDefault();
    });


// Delete Event Listener
document.getElementById('contact-list').addEventListener('click', function (e) {
    //  Instatiate UI 
    const ui = new UI();

    //  Delete from UI
    ui.deleteContact(e.target);

    // Remove from local storage
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert

    ui.showAlert('Contact Deleted', 'success');


    e.preventDefault;
});