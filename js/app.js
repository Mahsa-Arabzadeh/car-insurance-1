// Variables(select form):
const form = document.querySelector("#request-quote");
const html = new HTMLUI();
// Config information.
const config = {
  // Default price.
  price: 0,
  base: 2000000,
  make: {
    // The coefficient of the selected machines.
    make1: 1.15,
    make2: 1.3,
    make3: 1.8,
  },
  // The difference of the last 20 years.
  yearDifference: 20,
  level: {
    // 30% increase.
    basic: 1.3,
    // 50% increase.
    complete: 1.5,
  },
};

// Events:
// The afterload function is executed when the entire page is loaded.
document.addEventListener("DOMContentLoaded", afterLoad);
document.addEventListener("submit", submitForm);

// Functions:
// when the entire page is loaded,will show displayYear().
function afterLoad() {
  html.displayYears();
}
// read form value.
function readFormValues() {
  // Variables
  const make = document.querySelector("#make").value;
  const year = document.querySelector("#year").value;
  const level = document.querySelector('input[name="level"]:checked').value;
  return { make, year, level };
}
// validation form. Checks if the inputs are empty, displays the displayMsg function.
function validateForm(make, year, level) {
  if (make === "" || year === "" || level === "") {
    html.displayMsg("لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر");
    return false;
  }
  return true;
}
// form submit. It takes the value of make, year, level and shows an invoice with price calculation.
function submitForm(e) {
  e.preventDefault();
  // read value from the form.
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
    // calculatePrice(insuranceCase);
    // STEP3: show result message box
    const insurance = new InsuranceProcess(make, year, level);
    html.showResult(insurance.calculatePrice(insuranceCase), insuranceCase);
  }
}
// It takes the base price and multiplier(make1,make2,make3) of the car and shows a base price of each car model.
function calculateMakePrice(make, base) {
  switch (make) {
    case "1":
      return config.base * config.make.make1;
    case "2":
      return config.base * config.make.make2;
    case "3":
      return config.base * config.make.make3;
    default:
      return base;
  }
}

function calculateYearDiscount(year, price) {
  // 3% cheaper for each year
  return price - ((diffrence(year) * 3) / 100) * price;
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
// Finding the difference between the highest and lowest year.get a number,And returns a year.
const diffrence = function (year) {
  year = maxYear() - year;
  return year;
};
// It shows the current year.
function maxYear() {
  // get max year
  const now = new Date().toLocaleDateString("fa-IR");
  let nowYear = now.slice(0, 4);
  // convert to number.
  let max = fixNumbers(nowYear);
  return max;
}

// // oop:
// class Calculateprice {
//   constructor(make, year, level, price, info) {
//     (this.make = make),
//       (this.year = year),
//       (this.level = level),
//       (this.price = price),
//       (this.info = info);
//   }
//   calculateMakePrice(make, base) {
//     switch (make) {
//       case "1":
//         return config.base * config.make.make1;
//       case "2":
//         return config.base * config.make.make2;
//       case "3":
//         return config.base * config.make.make3;
//       default:
//         return base;
//     }
//   }
//   calculateYearDiscount() {
//     // 3% cheaper for each year
//     return this.price - ((diffrence(this.year) * 3) / 100) * this.price;
//   }
//   calculatePrice(info) {
//     // Calculate Make Price
//     let price = calculateMakePrice(info.make, config.base);

//     // Calculate Year Discount
//     const year = info.year;
//     price = calculateYearDiscount(year, price);

//     // Calculate Level Price
//     const level = info.level;
//     price = calculateLevel(level, price);
//     // show price:
//     console.log(price);
//   }
//   calculateLevel(level, price) {
//     // basic   =>  increase 30%
//     // complete=>  increase 50%
//     if (level == "basic") {
//       // price = price + (price * 0.30) (bara mehrdad)
//       price = price * config.level.basic;
//     } else {
//       price = price * config.level.complete;
//     }
//     return price;
//   }
//   diffrence(year) {
//     year = maxYear() - year;
//     return year;
//   }
//   maxYear() {
//     // get max year
//     const now = new Date().toLocaleDateString("fa-IR");
//     let nowYear = now.slice(0, 4);
//     // convert to number.
//     let max = fixNumbers(nowYear);
//     return max;
//   }
// }
// // show price
// class Showprice {
//   constructor(make, year, level) {
//     (this.make = make), (this.year = year), (this.level = level);
//   }
//   validateForm(make, year, level) {
//     if (make === "" || year === "" || level === "") {
//       displayMsg("لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر");
//       return false;
//     }
//     return true;
//   }
//   displayMsg(msg) {
//     // create message box
//     const messageBox = document.createElement("div");
//     messageBox.classList = "error";
//     messageBox.innerText = msg;

//     // show message
//     form.insertBefore(messageBox, document.querySelector(".form-group"));

//     // remove message box
//     setTimeout(() => {
//       document.querySelector(".error").remove();
//     }, 5000);
//   }
//   fixNumbers(str = "") {
//     // Convert to number
//     let persianNumbers = [
//         /۰/g,
//         /۱/g,
//         /۲/g,
//         /۳/g,
//         /۴/g,
//         /۵/g,
//         /۶/g,
//         /۷/g,
//         /۸/g,
//         /۹/g,
//       ],
//       arabicNumbers = [
//         /٠/g,
//         /١/g,
//         /٢/g,
//         /٣/g,
//         /٤/g,
//         /٥/g,
//         /٦/g,
//         /٧/g,
//         /٨/g,
//         /٩/g,
//       ];
//     if (typeof str === "string") {
//       for (var i = 0; i < 10; i++) {
//         str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
//       }
//     }
//     return parseInt(str);
//   }
//   displayYears() {
//     // access to the select tag
//     const selectYear = document.querySelector("#year");
//     // create first option tag for title
//     // create option tag
//     const optionTag = document.createElement("option");
//     optionTag.innerText = `- انتخاب -`;
//     // append option to the selectYear
//     selectYear.appendChild(optionTag);
//     // create for loop for making option tag
//     for (let i = maxYear(); i >= diffrence(config.yearDifference); i--) {
//       // create option tag
//       const optionTag = document.createElement("option");
//       optionTag.value = i;
//       optionTag.innerText = `سال ${i}`;
//       // append option to the selectYear
//       selectYear.appendChild(optionTag);
//     }
//   }
// }

// let test = new Calculateprice("پراید", 1400, "basic", 20000);

// console.log(test.calculateYearDiscount());
