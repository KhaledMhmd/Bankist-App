"use strict";

// The database of the website
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

// Declaring all the variables that i will need
const welcomeText = document.querySelector(".welcomeText");
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
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popupMessage");
const popupHeader = document.querySelector(".popupHeader");
const closePopup = document.querySelector(".closePopup");
const overlay = document.querySelector(".overlay");
// this is the function i will use to transform any number to US Dollar format and style
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
// this is the function i will use to get current date
const today = new Date();
const currentDate =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
balanceDate.innerHTML = `As of: ${currentDate}`;

// declaring some variable that i will use later
let accountActive;
let accountTo;

// function that calculates the balance (part of the update UI functions)
const calculateBalance = function (acc) {
  const balanceTotal = acc.movements.reduce((total, num) => total + num);
  accountBalance.innerHTML = `${formatter.format(balanceTotal)}`;
  acc.balance = balanceTotal;
};

// function that calculates the deposits (part of the update UI functions)

const calculateDeposits = function (acc) {
  const amountIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((total, num) => total + num);
  gotInAmount.innerHTML = `${formatter.format(amountIn)}`;
};

// function that calculates the withdrawals (part of the update UI functions)

const calculateWithdrawals = function (acc) {
  const amountOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((total, num) => total + num, 0);
  gotOutAmount.innerHTML = `${formatter.format(Math.abs(amountOut))}`;
};

// function that calculates the deposits (part of the update UI functions)

const calculateInterest = function (acc) {
  const interests = acc.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  interestAmount.innerHTML = `${formatter.format(interests)}`;
};

// function that displays the movements (part of the update UI functions)

const displayMovements = function (acc) {
  accountSummary.innerHTML = "";
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const sumHTML = `<div class="transaction">
        <div class="actionType ${type}">${type}</div>
        <div class="actionAmount">${formatter.format(mov)}</div>
      </div>`;
    accountSummary.insertAdjacentHTML("afterbegin", sumHTML);
  });
};

// Function for adding username property for each account on the database given "accounts array"
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

// Function that updates the ui which contains multiple functions
const updateUI = function (acc) {
  calculateBalance(acc);
  calculateDeposits(acc);
  calculateInterest(acc);
  calculateWithdrawals(acc);
  displayMovements(acc);
};

// events
// login event
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  // checking if the info is correct
  accountActive = accounts.find((acc) => username.value === acc.username);
  if (accountActive?.password === Number(password.value)) {
    welcomeText.innerHTML = `Welcome back, ${
      accountActive.owner.split(" ")[0]
    }!`;
    username.classList.add("hidden");
    password.classList.add("hidden");
    loginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    mainContainer.classList.remove("hidden");
    updateUI(accountActive);
  } else {
    username.value = "";
    password.value = "";
    password.blur();
    // popup window that appears
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popupHeader.innerHTML = "Wrong username/password!";
    popupMessage.innerHTML =
      "The username or password that you have entered are not correct.\n Please make sure to try again using the correct username and password.";
  }
});

// transfer money event

transferButton.addEventListener("click", function (ev) {
  ev.preventDefault();
  const amount = Number(transferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => transferTo.value === acc.username
  );
  transferTo.value = "";
  transferAmount.value = "";
  transferAmount.blur();
  // checking if the money and username are valid or not
  if (
    amount > 0 &&
    accountActive.balance > amount &&
    receiverAccount?.username !== accountActive.username
  ) {
    accountActive.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(accountActive);
  } else {
    transferTo.value = "";
    transferAmount.value = "";
    transferAmount.blur();
    // popup window that appears
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popupMessage.innerHTML =
      "The information you have entered appear to not be correct.\n Make sure to enter the correct username you want to transfer that amount of money to\n and the correct amount of money to be transferred.";
    popupHeader.innerHTML = `Incorrect Information!`;
  }
  updateUI(accountActive);
});

// Requesting a loan event
requestButton.addEventListener("click", function (e) {
  e.preventDefault();
  const loan = Number(loanAmount.value);
  if (accountActive.movements.some((val) => val >= loan * 0.1)) {
    accountActive.movements.push(loan);
    updateUI(accountActive);
    loanAmount.value = "";
    loanAmount.blur();
  } else {
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popupHeader.innerHTML = "The request is denied.";
    popupMessage.innerHTML =
      "The bank has a rule that it only grants a loan if there's at least one deposit with at least 10% of the requested amount.";
    loanAmount.innerHTML = "";
    loanAmount.blur();
  }
});

// Deleting the account event
closeAccountButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    confirmUsername.value === accountActive.username &&
    Number(confirmPassword.value) === accountActive.password
  ) {
    const i = accounts.findIndex(
      (acc) => acc.username === accountActive.username
    );
    accounts.splice(i, 1);
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popupHeader.innerHTML = "You have deleted your account.";
    popupMessage.innerHTML = "You will now be returned to the main menu.";
    mainContainer.classList.add("hidden");
    username.classList.remove("hidden");
    password.classList.remove("hidden");
    loginButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    welcomeText.innerHTML = "Log in to get started";
    username.value = "";
    password.value = "";
    username.blur();
  } else {
    confirmUsername.value = "";
    confirmPassword.value = "";
    confirmUsername.blur();
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popupHeader.innerHTML = "You have entered the wrong username/password.";
    popupMessage.innerHTML =
      "Please confirm your username and password to be able to delete your account.";
  }
});

// logout button and its functionality
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  mainContainer.classList.add("hidden");
  username.classList.remove("hidden");
  password.classList.remove("hidden");
  loginButton.classList.remove("hidden");
  logoutButton.classList.add("hidden");
  welcomeText.innerHTML = "Log in to get started";
  username.value = "";
  password.value = "";
  username.blur();
});

// closing the popups
closePopup.addEventListener("click", function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
});
