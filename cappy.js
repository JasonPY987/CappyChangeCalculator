document.addEventListener('DOMContentLoaded', function () {
    // Select key DOM elements
    const cappyText = document.getElementById('cappyText');
    const amountOwedSpan = document.getElementById('amount-owed');
    const amountGivenInput = document.getElementById('amount-given');
    const giveDoubloonsButton = document.getElementById('give-doubloons');
    const doubloonsDisplay = document.getElementById('doubloons-display');
    const doubloonImages = document.getElementById('doubloon-images');

    // Generate a random amount owed by the user
    let amountOwed = generateRandomAmount();
    typeText(`Argh, pirate! You owe me ${amountOwed} doubloons!`, cappyText);

    // Event listener for the button click
    giveDoubloonsButton.addEventListener('click', function () {
        const amountGiven = parseFloat(amountGivenInput.value);

        // Validate the input amount
        if (isNaN(amountGiven) || amountGiven <= 0) {
            typeText('Argh, enter a valid amount, matey!', cappyText);
            return;
        }

        // Calculate the change
        const change = amountGiven - amountOwed;

        // If the given amount is less than the owed amount, inform the user
        if (change < 0) {
            const amountStillOwed = Math.abs(change);
            const doubloonWord = amountStillOwed === 1 ? 'doubloon' : 'doubloons';
            typeText(`Argh, ye owe me ${amountStillOwed} more ${doubloonWord}!`, cappyText);
            return;
        }

        // Calculate and display the doubloons to be returned as change
        const doubloons = calculateDoubloons(change);
        displayDoubloons(doubloons);
        typeText(`Argh, here is ${change} doubloons back!`, cappyText);

        // Generate a new random amount owed
        amountOwed = generateRandomAmount();
        setTimeout(() => typeText(`Argh, pirate! You owe me ${amountOwed} doubloons!`, cappyText), 3000);
    });

    // Function to type text character by character
    function typeText(text, element) {
        element.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 50);
    }

    // Function to generate a random amount owed
    function generateRandomAmount() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Function to calculate the doubloons to be returned as change
    function calculateDoubloons(change) {
        const doubloonValues = [10, 5, 1];
        const doubloons = { '10': 0, '5': 0, '1': 0 };

        // Calculate the number of each doubloon denomination
        doubloonValues.forEach(value => {
            doubloons[value] = Math.floor(change / value);
            change %= value;
        });

        return doubloons;
    }

    // Function to display the doubloons as images
    function displayDoubloons(doubloons) {
        doubloonImages.innerHTML = ''; // Clear previous images

        // Create and append image elements for each doubloon
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
