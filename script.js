const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Perform login logic here
  // ...

  // Redirect to the inventory page or show an error message
});

// Register form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Perform registration logic here
  // ...

  // Redirect to the login page or show a success message
});

// Inventory table functionality
const tableSelect = document.getElementById('tableSelect');
const dataTable = document.getElementById('dataTable');
const addRowBtn = document.getElementById('addRowBtn');
const deleteRowBtn = document.getElementById('deleteRowBtn');

// Load the initial table data
loadTableData();

// Table select event listener
tableSelect.addEventListener('change', () => {
  loadTableData();
});
addRowBtn.addEventListener('click', () => {
  const table = dataTable.getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  const selectedTable = tableSelect.value;

  // Dynamically create input fields based on the selected table
  switch (selectedTable) {
    case 'parts':
      const partNameCell = newRow.insertCell();
      const partNameInput = document.createElement('input');
      partNameInput.type = 'text';
      partNameCell.appendChild(partNameInput);

      const partDescriptionCell = newRow.insertCell();
      const partDescriptionInput = document.createElement('input');
      partDescriptionInput.type = 'text';
      partDescriptionCell.appendChild(partDescriptionInput);

      const partPriceCell = newRow.insertCell();
      const partPriceInput = document.createElement('input');
      partPriceInput.type = 'number';
      partPriceCell.appendChild(partPriceInput);
      break;

    case 'vehicles':
      // Add input fields for vehicles table
      break;

    case 'customers':
      // Add input fields for customers table
      break;

    // Add cases for other tables
  }
});

// Delete row event listener
deleteRowBtn.addEventListener('click', () => {
  const table = dataTable.getElementsByTagName('tbody')[0];
  const rowCount = table.rows.length;

  if (rowCount > 0) {
    const lastRow = table.rows[rowCount - 1];
    table.deleteRow(rowCount - 1);
  }
});

// Function to load table data
function loadTableData() {
  const selectedTable = tableSelect.value;
  const table = dataTable.getElementsByTagName('tbody')[0];

  // Clear existing table data
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  // Fetch data from the server or database based on the selected table
  // and populate the table rows dynamically

  // Example data for parts table
  if (selectedTable === 'parts') {
    const headers = ['Part Name', 'Description', 'Price'];
    const data = [
      ['Oil Filter', 'Automotive oil filter', 9.99],
      ['Brake Pads', 'Front brake pads', 29.99],
      ['Spark Plugs', 'Set of 4 spark plugs', 14.99],
    ];

    // Create table headers
    const headerRow = table.insertRow();
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    // Create table rows
    data.forEach((row) => {
      const newRow = table.insertRow();
      row.forEach((cell) => {
        const newCell = newRow.insertCell();
        newCell.textContent = cell;
      });
    });
  }
}
