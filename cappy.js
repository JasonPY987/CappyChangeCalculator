document.addEventListener('DOMContentLoaded', function () {
    const cappyText = document.getElementById('cappyText');
    const amountOwedSpan = document.getElementById('amount-owed');
    const amountGivenInput = document.getElementById('amount-given');
    const giveDoubloonsButton = document.getElementById('give-doubloons');
    const doubloonsDisplay = document.getElementById('doubloons-display');
    const doubloonImages = document.getElementById('doubloon-images');

    let amountOwed = generateRandomAmount();
    typeText(`Argh, pirate! You owe me ${amountOwed} doubloons!`, cappyText);

    giveDoubloonsButton.addEventListener('click', function () {
        const amountGiven = parseFloat(amountGivenInput.value);

        if (isNaN(amountGiven) || amountGiven <= 0) {
            typeText('Argh, enter a valid amount, matey!', cappyText);
            return;
        }

        const change = amountGiven - amountOwed;

        if (change < 0) {
            typeText('Argh, ye owe me more doubloons!', cappyText);
            return;
        }

        const doubloons = calculateDoubloons(change);
        displayDoubloons(doubloons);
        typeText(`Argh, here is ${change} doubloons back!`, cappyText);
        amountOwed = generateRandomAmount();
        setTimeout(() => typeText(`Argh, pirate! You owe me ${amountOwed} doubloons!`, cappyText), 3000);
    });

    function typeText(text, element) {
        element.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 50);
    }

    function generateRandomAmount() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function calculateDoubloons(change) {
        const doubloonValues = [10, 5, 1];
        const doubloons = { '10': 0, '5': 0, '1': 0 };

        doubloonValues.forEach(value => {
            doubloons[value] = Math.floor(change / value);
            change %= value;
        });

        return doubloons;
    }

    function displayDoubloons(doubloons) {
        doubloonImages.innerHTML = ''; // Clear previous images

        Object.keys(doubloons).forEach(value => {
            for (let i = 0; i < doubloons[value]; i++) {
                const img = document.createElement('img');
                img.src = `assets/images/${value}doubloons.png`;
                img.alt = `${value} doubloon`;
                img.className = 'doubloon-img';
                img.style.animation = `dropDown ${0.5 + i * 0.1}s ease-out`; // Adding delay to each coin
                doubloonImages.appendChild(img);
            }
        });
        //doubloonsDisplay.textContent = `Doubloons Returned: ${Object.values(doubloons).reduce((a, b) => a + b, 0)}`;
    }
});
