const form = document.querySelector("form");
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("customTip");
const tipButtons = document.getElementsByClassName("tipButton");
const numPeopleInput = document.getElementById("numPeople");
const resetButton = document.getElementById("clearAll");
const resultTipAmount = document.getElementById("resultTip");
console.log(resultTipAmount);
const resultTotalAmount = document.getElementById("resultTotal");

/*================================================================================================================
currency formatter
*==============================================================================================================*/

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/*================================================================================================================
variables
*==============================================================================================================*/
var billAmount = 0;
var tipPercentage = 0;
var numPeople = 0;

/*================================================================================================================
1. list all user input methods
2. get all form data and assign to variables
4. reset the form
*==============================================================================================================*/

// List all possible ways of triggering

// 1. Type in the bill
billInput.addEventListener("keyup", function (event) {
  billAmount = event.target.value;
  calculateAndUpdate(billAmount, tipPercentage, numPeople);
});

// 2. Click a button
for (let i = 0; i < tipButtons.length; i += 1) {
  // Loop over the buttons as there are multiple
  tipButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
    tipPercentage = event.target.value;

    calculateAndUpdate(billAmount, tipPercentage, numPeople);
  });
}

// 3. Type in the custom tip field
customTipInput.addEventListener("keyup", function (event) {
  tipPercentage = event.target.value / 100;
  calculateAndUpdate(billAmount, tipPercentage, numPeople);
});

// 4. Type in the number of people field
numPeopleInput.addEventListener("keyup", function (event) {
  numPeople = event.target.value;
  calculateAndUpdate(billAmount, tipPercentage, numPeople);
});

// 5. Click the reset button
resetButton.addEventListener("click", function () {
  form.reset();
  billAmount = 0;
  tipPercentage = 0;
  numPeople = 0;
  resultTipAmount.innerText = "$0.00";
  resultTotalAmount.innerText = "$0.00";

  console.log("clicked reset");
});

/*================================================================================================================
1. calculateAndUpdate

2. update the elements
*==============================================================================================================*/

function calculateAndUpdate(bill, tip, people) {
  totalAmountPerPerson = bill / people;
  tipPerPerson = (bill * tip) / people;

  resultTipAmount.innerText = `$ ${tipPerPerson}`;
  resultTotalAmount.innerText = `$ ${totalAmountPerPerson}`;

  console.log(`Total Amount Per Person: ${totalAmountPerPerson}`);
  console.log(`Tip Per Person: ${tipPerPerson}`);
}
