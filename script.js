let expenses = [];
let totalAmount = 0;

const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Load from localStorage if available
window.addEventListener('load', () => {
  const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses = savedExpenses;
  renderTable();
});

addBtn.addEventListener('click', function () {
  const category = categoryInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === '') {
    alert('Please enter a category');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  if (date === '') {
    alert('Please select a date');
    return;
  }

  const expense = { category, amount, date };
  expenses.push(expense);
  saveExpenses();
  renderTable();

  categoryInput.value = '';
  amountInput.value = '';
  dateInput.value = '';
});

function renderTable() {
  expensesTableBody.innerHTML = '';
  totalAmount = 0;

  expenses.forEach((expense, index) => {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteExpense(index));
    deleteCell.appendChild(deleteBtn);

    totalAmount += expense.amount;
  });

  totalAmountCell.textContent = totalAmount.toFixed(2);
}

function deleteExpense(index) {
  totalAmount -= expenses[index].amount;
  expenses.splice(index, 1);
  saveExpenses();
  renderTable();
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
