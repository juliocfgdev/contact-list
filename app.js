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

        // Add  contact to list
        ui.addContactToList(contact);

        // clear fields
        ui.clearFields();

        e.preventDefault();
    });