//customers
class ProgressBar {
    constructor(element, initialValue = 0) {
        this.valueElem = element.querySelector('.progress-bar-value');
        this.fillElem = element.querySelector('.progress-bar-fill');

        this.setValue(initialValue);
    }

    setValue(newValue) {
        if (newValue < 0) {
            newValue = 0;
        }
        if (newValue > 100) {
            newValue = 100;
        }
        this.value = newValue;
        this.update();
    }

    update() {
        const percentage = this.value + '%';

        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }
}

const progressBar1 = new ProgressBar(document.querySelector('.pb1'), 100);
const progressBar2 = new ProgressBar(document.querySelector('.pb2'), 100);
const progressBar3 = new ProgressBar(document.querySelector('.pb3'), 100);

//initialize HUD stats
let coin = document.querySelector('.coin-num');
let coinCount = parseFloat(coin.innerHTML);
let prestigeCount = 100;
let prestige = document.querySelector('.prestige-num');
let scoreCount = 0;
let score = document.querySelector('.score-num');

let calendarTimer = 0;
let calendarLap = 0;

//initialize ingredients
let flourAmount = 10;
let chocolateAmount = 10;
let sugarAmount = 10;
let milkAmount = 10;
let fruitAmount = 10;
let eggsAmount = 10;

//initialize ingredient costs
let flourCost = 10;
let chocolateCost = 10;
let sugarCost = 10;
let milkCost = 10;
let fruitCost = 10;
let eggsCost = 10;

//initialize ingredientSelected
let flourSelected = false;
let chocolateSelected = false;
let sugarSelected = false;
let milkSelected = false;
let fruitSelected = false;
let eggsSelected = false;
let ingredientSelected = 0;

//initialize dish
let dishServed = 5;

//initialize utilities
let fireOn = true;
let lightningOn = true;
let faucetOn = true;
let fireCost = 10;
let lightningCost = 10;
let faucetCost = 10;

//initialize upgrades
let upgrade1Type = 0;
let upgrade2Type = 0;
//set upgrades
setUpgrade1();
setUpgrade2();

//initialize upgradables
let scoreAdder = 1;
let prestigeAdder = 1;
let tipAdder = 1;
let leaveLine = 10;
let lineSpeed = 10;
let foodQuantity = 10;
let mealCost = 10;

//initialize upgrade costs
let upgrade1CostText = document.querySelector('.upgrade1-cost');
let upgrade1Cost = parseFloat(upgrade1CostText.innerHTML);
let upgrade2CostText = document.querySelector('.upgrade2-cost');
let upgrade2Cost = parseFloat(upgrade2CostText.innerHTML);

//set up customers
let customerWant1 = 0;
let customerWant2 = 0;
let customerWant3 = 0;
let customer1Costume = 0;
let customer2Costume = 0;
let customer3Costume = 0;
setCustomer1();
setCustomer2();
setCustomer3();

//set up witch
let witch = document.querySelector('.witch-img');
let hexType = 4;
witch.style.opacity = 0;
let witchTimer = 0;

//Stats
function setPrestige(value) {
    if (value < 0) {
        value = 0;
    }
    if (value > 100) {
        value = 100;
    }
    prestigeCount = value;
    prestige.innerHTML = prestigeCount;
    if (prestigeCount <= 0) {
        localStorage.setItem("score", scoreCount);
        window.location.href = "gameover.html";
    }
}

function setScore(value) {
    scoreCount = value;
    score.innerHTML = scoreCount;
}


//this is the great upkeep caller
setInterval(oneSecUpkeep, 1000);

