// Classess:

// Every thing realated to the proccess insurance.
class InsuranceProcess {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }
  // It takes the amount of the insurance level and the price and gives a price according to the type of insurance.
  calculateLevel(level, price) {
    // basic   =>  increase 30%
    // complete=>  increase 50%
    if (level == "basic") {
      // price = price + (price * 0.30) (bara mehrdad)
      price = price * config.level.basic;
    } else {
      price = price * config.level.complete;
    }
    return price;
  }
  // It takes the info and shows the price of each car.
  calculatePrice(info) {
    // Calculate Make Price
    let price = calculateMakePrice(info.make, config.base);

    // Calculate Year Discount
    const year = info.year;
    price = calculateYearDiscount(year, price);

    // Calculate Level Price
    const level = info.level;
    price = this.calculateLevel(level, price);
    // show price:
    return price;
  }
}

// User Interface (UI) Functions:
// Every thing realated to the DOM:
class HTMLUI {
  showResult(price, info) {
    // access to the div result.
    const result = document.querySelector("#result");

    // create div for showing price
    const div = document.createElement("div");

    // convert make.
    let make = info.make;

    switch (make) {
      case 1:
        make = "پراید";
        break;
      case 2:
        make = "اپتیما";
        break;
      case 3:
        make = "پورشه";
        break;
    }

    // convert level to the persian.
    let level = info.level;
    if (level == "basic") {
      level = "ساده";
    } else {
      level = "کامل";
    }

    // template for show result
    div.innerHTML = `
        <p class="header">خلاصه فاکتور</p>
        <p>Car Model: ${make}</p>
        <p>Date Create: ${info.year}</p>
        <p>Car Level: ${level}</p>
        <p class="total">Final Price: ${price}</p>`;

    // show spinner:
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";

    setTimeout(() => {
      // hide spinner after 3 second.
      spinner.style.display = "none";
      // append div to the result.
      result.appendChild(div);
    }, 3000);
  }
  // Show Years into the DOM.
  displayYears() {
    // access to the select tag
    const selectYear = document.querySelector("#year");
    // create first option tag for title
    // create option tag
    const optionTag = document.createElement("option");
    optionTag.innerText = `- انتخاب -`;
    // append option to the selectYear
    selectYear.appendChild(optionTag);
    // create for loop for making option tag
    for (let i = maxYear(); i >= diffrence(config.yearDifference); i--) {
      // create option tag
      const optionTag = document.createElement("option");
      optionTag.value = i;
      optionTag.innerText = `سال ${i}`;
      // append option to the selectYear
      selectYear.appendChild(optionTag);
    }
  }
  // Display message box:get a message and return an error.
  displayMsg(msg) {
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
}
