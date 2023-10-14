// Variables
const form = document.querySelector("#request-quote");

// Events
// The afterload function is executed when the entire page is loaded.
document.addEventListener("DOMContentLoaded", afterLoad);
document.addEventListener("submit", submitForm);

// Functions
function afterLoad() {
  displayYears();
}
// submit form
// read form value.
function readFormValues() {
  const make = document.querySelector("#make").value;
  const year = document.querySelector("#year").value;
  const level = document.querySelector('input[name="level"]:checked').value;
  return { make, year, level };
}
// validation form.
function validateForm(make, year, level) {
  if (make === "" || year === "" || level === "") {
    displayMsg("لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر");
    return false;
  }
  return true;
}
// form submit.
function submitForm(e) {
  e.preventDefault();

  // read value from the form
  const { make, year, level } = readFormValues();

  // validate the form
  if (validateForm(make, year, level)) {
    // STEP1: get info
    let insuranceCase = {
      make: make,
      year: year,
      level: level,
    };

    // STEP2: calculate
    calculatePrice(insuranceCase);

    // STEP3: show result message box
  }
}

function calculateMakePrice(make, base) {
  switch (make) {
    case "1":
      return base * 1.15;
    case "2":
      return base * 1.3;
    case "3":
      return base * 1.8;
    default:
      return base;
  }
}

function calculateYearDiscount(year, price) {
  // Convert to number
  const diffrence = function (year) {
    fixNumbers();
    // get max year
    const now = new Date().toLocaleDateString("fa-IR");
    let nowYear = now.slice(0, 4);
    // convert to number.
    let max = fixNumbers(nowYear);
    year = max - year;

    return year;
  };
  // 3% cheaper for each year
  return price - ((diffrence(year) * 3) / 100) * price;
}

function calculatePrice(info) {
  const base = 2000000;

  // Calculate Make Price
  let price = calculateMakePrice(info.make, base);

  // Calculate Year Discount
  const year = info.year;
  price = calculateYearDiscount(year, price);

  // Calculate Level Price
  const level = info.level;
  // price = calculateLevel(level, price);

  console.log(price);
}

function calculateLevel(level, price) {
  /*
        basic   =>  increase 30%
        complete=>  increase 50%
    */

  if (level == "basic") {
    // price = price + (price * 0.30) (bara mehrdad)
    price = price * 1.3;
  } else {
    price = price * 1.5;
  }

  return price;
}

// User Interface (UI) Functions
// Display message box
function displayMsg(msg) {
  // create message box
  const messageBox = document.createElement("div");
  messageBox.classList = "error";
  messageBox.innerText = msg;

  // show message
  form.insertBefore(messageBox, document.querySelector(".form-group"));

  // remove message box
  setTimeout(() => {
    document.querySelector(".error").remove();
  }, 5000);
}

// fix numbers and Number conversion function.
fixNumbers = function (str = "") {
  // Convert to number
  let persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return parseInt(str);
};

// Show Years
function displayYears() {
  // convert to number
  fixNumbers();
  // get now years
  let curentYear = new Date().toLocaleDateString("fa-IR");

  // Slice date
  curentYear = curentYear.slice(0, 4);

  // get max year
  let maxYear = fixNumbers(curentYear);

  // get min year
  let minYear = maxYear - 20;

  // access to the select tag
  const selectYear = document.querySelector("#year");

  // create first option tag for title
  // create option tag
  const optionTag = document.createElement("option");
  optionTag.innerText = `- انتخاب -`;
  // optionTag.value = ''
  // append option to the selectYear
  selectYear.appendChild(optionTag);

  // create for loop for making option tag
  for (let i = maxYear; i >= minYear; i--) {
    // create option tag
    const optionTag = document.createElement("option");
    optionTag.value = i;
    optionTag.innerText = `سال ${i}`;

    // append option to the selectYear
    selectYear.appendChild(optionTag);
  }
}