function oneSecUpkeep() {
    progressBar1.setValue(progressBar1.value - lineSpeed);
    if (progressBar1.value <= 50) {
        let customer = document.querySelector('.customer-img1');
        if (customer1Costume == 0) {
            customer.src = "images/angry-customer1.png";
        } else if (customer1Costume == 1) {
            customer.src = "images/angry-customer2.png";
        } else if (customer1Costume == 2) {
            customer.src = "images/angry-customer3.png";
        } else if (customer1Costume == 3) {
            customer.src = "images/angry-customer4.png";
        } else if (customer1Costume == 4) {
            customer.src = "images/angry-customer5.png";
        }
    }

    if (progressBar1.value <= 0) {
        setCustomer1();
        setPrestige(prestigeCount - leaveLine);
    }

    progressBar2.setValue(progressBar2.value - lineSpeed);
    if (progressBar2.value <= 50) {
        let customer = document.querySelector('.customer-img2');
        if (customer2Costume == 0) {
            customer.src = "images/angry-customer1.png";
        } else if (customer2Costume == 1) {
            customer.src = "images/angry-customer2.png";
        } else if (customer2Costume == 2) {
            customer.src = "images/angry-customer3.png";
        } else if (customer2Costume == 3) {
            customer.src = "images/angry-customer4.png";
        } else if (customer2Costume == 4) {
            customer.src = "images/angry-customer5.png";
        }
    }

    if (progressBar2.value <= 0) {
        setCustomer2();
        setPrestige(prestigeCount - leaveLine);
    }

    progressBar3.setValue(progressBar3.value - lineSpeed);
    if (progressBar3.value <= 50) {
        let customer = document.querySelector('.customer-img3');
        if (customer3Costume == 0) {
            customer.src = "images/angry-customer1.png";
        } else if (customer3Costume == 1) {
            customer.src = "images/angry-customer2.png";
        } else if (customer3Costume == 2) {
            customer.src = "images/angry-customer3.png";
        } else if (customer3Costume == 3) {
            customer.src = "images/angry-customer4.png";
        } else if (customer3Costume == 4) {
            customer.src = "images/angry-customer5.png";
        }
    }

    if (progressBar3.value <= 0) {
        setCustomer3();
        setPrestige(prestigeCount - leaveLine);
    }
    
    if (calendarLap == 8) {
        calendarUpkeep();
        calendarLap = 0;
    } else {
        calendarLap = calendarLap + 1;
    }
    if (witchTimer < 25) {
        witchTimer = witchTimer +  Math.floor(Math.random() * 4);
        if (witchTimer >= 25) {
            makeOffer();
        }
    }
}

function calendarUpkeep() {
    if (calendarTimer < 6) {
        calendarTimer = calendarTimer + 1;
    } else {
        calendarTimer = 0;
        turnoffUtility();
    }
    calendarUpdate();
}

//Customers
function servefirstCustomer() {
    if (dishServed == customerWant1) {
        incrementCoin(mealCost);
        setScore(scoreCount + scoreAdder);
        setPrestige(prestigeCount + prestigeAdder);
        setCustomer1();
        dishServed = 5;
        let plate = document.querySelector('.plate-img');
        plate.src = "images/plate.webp";
    }
}

function serveCustomer2() {
    if (dishServed == customerWant2) {
        incrementCoin(mealCost);
        setScore(scoreCount + scoreAdder);
        setPrestige(prestigeCount + prestigeAdder);
        setCustomer2();
        dishServed = 5;
        let plate = document.querySelector('.plate-img');
        plate.src = "images/plate.webp";    
    }
}

function serveCustomer3() {
    if (dishServed == customerWant3) {
        incrementCoin(mealCost);
        setScore(scoreCount + scoreAdder);
        setPrestige(prestigeCount + prestigeAdder);
        setCustomer3();
        dishServed = 5;
        let plate = document.querySelector('.plate-img');
        plate.src = "images/plate.webp";
    }
}

