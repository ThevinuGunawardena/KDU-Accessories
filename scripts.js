let cartCount = 0;
const cartItems = [];

function addToCart(product, ...details) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    cartItems.push({ product, details });
    updateCartPopup();
}

function updateCartPopup() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.product} (${item.details.join(' ')})
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(listItem);
    });
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    cartCount--;
    document.getElementById('cart-count').innerText = cartCount;
    updateCartPopup();
}



function validateShoulderApplet() {
    const faculty = document.getElementById('color').value;
    const year = document.getElementById('stripes').value;
    document.getElementById('shoulder-applet-add-to-cart').disabled = !faculty || !year;
}

function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = cartPopup.style.display === 'none' || cartPopup.style.display === '' ? 'block' : 'none';
}

function openCheckoutPopup() {
    document.getElementById('backdrop').style.display = 'block';
    document.getElementById('checkout-popup').style.display = 'block';
    document.getElementById('total-orders').innerText = cartCount;
    displayOrderDetails();
}

function closeCheckoutPopup() {
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById('checkout-popup').style.display = 'none';
}

function displayOrderDetails() {
    const orderDetailsDiv = document.getElementById('order-details');
    orderDetailsDiv.innerHTML = '';
    cartItems.forEach(item => {
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `<strong>${item.product}:</strong> ${item.details.join(' ')}`;
        orderDetailsDiv.appendChild(detailDiv);
    });
}

function submitPayment() {
    const paymentSlip = document.getElementById('payment-slip').files[0];
    if (paymentSlip) {
        alert("Payment slip uploaded successfully! Thank you for your purchase.");
        closeCheckoutPopup();
        // Additional logic to handle file upload and submission can be added here.
    } else {
        alert("Please upload your payment slip.");
    }
}


function submitPayment() {
    const paymentSlip = document.getElementById('payment-slip').files[0];
    if (paymentSlip) {
        const formData = new FormData();
        formData.append('payment-slip', paymentSlip);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            closeCheckoutPopup();
            showConfirmationPopup();
        })
        .catch(error => {
            alert('Error uploading payment slip.');
            console.error('Error:', error);
        });
    } else {
        alert("Please upload your payment slip.");
    }
}

function showConfirmationPopup() {
    const confirmationPopup = document.getElementById('confirmation-popup');
    confirmationPopup.style.display = 'block';
}

function closeConfirmationPopup() {
    const confirmationPopup = document.getElementById('confirmation-popup');
    confirmationPopup.style.display = 'none';
}



// NAMETAG
function validateNameTag() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    document.getElementById('name-tag-add-to-cart').disabled = !firstName || !lastName;
}



// display the name in name tag
function displayNames() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;

    if (firstName && lastName) {
        document.getElementById("display-first-name").textContent = firstName;
        document.getElementById("display-last-name").textContent = lastName;
        document.getElementById("name-tag").style.visibility = "visible";
    } else {
        alert("Please enter both first and last names.");
    }
}


// applet

function updateStripes() {
    const AppletPreview = document.getElementById('AppletPreview');
    const numberOfStripes = document.getElementById('stripes').value;
    const color = document.getElementById('color').value;

    // Clear existing stripes
    AppletPreview.innerHTML = '';

    // Add new stripes
    for (let i = 0; i < numberOfStripes; i++) {
        const stripe = document.createElement('div');
        stripe.className = 'stripe';
        stripe.style.backgroundColor = color;
        stripe.style.marginRight = '10px';
        
        AppletPreview.appendChild(stripe);
    }
}

// Initialize with default values
updateStripes();