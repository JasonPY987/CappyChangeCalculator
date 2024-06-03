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
    displayTotalChange(amountDue, amountReceived);
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
    const container = document.getElementById('changeOutput');
    container.innerHTML = ''; // Clear previous results

    const categories = {
        'Dollars': ['20', '10', '5', '2', '1'],
        'Cents': ['0.25', '0.10', '0.05', '0.01']
    };

    Object.keys(categories).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);
        container.appendChild(categoryDiv);

        categories[category].forEach(key => {
            if (denominations[key] > 0) {
                const denominationDiv = document.createElement('div');
                denominationDiv.className = 'denomination';
                categoryDiv.appendChild(denominationDiv);

                const imagesContainer = document.createElement('div');
                imagesContainer.className = 'images-container';
                denominationDiv.appendChild(imagesContainer);

                for (let i = 0; i < denominations[key]; i++) {
                    const img = document.createElement('img');
                    img.src = getImageSrc(key);
                    img.className = 'money-img';
                    imagesContainer.appendChild(img);
                    animateImageEntry(img);
                }

                const countLabel = document.createElement('span');
                countLabel.className = 'count-label';
                countLabel.textContent = `x${denominations[key]}`;
                denominationDiv.appendChild(countLabel);
            }
        });
    });
}

function animateImageEntry(image) {
    image.style.opacity = '0';
    image.style.transition = 'opacity 0.5s, transform 0.5s';
    image.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        image.style.opacity = '1';
        image.style.transform = 'translateY(0)';
    }, 10); // Delay to allow CSS to recognize the transition
}

function getImageSrc(key) {
    switch (key) {
        case '0.25': return 'assets/images/quarter.jpg';
        case '0.10': return 'assets/images/dime.jpg';
        case '0.05': return 'assets/images/nickel.jpg';
        case '0.01': return 'assets/images/penny.jpg';
        default: return `assets/images/${key}-dollar.jpg`;
    }
}

document.getElementById('show-total-change').addEventListener('click', function() {
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
    displayTotalChange(amountDue, amountReceived);
});

function displayTotalChange(due, received) {
    const change = received - due;
    const totalChangeOutput = document.getElementById('totalChangeOutput');
    totalChangeOutput.textContent = `Total Change: $${change.toFixed(2)}`;
}