//setting / resetting customer
function setCustomer1() {
    let customer = document.querySelector('.customer-img1');
    let x = Math.floor(Math.random() * 5);
    customer1Costume = x;
    if (x == 0) {
        customer.src = "images/happy-customer1.png";
    } else if (x == 1) {
        customer.src = "images/happy-customer2.png";
    } else if (x == 2) {
        customer.src = "images/happy-customer3.png";
    } else if (x == 3) {
        customer.src = "images/happy-customer4.png";
    } else if (x == 4) {
        customer.src = "images/happy-customer5.png";
    }
    customerWant1 = Math.floor(Math.random() * 4) + 1;
    let customerWant = document.querySelector('.customer-Wants1');
    if (customerWant1 == 1) {
        customerWant.src = "images/cookie.png";
    } else if (customerWant1 == 2) {
        customerWant.src = "images/hot-cocoa.png";
    } else if (customerWant1 == 3) {
        customerWant.src = "images/cake.png";
    } else if (customerWant1 == 4) {
        customerWant.src = "images/fruit-tart.png";
    }
    progressBar1.setValue(100);
}

function setCustomer2() {
    let customer = document.querySelector('.customer-img2');
    let x = Math.floor(Math.random() * 5);
    customer2Costume = x;
    if (x == 0) {
        customer.src = "images/happy-customer1.png";
    } else if (x == 1) {
        customer.src = "images/happy-customer2.png";
    } else if (x == 2) {
        customer.src = "images/happy-customer3.png";
    } else if (x == 3) {
        customer.src = "images/happy-customer4.png";
    } else if (x == 4) {
        customer.src = "images/happy-customer5.png";
    }
    customerWant2 = Math.floor(Math.random() * 4) + 1;
    let customerWant = document.querySelector('.customer-Wants2');
    if (customerWant2 == 1) {
        customerWant.src = "images/cookie.png";
    } else if (customerWant2 == 2) {
        customerWant.src = "images/hot-cocoa.png";
    } else if (customerWant2 == 3) {
        customerWant.src = "images/cake.png";
    } else if (customerWant2 == 4) {
        customerWant.src = "images/fruit-tart.png";
    }
    progressBar2.setValue(100);
}

function setCustomer3() {
    let customer = document.querySelector('.customer-img3');
    let x = Math.floor(Math.random() * 5);
    customer3Costume = x;
    if (x == 0) {
        customer.src = "images/happy-customer1.png";
    } else if (x == 1) {
        customer.src = "images/happy-customer2.png";
    } else if (x == 2) {
        customer.src = "images/happy-customer3.png";
    } else if (x == 3) {
        customer.src = "images/happy-customer4.png";
    } else if (x == 4) {
        customer.src = "images/happy-customer5.png";
    }
    customerWant3 = Math.floor(Math.random() * 4) + 1;
    let customerWant = document.querySelector('.customer-Wants3');
    if (customerWant3 == 1) {
        customerWant.src = "images/cookie.png";
    } else if (customerWant3 == 2) {
        customerWant.src = "images/hot-cocoa.png";
    } else if (customerWant3 == 3) {
        customerWant.src = "images/cake.png";
    } else if (customerWant3 == 4) {
        customerWant.src = "images/fruit-tart.png";
    }
    progressBar3.setValue(100);
}

