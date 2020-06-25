// Contact Constructor
function Contact(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}

// UI Constructor
function UI() { }

// Add Contact to List
UI.prototype.addContactToList = function (contact) {
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

};

// Show Alert
UI.prototype.showAlert = function (message, className) {
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
};

// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
};

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
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            // Add  contact to list
            ui.addContactToList(contact);

            // Show success
            ui.showAlert('Contact Added!', 'success');


            // clear fields
            ui.clearFields();
        }
        e.preventDefault();
    });