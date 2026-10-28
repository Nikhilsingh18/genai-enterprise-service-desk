const form = document.getElementById("ticketForm");
const employeeInput = document.getElementById("employee");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const descriptionInput = document.getElementById("description");

const ticketList = document.getElementById("ticketList");
const totalTickets = document.getElementById("totalTickets");
const openTickets = document.getElementById("openTickets");

let tickets = [];
let nextId = 1;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const employee = employeeInput.value.trim();
    const category = categoryInput.value;
    const priority = priorityInput.value;
    const description = descriptionInput.value.trim();

    if (!employee || !category || !description) {
        alert("Please fill in all required fields.");
        return;
    }

    const ticket = {
        id: nextId,
        employee: employee,
        category: category,
        priority: priority,
        description: description,
        status: "Open",
        date: new Date().toLocaleString()
    };

    tickets.push(ticket);
    nextId++;

    showTickets();
    form.reset();
});

function showTickets() {
    ticketList.replaceChildren();

    totalTickets.textContent = tickets.length;

    const openCount = tickets.filter(function (ticket) {
        return ticket.status === "Open";
    }).length;

    openTickets.textContent = openCount;

    if (tickets.length === 0) {
        const message = document.createElement("p");
        message.className = "empty";
        message.textContent = "No tickets created yet.";
        ticketList.appendChild(message);
        return;
    }

    tickets.forEach(function (ticket) {
        const card = document.createElement("article");
        card.className = "ticket";

        const title = document.createElement("h3");
        title.textContent = "Ticket #" + ticket.id;

        const name = document.createElement("p");
        name.textContent = "Employee: " + ticket.employee;

        const category = document.createElement("p");
        category.textContent = "Category: " + ticket.category;

        const priority = document.createElement("p");
        priority.className = "priority";
        priority.textContent = "Priority: " + ticket.priority;

        const description = document.createElement("p");
        description.textContent = "Problem: " + ticket.description;

        const status = document.createElement("p");
        status.textContent = "Status: " + ticket.status;
        const date = document.createElement("p");
        date.textContent = "Created: " + ticket.date;

        card.append(
            title,
            name,
            category,
            priority,
            description,
            status,
            date
        );

        ticketList.appendChild(card);
    });
}