const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dataTransaction = [
  { id: 1, text: "Book", amount: -20 },
  { id: 1, text: "Sunglases", amount: 50 },
  { id: 1, text: "Table", amount: -50 },
  { id: 1, text: "Food", amount: 40 },
];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
//random ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}
//funkcija koja dodajte transakcije na DOM
function addTransactionDOM(transaction) {
  // da li je u plusu ili minusu iznos
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  //da li je klasa plus ili minus
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(
    2
  )}</span> 
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;
  list.appendChild(item);
}
// update balance,income i expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}
//remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}
//update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
//pozivanje liste
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();
form.addEventListener("submit", addTransaction);
