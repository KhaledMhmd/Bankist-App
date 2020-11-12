"use strict";
const account1 = {
  owner: "Khaled Mohamed",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  password: 1111,
};

const account2 = {
  owner: "Amira Osama",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  password: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  password: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  password: 4444,
};
const accounts = [account1, account2, account3, account4];

const welcomeText = document.querySelector(".welcomeText");
const loginInfo = document.querySelector(".loginInfo");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const loginButton = document.querySelector(".loginButton");
const logoutButton = document.querySelector(".logoutButton");
const mainContainer = document.querySelector(".main");
const balanceDate = document.querySelector(".balanceDate");
const accountBalance = document.querySelector(".accountBalance");
const accountSummary = document.querySelector(".history");
const transferTo = document.querySelector(".transferTo");
const transferAmount = document.querySelector(".transferAmount");
const transferButton = document.querySelector(".transferButton");
const loanAmount = document.querySelector(".loanAmount");
const requestButton = document.querySelector(".requestButton");
const confirmUsername = document.querySelector(".confirmUsername");
const confirmPassword = document.querySelector(".confirmPassword");
const closeAccountButton = document.querySelector(".closeAccountButton");
const gotInAmount = document.querySelector(".gotInAmount");
const gotOutAmount = document.querySelector(".gotOutAmount");
const interestAmount = document.querySelector(".interestAmount");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const today = new Date();
const currentDate =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
balanceDate.innerHTML = `As of: ${currentDate}`;

const displayMovements = function (movements) {
  accountSummary.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const sumHTML = `<div class="transaction">
        <div class="actionType ${type}">${type}</div>
        <div class="actionAmount">${formatter.format(mov)}</div>
      </div>`;
    accountSummary.insertAdjacentHTML("afterbegin", sumHTML);
  });
};
displayMovements(account1.movements);

const creatingUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
creatingUsernames(accounts);

const calculateBalance = function (acc) {
  const balanceTotal = acc.movements.reduce((total, num) => total + num);
  accountBalance.innerHTML = `${formatter.format(balanceTotal)}`;
};
calculateBalance(account1);

const calculateDeposits = function (acc) {
  const amountIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((total, num) => total + num);
  gotInAmount.innerHTML = `${formatter.format(amountIn)}`;
};
calculateDeposits(accounts[0]);

const calculateWithdrawals = function (acc) {
  const amountOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((total, num) => total + num);
  gotOutAmount.innerHTML = `${formatter.format(Math.abs(amountOut))}`;
};
calculateWithdrawals(accounts[0]);