//pantry
function selectFlour() {
    if (flourAmount > 0 && ingredientSelected < 3 && flourSelected == false) {
        flourSelected = true;
        let flour = document.querySelector('.flour-img');
        flour.style.transform = "scale(1.1)";
        flourAmount = flourAmount - 1;
        let flourNum = document.querySelector('.flour-num');
        flourNum.innerHTML = flourAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

function selectEggs() {
    if (eggsAmount > 0 && ingredientSelected < 3 && eggsSelected == false) {
        eggsSelected = true;
        let eggs = document.querySelector('.eggs-img');
        eggs.style.transform = "scale(1.1)";
        eggsAmount = eggsAmount - 1;
        let eggsNum = document.querySelector('.eggs-num');
        eggsNum.innerHTML = eggsAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

function selectSugar() {
    if (sugarAmount > 0 && ingredientSelected < 3 && sugarSelected == false) {
        sugarSelected = true;
        let sugar = document.querySelector('.sugar-img');
        sugar.style.transform = "scale(1.1)";
        sugarAmount = sugarAmount - 1;
        let sugarNum = document.querySelector('.sugar-num');
        sugarNum.innerHTML = sugarAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

function selectMilk() {
    if (milkAmount > 0 && ingredientSelected < 3 && milkSelected == false) {
        milkSelected = true;
        let milk = document.querySelector('.milk-img');
        milk.style.transform = "scale(1.1)";
        milkAmount = milkAmount - 1;
        let milkNum = document.querySelector('.milk-num');
        milkNum.innerHTML = milkAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

function selectChocolate() {
    if (chocolateAmount > 0 && ingredientSelected < 3 && chocolateSelected == false) {
        chocolateSelected = true;
        let chocolate = document.querySelector('.chocolate-img');
        chocolate.style.transform = "scale(1.1)";
        chocolateAmount = chocolateAmount - 1;
        let chocolateNum = document.querySelector('.chocolate-num');
        chocolateNum.innerHTML = chocolateAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

function selectFruit() {
    if (fruitAmount > 0 && ingredientSelected < 3 && fruitSelected == false) {
        fruitSelected = true;
        let fruit = document.querySelector('.fruit-img');
        fruit.style.transform = "scale(1.1)";
        fruitAmount = fruitAmount - 1;
        let fruitNum = document.querySelector('.fruit-num');
        fruitNum.innerHTML = fruitAmount;
        ingredientSelected = ingredientSelected + 1;
    }
}

//buying ingredients
function buyFlour() {
    if (coinCount >= flourCost) {
        coinCount = coinCount - flourCost;
        coin.innerHTML = coinCount;
        flourAmount = foodQuantity;
        let flour = document.querySelector('.flour-num');
        flour.innerHTML = flourAmount;
        flourCost = flourCost + 1;
        let flourCostText = document.querySelector('.flour-cost');
        flourCostText.innerHTML = flourCost;
    }
}

function buyEggs() {
    if (coinCount >= eggsCost) {
        coinCount = coinCount - eggsCost;
        coin.innerHTML = coinCount;
        eggsAmount = foodQuantity;
        let eggs = document.querySelector('.eggs-num');
        eggs.innerHTML = eggsAmount;
        eggsCost = eggsCost + 1;
        let eggsCostText = document.querySelector('.eggs-cost');
        eggsCostText.innerHTML = eggsCost;
    }
}

function buySugar() {
    if (coinCount >= sugarCost) {
        coinCount = coinCount - sugarCost;
        coin.innerHTML = coinCount;
        sugarAmount = foodQuantity;
        let sugar = document.querySelector('.sugar-num');
        sugar.innerHTML = sugarAmount;
        sugarCost = sugarCost + 1;
        let sugarCostText = document.querySelector('.sugar-cost');
        sugarCostText.innerHTML = sugarCost;
    }
}

function buyMilk() {
    if (coinCount >= milkCost) {
        coinCount = coinCount - milkCost;
        coin.innerHTML = coinCount;
        milkAmount = foodQuantity;
        let milk = document.querySelector('.milk-num');
        milk.innerHTML = milkAmount;
        milkCost = milkCost + 1;
        let milkCostText = document.querySelector('.milk-cost');
        milkCostText.innerHTML = milkCost;
    }
}

function buyChocolate() {
    if (coinCount >= chocolateCost) {
        coinCount = coinCount - chocolateCost;
        coin.innerHTML = coinCount;
        chocolateAmount = foodQuantity;
        let chocolate = document.querySelector('.chocolate-num');
        chocolate.innerHTML = chocolateAmount;
        chocolateCost = chocolateCost + 1;
        let chocolateCostText = document.querySelector('.chocolate-cost');
        chocolateCostText.innerHTML = chocolateCost;
    }
}

function buyFruit() {
    if (coinCount >= fruitCost) {
        coinCount = coinCount - fruitCost;
        coin.innerHTML = coinCount;
        fruitAmount = foodQuantity;
        let fruit = document.querySelector('.fruit-num');
        fruit.innerHTML = fruitAmount;
        fruitCost = fruitCost + 1;
        let fruitCostText = document.querySelector('.fruit-cost');
        fruitCostText.innerHTML = fruitCost;
    }
}


//appliances
function incrementCoin(amount) {
    coinCount = coinCount + amount;
    coin.innerHTML = coinCount;
}

function trashCan() {
    flourSelected = false;
    chocolateSelected = false;
    sugarSelected = false;
    milkSelected = false;
    fruitSelected = false;
    eggsSelected = false;
    let flour = document.querySelector('.flour-img');
    flour.style.transform = "scale(1)";
    let chocolate = document.querySelector('.chocolate-img');
    chocolate.style.transform = "scale(1)";
    let sugar = document.querySelector('.sugar-img');
    sugar.style.transform = "scale(1)";
    let milk = document.querySelector('.milk-img');
    milk.style.transform = "scale(1)";
    let fruit = document.querySelector('.fruit-img');
    fruit.style.transform = "scale(1)";
    let eggs = document.querySelector('.eggs-img');
    eggs.style.transform = "scale(1)";
    ingredientSelected = 0;
    dishServed = 5;
    let plate = document.querySelector('.plate-img');
    plate.src = "images/plate.webp";
}

function oven() {
    //unselect all selected ingredients
    let flour = document.querySelector('.flour-img');
    flour.style.transform = "scale(1)";
    let chocolate = document.querySelector('.chocolate-img');
    chocolate.style.transform = "scale(1)";
    let sugar = document.querySelector('.sugar-img');
    sugar.style.transform = "scale(1)";
    let milk = document.querySelector('.milk-img');
    milk.style.transform = "scale(1)";
    let fruit = document.querySelector('.fruit-img');
    fruit.style.transform = "scale(1)";
    let eggs = document.querySelector('.eggs-img');
    eggs.style.transform = "scale(1)";
    //set plate to new costume if allowed
    if (eggsSelected && chocolateSelected && flourSelected) {
        let plate = document.querySelector('.plate-img');
        plate.src = "images/cookie.png";
        dishServed = 1;
    } else if (milkSelected && sugarSelected && chocolateSelected) {
        let plate = document.querySelector('.plate-img');
        plate.src = "images/hot-cocoa.png";
        dishServed = 2;
    } else if (milkSelected && flourSelected && fruitSelected) {
        let plate = document.querySelector('.plate-img');
        plate.src = "images/cake.png";
        dishServed = 3;
    } else if (eggsSelected && sugarSelected && fruitSelected) {
        let plate = document.querySelector('.plate-img');
        plate.src = "images/fruit-tart.png";
        dishServed = 4;
    }
        //trash everything
        sugarSelected = false;
        milkSelected = false;
        flourSelected = false;
        chocolateSelected = false;
        fruitSelected = false;
        eggsSelected = false;
        ingredientSelected = 0;
}

function buyUpgrade1() {
    if (coinCount >= upgrade1Cost) {
        coinCount = coinCount - upgrade1Cost;
        setScore(scoreCount + scoreAdder);
        coin.innerHTML = coinCount;
        upgrade1Cost = upgrade1Cost * 1.5;
        upgrade1CostText.innerHTML = upgrade1Cost;
        if (upgrade1Type == 0) {
            scoreAdder = scoreAdder + Math.floor(Math.random() * 3) + 1;
            lineSpeed = lineSpeed + Math.floor(Math.random() * 3) + 1;
            if (lineSpeed > 50) {
                lineSpeed = 50;
            }

        } else if (upgrade1Type == 1) {
            leaveLine = leaveLine - (Math.floor(Math.random() * 3) + 1);
            if (leaveLine < 0) {
                leaveLine = 0;
            }
            scoreAdder = scoreAdder - (Math.floor(Math.random() * 3) + 1);
            if (scoreAdder < 1) {
                scoreAdder = 1;
            }

        } else if (upgrade1Type == 2) {
            foodQuantity = foodQuantity + Math.floor(Math.random() * 3) + 1;
            mealCost = mealCost - (Math.floor(Math.random() * 3) + 1);
            if (mealCost < 1) {
                mealCost = 1;
            }

        } else if (upgrade1Type == 3) {
            mealCost = mealCost + Math.floor(Math.random() * 3) + 1;
            prestigeAdder = prestigeAdder - (Math.floor(Math.random() * 3) + 1);
            if (prestigeAdder < 1) {
                prestigeAdder = 1;
            }
        }
        setUpgrade1();
    }
}

function buyUpgrade2() {
    if (coinCount >= upgrade2Cost) {
        coinCount = coinCount - upgrade2Cost;
        setScore(scoreCount + scoreAdder);
        coin.innerHTML = coinCount;
        upgrade2Cost = upgrade2Cost * 1.5;
        upgrade2CostText.innerHTML = upgrade2Cost;
        if (upgrade2Type == 0) {
            prestigeAdder = prestigeAdder + Math.floor(Math.random() * 3) + 1;
            tipAdder = tipAdder - (Math.floor(Math.random() * 3) + 1);
            if (tipAdder < 1) {
                tipAdder = 1;
            }
        } else if (upgrade2Type == 1) {
            scoreAdder = scoreAdder + Math.floor(Math.random() * 3) + 1;
            mealCost = mealCost - (Math.floor(Math.random() * 3) + 1);
            if (mealCost < 1) {
                mealCost = 1;
            }
        } else if (upgrade2Type == 2) {
            tipAdder = tipAdder + Math.floor(Math.random() * 3) + 1;
            leaveLine = leaveLine + (Math.floor(Math.random() * 3) + 1);
        } else if (upgrade2Type == 3) {
            lineSpeed = lineSpeed - (Math.floor(Math.random() * 3) + 1);
            if (lineSpeed < 1) {
                lineSpeed = 1;
            }
            foodQuantity = foodQuantity - (Math.floor(Math.random() * 3) + 1);
            if (foodQuantity < 1) {
                foodQuantity = 1;
            }

        }
        setUpgrade2();
    }
}

//separate upgradeSetter (also called at start)
function setUpgrade1() {
    let x = Math.floor(Math.random() * 4);
    while (x == upgrade1Type) {
        x = Math.floor(Math.random() * 4);
    }
    upgrade1Type = x;
    //apply image based on upgrade type
    if (upgrade1Type == 0) {
        let upgradeName = document.querySelector('.upgrade1Title');
        upgradeName.innerHTML = "Quicker Lines";
        let upgradeDesc = document.querySelector('.upgrade1Description');
        upgradeDesc.innerHTML = "Better Reviews,<br />Shorter Wait";
    } else if (upgrade1Type == 1) {
        let upgradeName = document.querySelector('.upgrade1Title');
        upgradeName.innerHTML = "Friendly Staff";
        let upgradeDesc = document.querySelector('.upgrade1Description');
        upgradeDesc.innerHTML = "Happier Customers,<br />Worse Productivity";
    } else if (upgrade1Type == 2) {
        let upgradeName = document.querySelector('.upgrade1Title');
        upgradeName.innerHTML = "Expand Pantry";
        let upgradeDesc = document.querySelector('.upgrade1Description');
        upgradeDesc.innerHTML = "More Storage,<br />Less Income";
    } else if (upgrade1Type == 3) {
        let upgradeName = document.querySelector('.upgrade1Title');
        upgradeName.innerHTML = "Raise Prices";
        let upgradeDesc = document.querySelector('.upgrade1Description');
        upgradeDesc.innerHTML = "More Sales,<br />Worse Reputation";
    }
}

function setUpgrade2() {
    let x = Math.floor(Math.random() * 4);
    while (x == upgrade2Type) {
        x = Math.floor(Math.random() * 4);
    }
    upgrade2Type = x;
    if (upgrade2Type == 0) {
        let upgradeName = document.querySelector('.upgrade2Title');
        upgradeName.innerHTML = "Decorate Storefront";
        let upgradeDesc = document.querySelector('.upgrade2Description');
        upgradeDesc.innerHTML = "Better Reputation,<br />Less Income";
    } else if (upgrade2Type == 1) {
        let upgradeName = document.querySelector('.upgrade2Title');
        upgradeName.innerHTML = "Fix Leaks";
        let upgradeDesc = document.querySelector('.upgrade2Description');
        upgradeDesc.innerHTML = "Higher Quality,<br />Costly Repair";
    } else if (upgrade2Type == 2) {
        let upgradeName = document.querySelector('.upgrade2Title');
        upgradeName.innerHTML = "Good Seating";
        let upgradeDesc = document.querySelector('.upgrade2Description');
        upgradeDesc.innerHTML = "Better Tips,<br />Picky Customers";
    } else if (upgrade2Type == 3) {
        let upgradeName = document.querySelector('.upgrade2Title');
        upgradeName.innerHTML = "Large Waiting Area";
        let upgradeDesc = document.querySelector('.upgrade2Description');
        upgradeDesc.innerHTML = "Longer Wait,<br />Smaller Storage";
    }
}

function calendarUpdate() {
    if (calendarTimer == 0) {
        //set all ex imgs to opacity 0
        let ex = document.querySelector('.ex1');
        ex.style.opacity = 1;
        ex = document.querySelector('.ex2');
        ex.style.opacity = 0;
        ex = document.querySelector('.ex3');
        ex.style.opacity = 0;
        ex = document.querySelector('.ex4');
        ex.style.opacity = 0;
        ex = document.querySelector('.ex5');
        ex.style.opacity = 0;
        ex = document.querySelector('.ex6');
        ex.style.opacity = 0;
        ex = document.querySelector('.ex7');
        ex.style.opacity = 0;
        
    }

    if (calendarTimer == 1) {
        let ex = document.querySelector('.ex2');
        ex.style.opacity = 1;
    }
    if (calendarTimer == 2) {
        let ex = document.querySelector('.ex3');
        ex.style.opacity = 1;
    }
    if (calendarTimer == 3) {
        let ex = document.querySelector('.ex4');
        ex.style.opacity = 1;
    }
    if (calendarTimer == 4) {
        let ex = document.querySelector('.ex5');
        ex.style.opacity = 1;
    }
    if (calendarTimer== 5) {
        let ex = document.querySelector('.ex6');
        ex.style.opacity = 1;
    }
    if (calendarTimer == 6) {
        let ex = document.querySelector('.ex7');
        ex.style.opacity = 1;
    }
}


//utilities
function turnoffUtility() {
    if (faucetOn == false && lightningOn == false && fireOn == false) {
        /*navigate to game over screen*/
        localStorage.setItem("score", scoreCount);
        window.location.href = "gameover.html";
    }
    let x = Math.floor(Math.random() * 3);
    if (x == 0) {
        let utility = document.getElementById('utility-img0');
        utility.style.opacity = 0.5;
        fireOn = false;
    } else if (x == 1) {
        let utility = document.getElementById('utility-img1');
        utility.style.opacity = 0.5;
        lightningOn = false;
    } else if (x == 2) {
        let utility = document.getElementById('utility-img2');
        utility.style.opacity = 0.5;
        faucetOn = false;
    }
        
    
}

function turnonFire() { 
    if (fireOn == false && coinCount >= fireCost) {
        let utility = document.getElementById('utility-img0');
        utility.style.opacity = 1;
        fireOn = true;
        coinCount = coinCount - fireCost;
        coin.innerHTML = coinCount;
        fireCost = fireCost * 1.5;
        let fireCostText = document.querySelector('.fire-cost');
        fireCostText.innerHTML = fireCost;
    }
}

function turnonLightning() { 
    if (lightningOn == false && coinCount >= lightningCost) {
        let utility = document.getElementById('utility-img1');
        utility.style.opacity = 1;
        lightningOn = true;
        coinCount = coinCount - lightningCost;
        coin.innerHTML = coinCount;
        lightningCost = lightningCost * 1.5;
        let lightningCostText = document.querySelector('.lightning-cost');
        lightningCostText.innerHTML = lightningCost;
    }
}

function turnonFaucet() { 
    if (faucetOn == false && coinCount >= faucetCost) {
        let utility = document.getElementById('utility-img2');
        utility.style.opacity = 1;
        faucetOn = true;
        coinCount = coinCount - faucetCost;
        coin.innerHTML = coinCount;
        faucetCost = faucetCost * 1.5;
        let faucetCostText = document.querySelector('.faucet-cost');
        faucetCostText.innerHTML = faucetCost;
    }
}

//witch
function makeOffer() {
    witch.style.opacity = 1;
    hexType = Math.floor(Math.random() * 4);
    let text = document.querySelector('.witch-dialogue');
    if (hexType == 0) {
        text.innerHTML = "Huzzah! Let me peer into my crystal ball... I can bless you with exceptional precognition.  Your customers will be OVERWHELMED with your foresight... or maybe just creeped out.";
        //multiply scoreAdder by 2 or lower actual prestige
    } else if (hexType == 1) {
        text.innerHTML = "Whilst exploring the Upper Planes, I came across an angelic milk maid selling these fascinating Exotic Butters.  Sure to be a hit with your customers, if the rest of your wares don't spoil first.";
        //boost prestigeAdder or lower foodQuantity and update everthing
    } else if (hexType == 2) {
        text.innerHTML = "I'll start by saying this is NOT a pyramid scheme.  But I have come across a prestine scroll of alchemy.  Sure to double your gold... once it enters my cauldron at home." ;
        //double coinCount or lose half of it
    } else if (hexType == 3) {
        text.innerHTML = "BOO!  You must be tired of paying your workers.  Let me be of service.  I'm sure I could RAISE an interest in the open positions here.  Just don't count on them being the life of the party!";
        //lower mealcost to pay for grieving relatives or boost tip jar because zombies don't worry about tips
    }

}

function onAccept() {
    if (hexType < 4) {
        let y = Math.floor(Math.random() * 2);
        let text = document.querySelector('.witch-dialogue');
        if (hexType == 0) {
            if (y == 0) {
                scoreAdder = scoreAdder * 2;
                text.innerHTML = "Your customers are very impressed with your ability to see their every need before they do.";

            } else if (y == 1) {
                setPrestige(prestigeCount - 5);
                text.innerHTML = "Your customers are very creeped out by your ability to see their every need before they do.";
            }
            
        } else if (hexType == 1) {
            if (y == 0) {
                prestigeAdder = prestigeAdder * 2;
                text.innerHTML = "Your customers are very impressed with otherworldly flavors of your pastries.";

            } else if (y == 1) {
                foodQuantity = foodQuantity - 5;
                if (foodQuantity < 1) {
                    foodQuantity = 1;
                }
                text.innerHTML = "The exotic butters spoil and ruin the rest of your food.";
            }
        } else if (hexType == 2) {
            if (y == 0) {
                coinCount = coinCount * 2;
                coin.innerHTML = coinCount;
                text.innerHTML = "It worked?! I mean, I told you it would work! Enjoy twice the gold you began with!";
            } else if (y == 1) {
                coinCount = coinCount / 2;
                coin.innerHTML = coinCount;
                text.innerHTML = "Whoops! Forgot to carry the 5.  Half your gold is gone, silly me!";
            }
        } else if (hexType == 3) {
            if (y == 0) {
                mealCost = mealCost - 5;
                if (mealCost < 1) {
                    mealCost = 1;
                }
                text.innerHTML = "Your new employees are HUNGRY.  Perhaps too hungry.  You promise discounts to all customers bitten.";
            } else if (y == 1) {
                tipAdder = tipAdder * 2;
                text.innerHTML = "Your new employees are very cheap, with some serious DEADpan humor to boot.  They don't complain about not getting tips.";
            }
        }
        witch.style.opacity = 0;
        witchTimer = 0;
        hexType = 4;
    }
}

function onDecline() {
    if (hexType < 4) {
        let text = document.querySelector('.witch-dialogue');
        text.innerHTML = "The witch will return in time...";
        witch.style.opacity = 0;
        witchTimer = 0;
        hexType = 4;
    }
}
