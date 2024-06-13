document.getElementById('calculate-change').addEventListener('click', function() {
    const amountDue = parseFloat(document.getElementById('amount-due').value);
    const amountReceived = parseFloat(document.getElementById('amount-received').value);

    if (isNaN(amountDue) || isNaN(amountReceived) || amountDue <= 0 || amountReceived <= 0) {
        alert("Please enter valid positive numbers for both amounts.");
        return;
    }
    if (amountReceived < amountDue) {
        alert('Received amount is less than the due amount. No change can be calculated.');
        return;
    }

    const change = calculateChange(amountDue, amountReceived);
    displayChange(change);

    document.getElementById('totalChangeOutput').textContent = 'Total Change: $0.00';
    document.getElementById('totalChangeOutput').dataset.total = (amountReceived - amountDue).toFixed(2);
});

function calculateChange(due, received) {
    let change = received - due;
    let denominations = { '20': 0, '10': 0, '5': 0, '2': 0, '1': 0, '0.25': 0, '0.10': 0, '0.05': 0, '0.01': 0 };

    change = parseFloat(change.toFixed(2));

    Object.keys(denominations).sort((a, b) => b - a).forEach(key => {
        const value = parseFloat(key);
        denominations[key] = Math.floor(change / value);
        change = parseFloat((change - denominations[key] * value).toFixed(2));
    });

    return denominations;
}

function displayChange(denominations) {
    const totalDollars = denominations['20'] * 20 + denominations['10'] * 10 + denominations['5'] * 5 + denominations['2'] * 2 + denominations['1'];
    document.getElementById('dollars-output').textContent = totalDollars;
    document.getElementById('quarters-output').textContent = denominations['0.25'];
    document.getElementById('dimes-output').textContent = denominations['0.10'];
    document.getElementById('nickels-output').textContent = denominations['0.05'];
    document.getElementById('pennies-output').textContent = denominations['0.01'];

    document.getElementById('dollars-display').textContent = `Dollars: ${totalDollars}`;
    document.getElementById('quarters-display').textContent = `Quarters: ${denominations['0.25']}`;
    document.getElementById('dimes-display').textContent = `Dimes: ${denominations['0.10']}`;
    document.getElementById('nickels-display').textContent = `Nickels: ${denominations['0.05']}`;
    document.getElementById('pennies-display').textContent = `Pennies: ${denominations['0.01']}`;

    const imageGroup = document.getElementById('money-images');
    imageGroup.innerHTML = ''; // Clear previous images

    const categories = {
        'Dollars': ['20', '10', '5', '2', '1'],
        'Cents': ['0.25', '0.10', '0.05', '0.01']
    };

    Object.keys(categories).forEach(category => {
        categories[category].forEach(key => {
            if (denominations[key] > 0) {
                for (let i = 0; i < denominations[key]; i++) {
                    const img = document.createElement('img');
                    img.src = getImageSrc(key);
                    img.className = `money-img ${category.toLowerCase().slice(0, -1)}`;
                    img.style.animationDelay = `${i * 0.1}s`;
                    imageGroup.appendChild(img);
                }
            }
        });
    });
}

function getImageSrc(key) {
    switch (key) {
        case '0.25': return 'assets/images/Quarter.png';
        case '0.10': return 'assets/images/Dime.png';
        case '0.05': return 'assets/images/Nickel.png';
        case '0.01': return 'assets/images/Penny.png';
        default: return `assets/images/${key}-dollar.jpg`;
    }
}

document.getElementById('show-total-change').addEventListener('click', function() {
    const totalChange = parseFloat(document.getElementById('totalChangeOutput').dataset.total);
    animateTotalChange(0, totalChange);
});

function animateTotalChange(start, end) {
    const totalChangeOutput = document.getElementById('totalChangeOutput');
    const startValue = parseFloat(start);
    const endValue = parseFloat(end);
    const duration = 2000;
    const frameRate = 60;
    const step = (endValue - startValue) / (duration / frameRate);

    let currentValue = startValue;
    const intervalId = setInterval(() => {
        currentValue += step;
        if (currentValue >= endValue) {
            currentValue = endValue;
            clearInterval(intervalId);
        }
        totalChangeOutput.textContent = `Total Change: $${currentValue.toFixed(2)}`;
    }, 1000 / frameRate);
}

document.getElementById('toggle-view').addEventListener('click', function() {
    document.querySelector('.change-group').classList.toggle('hidden');
    document.getElementById('money-images').classList.toggle('hidden');
});


//redirect to cappy land! 
document.getElementById('cappyButton').addEventListener('click', function() {
    window.location.href = 'cappy.html';
});