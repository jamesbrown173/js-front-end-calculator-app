const form = document.querySelector("form");
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("customTip");
const tipButtons = document.getElementsByClassName("tipButton");
const numPeopleInput = document.getElementById("numPeople");
const resetButton = document.getElementById("clearAll");
const resultTipAmount = document.getElementById("resultTip");
const resultTotalAmount = document.getElementById("resultTotal");
const peopleErrorMessage = document.getElementById("errorMessage");

/*================================================================================================================
Currency Formatter
*==============================================================================================================*/

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/*================================================================================================================
Variables
*==============================================================================================================*/
var billAmount = 0;
var tipPercentage = 0;
var numPeople = 0;

/*================================================================================================================
1. List all possible ways of users entering into the form
2. Get all form data and assign to variables
3. only calculate if the fields have data.
4. Reset the form data
5. Handle Error inputs
*==============================================================================================================*/

// List all possible ways of triggering

// 1. Type in the bill
billInput.addEventListener("keyup", function (event) {
  billAmount = event.target.value;
  if (numPeople !== 0) {
    calculateAndUpdate(billAmount, tipPercentage, numPeople);
  }
});

// 2. Click a button
for (let i = 0; i < tipButtons.length; i += 1) {
  // Loop over the buttons as there are multiple
  tipButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
    tipPercentage = event.target.value;

    if (numPeople == 0) {
      handleErrorInputPeople();
    }
    if (billAmount != 0 && numPeople != 0) {
      calculateAndUpdate(billAmount, tipPercentage, numPeople);
    }
  });
}

// 3. Type in the custom tip field
customTipInput.addEventListener("keyup", function (event) {
  tipPercentage = event.target.value / 100;
  if (numPeople != 0 && billAmount != 0) {
    calculateAndUpdate(billAmount, tipPercentage, numPeople);
  }
});

// 4. Type in the number of people field
numPeopleInput.addEventListener("keyup", function (event) {
  numPeople = event.target.value;
  peopleErrorMessage.innerText = " ";
  numPeopleInput.classList.remove("border-red-400", "hover:border-red-400");

  if (numPeople == 0) {
    handleErrorInputPeople();
  }
  if (numPeople != 0 && billAmount != 0) {
    calculateAndUpdate(billAmount, tipPercentage, numPeople);
  }
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
1. calculateAndUpdate the amounts into the elements
2. Handle the error input into the number of people
*==============================================================================================================*/

function calculateAndUpdate(bill, tip, people) {
  totalAmountPerPerson = bill / people;
  tipPerPerson = (bill * tip) / people;

  resultTipAmount.innerText = `${formatter.format(tipPerPerson)}`;
  resultTotalAmount.innerText = `${formatter.format(totalAmountPerPerson)}`;
}

function handleErrorInputPeople() {
  peopleErrorMessage.innerText = "Can't be zero";
  numPeopleInput.classList.add("border-red-400", "hover:border-red-400");
}
