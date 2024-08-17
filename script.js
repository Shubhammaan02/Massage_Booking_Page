document.addEventListener('DOMContentLoaded', function() {
    const addServiceButtons = document.querySelectorAll(".add-service-btn");
    const addMButtons = document.querySelectorAll('.addMbutton');
    const addXButtons = document.querySelectorAll('.addXbutton');
    const detailsSection = document.querySelector('.detailsSection');
    const addCard = document.querySelector('.add-card');
    const paymentSummary = document.querySelector('.paymentinner');
    const hidecard1 = document.querySelector('.hidecard1');
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    const quantityMeter = document.querySelectorAll('.quantity-meter');
    const pichhehato = document.querySelectorAll('.Xback-button');
    const backXback = document.getElementById('Xback');
    const detailsButton = document.querySelectorAll('.detailsHere');
    const addonsdetails = document.querySelector('.addonsdetails');
    const closeModalButtons = document.querySelectorAll(".icon-button");
    // cart js
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    const cartPopup2 = document.getElementById('cart-popup2');
    const closePopup = document.getElementById('close-popup');
    const closePopup2 = document.getElementById('close-popup2');
    const itemCount = document.getElementById('item-count');
    const emptyCart = document.getElementById('empty-cart');
    const fullCart = document.getElementById('cartFull');
    const cartItems = document.getElementById('cart-items');
    const viewMenuButtons = document.querySelectorAll('#view-menu');
    const homePageButtons = document.querySelectorAll('#home-page');
    
    let selectedMassages = [];

    // Function to update the payment summary
    function updatePaymentSummary() {
        let serviceTotal = 0;
        let serviceDiscountTotal = 0;
        let totalSavings = 0;

        selectedMassages.forEach((massage, index) => {
            const nameElement = document.getElementById(`massage${index + 1}-name`);
            const nameElement2 = document.getElementById(`massage${index + 1}-name2`);
            const priceElement = document.getElementById(`massage${index + 1}-price`);
            const priceElement2 = document.getElementById(`massage${index + 1}-price2`);
            const discountPriceElement = document.getElementById(`massage${index + 1}-discount-price`);
            const discountPriceElement2 = document.getElementById(`massage${index + 1}-discount-price2`);

            if (nameElement && priceElement && discountPriceElement) {
                nameElement.textContent = `${massage.name} (${massage.duration}) x ${massage.quantity}`;
                priceElement.textContent = (massage.price * massage.quantity).toFixed(2);
                discountPriceElement.textContent = (massage.discountPrice * massage.quantity).toFixed(2);

                serviceTotal += massage.price * massage.quantity;
                serviceDiscountTotal += massage.discountPrice * massage.quantity;
            }
            
            if (nameElement2 && priceElement2 && discountPriceElement2) {
                nameElement2.textContent = `${massage.name} (${massage.duration}) x ${massage.quantity}`;
                priceElement2.textContent = (massage.price * massage.quantity).toFixed(2);
                discountPriceElement2.textContent = (massage.discountPrice * massage.quantity).toFixed(2);
            }
        });
        
        totalSavings = serviceTotal - serviceDiscountTotal;

        document.getElementById('service-total').textContent = serviceTotal.toFixed(2);
        document.getElementById('service-total2').textContent = serviceTotal.toFixed(2);
        document.getElementById('service-discount-total').textContent = serviceDiscountTotal.toFixed(2);
        document.getElementById('service-discount-total2').textContent = serviceDiscountTotal.toFixed(2);
        document.getElementById('total-savings').textContent = totalSavings.toFixed(2);
        document.getElementById('total-savings2').textContent = totalSavings.toFixed(2);
        
        const gst = serviceDiscountTotal * 0.18;
        document.getElementById('gst').textContent = gst.toFixed(2);
        document.getElementById('gst2').textContent = gst.toFixed(2);
        document.getElementById('service-total-gst').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('service-total-gst2').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('total-to-pay').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('total-to-pay2').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay1').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay2').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay3').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay4').textContent = (serviceDiscountTotal).toFixed(2);
        document.getElementById('final-to-pay5').textContent = (serviceDiscountTotal).toFixed(2);

        // Display or hide summary sections based on the selected massages
        document.querySelectorAll('.inrow').forEach(row => {
            row.style.display = 'none';
        });

        document.querySelectorAll('.savemoneyinrow').forEach(row => {
            row.style.display = 'none';
        });

        document.querySelectorAll('.gstinrow').forEach(row => {
            row.style.display = 'none';
        });
        
        selectedMassages.forEach((_, index) => {
            const summaryRow = document.getElementById(`massage${index + 1}-summary`);
            if (summaryRow) {
                summaryRow.style.display = 'flex';
            }
        });
        
        selectedMassages.forEach((_, index) => {
            const summaryRow2 = document.getElementById(`massage${index + 1}-summary2`);
            if (summaryRow2) {
                summaryRow2.style.display = 'flex';
            }
        });

        const serviceTotalRow = document.getElementById('servicetotal');
        if (serviceTotalRow) {
            serviceTotalRow.style.display = 'flex';
        }
        
        const serviceTotalRow2 = document.getElementById('servicetotal2');
        if (serviceTotalRow2) {
            serviceTotalRow2.style.display = 'flex';
        }

        document.querySelectorAll('.inrow.total').forEach(row => {
            row.style.display = 'flex';
        });
        
        document.querySelectorAll('.savemoneyinrow').forEach(row => {
            row.style.display = 'flex';
        });

        document.querySelectorAll('.gstinrow').forEach(row => {
            row.style.display = 'flex';
        });
        
        // Update the cart
        updateCart();
    }
    
    // Function to extract massage data from payment summary into cart
    function extractMassageData() {
        const selectedMassages = [];
        document.querySelectorAll('.inrow').forEach((row, index) => {
            const nameElement = row.querySelector(`#massage${index + 1}-name`);
            const discountPriceElement = row.querySelector(`#massage${index + 1}-discount-price`);
            const quantityElement = row.querySelector(`#massage${index + 1}-quantity`);
            const durationElement = row.querySelector(`#massage${index + 1}-duration`); // Get the duration element

            if (nameElement && discountPriceElement && nameElement.textContent.trim() !== '') {
                const massage = {
                    name: nameElement.textContent.trim(),
                    discountPrice: parseFloat(discountPriceElement.textContent.trim()),
                    quantity: quantityElement ? parseInt(quantityElement.textContent.trim()) : 1,
                    duration: durationElement ? durationElement.textContent.trim() : '' // Add the duration property
                };
                selectedMassages.push(massage);
            }
        });
        
        // const totalPriceElement = document.getElementById('serviceDiscountTotal');
        const totalPriceElement = document.getElementById('service-discount-total');
        const totalPrice = totalPriceElement ? parseFloat(totalPriceElement.textContent.trim()) : 0;
        return { selectedMassages, totalPrice };
    }

    // Update item count badge
    function updateItemCount(count) {
        itemCount.textContent = count;
    }

    // Render cart items
    function renderCartItems(items) {
        cartItems.innerHTML = '';
        if (items.selectedMassages.length === 0) {
            emptyCart.style.display = 'block';
            fullCart.style.display = 'none';
        } else {
            emptyCart.style.display = 'none';
            fullCart.style.display = 'block';
            items.selectedMassages.forEach((massage, index) => {
                
                let li = document.createElement('li');
                li.classList.add('cart-item');
                li.dataset.index = index;
                li.innerHTML = `
                    <div class="cart-handle-btn">
                        <span class="cart-item-name">${massage.name} (${massage.duration}) x ${massage.quantity}</span>
                        <span class="cart-item-price">₹${(massage.discountPrice * massage.quantity).toFixed(2)}</span>
                        <div class="trio-btn">
                            <button class="cart-decrement">-</button>
                            <span class="quantity">${massage.quantity}</span>
                            <button class="cart-increment">+</button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(li);
            });
            addCartEventListeners();  // Add event listeners to the new buttons
        }
    }

    // Function to update cart display
    function updateCart() {
        const { selectedMassages, totalPrice } = extractMassageData();
        updateItemCount(selectedMassages.length);
        renderCartItems({ selectedMassages, totalPrice: calculateTotalPrice() });
    }
    
    // Event listeners for cart item buttons
     function addCartEventListeners() {
        document.querySelectorAll('.cart-increment').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').dataset.index, 10);
                selectedMassages[index].quantity++;
                updatePaymentSummary();
                renderCartItems({ selectedMassages, totalPrice: calculateTotalPrice() });
            });
        });
    
        document.querySelectorAll('.cart-decrement').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').dataset.index, 10);
                if (selectedMassages[index].quantity > 1) {
                    selectedMassages[index].quantity--;
                } else {
                    selectedMassages.splice(index, 1);
                }
                updatePaymentSummary();
                renderCartItems({ selectedMassages, totalPrice: calculateTotalPrice() });
            });
        });
    }
    
    function calculateTotalPrice() {
        return selectedMassages.reduce((acc, massage) => acc + massage.discountPrice * massage.quantity, 0);
    }
    
    // Show the appropriate popup on cart button click
    cartButton.addEventListener('click', () => {
        updateCart();
        const { selectedMassages } = extractMassageData();
        if (selectedMassages.length === 0) {
            cartPopup.classList.remove('hidden');
            cartPopup2.classList.add('hidden');
        } else {
            cartPopup.classList.add('hidden');
            cartPopup2.classList.remove('hidden');
        }
    });

    // Close the popups
    closePopup.addEventListener('click', () => {
        cartPopup.classList.add('hidden');
    });
    closePopup2.addEventListener('click', () => {
        cartPopup2.classList.add('hidden');
    });
    
    // Attach event listeners to quantity buttons
    addMButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            selectedMassages[index].quantity = (selectedMassages[index].quantity || 0) + 1;
            updatePaymentSummary();
        });
    });
    
    addXButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (selectedMassages[index].quantity > 0) {
                selectedMassages[index].quantity--;
                if (selectedMassages[index].quantity === 0) {
                    selectedMassages.splice(index, 1);
                }
                updatePaymentSummary();
            }
        });
    });
    updatePaymentSummary();

    // Make the button draggable
    cartButton.addEventListener('mousedown', (event) => {
        let shiftX = event.clientX - cartButton.getBoundingClientRect().left;
        let shiftY = event.clientY - cartButton.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            cartButton.style.left = pageX - shiftX + 'px';
            cartButton.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    cartButton.addEventListener('dragstart', () => {
        return false;
    });

    addServiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.closest(".boxcard").getAttribute("data-service");
            const modals = document.querySelectorAll('.crazymodal');

            modals.forEach(modal => {
                const modalHeader = modal.querySelector('.addOnMassageHeading');
                if (modalHeader && modalHeader.textContent.includes(service)) {
                    modal.style.display = "block";
                }
            });
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".crazymodal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    detailsButton.forEach(button => {
        button.addEventListener('click', function() {
            addonsdetails.style.display = 'block';
        });
    });

    pichhehato.forEach(button => {
        button.addEventListener('click', function() {
            const massageModal = this.closest(".crazymodal");
            if (massageModal) {
                massageModal.style.display = 'none';
            }
        });
    });

    backXback.addEventListener('click', function() {
        addonsdetails.style.display = 'none';
    });
    
    addMButtons.forEach(addButton => {
        addButton.addEventListener('click', function() {
            detailsSection.style.display = 'none';
            addCard.style.display = 'block';
            hidecard1.style.display = 'block';
            paymentSummary.style.display = 'block';

            // Show the corresponding quantity selector
            const quantitySelector = this.nextElementSibling;
            if (quantitySelector) {
                quantitySelector.style.display = 'block';
            }
            this.style.display = 'none';
        
            // Get massage details
            const massageCard = this.closest('.massage-details');
            const duration = massageCard.querySelector('.duration').textContent;
            const price = parseFloat(massageCard.querySelector('.feedelprice').textContent);
            const discountPrice = parseFloat(massageCard.querySelector('.feePrice').textContent);
            const name = this.closest('.massage-card').querySelector('.massageCardHeading').textContent;

            const existingMassageIndex = selectedMassages.findIndex(massage => massage.name === name && massage.duration === duration);

            if (existingMassageIndex === -1) {
                selectedMassages.push({
                    name,
                    duration,
                    price,
                    discountPrice,
                    quantity: 1
                });
            } else {
                selectedMassages[existingMassageIndex].quantity++;
            }
            updatePaymentSummary();
        });
    });

    quantitySelectors.forEach(quantitySelector => {
        const decrementButton = quantitySelector.querySelector('.decrement');
        const incrementButton = quantitySelector.querySelector('.increment');
        const quantityDisplay = quantitySelector.querySelector('.quantity');
        const addButton = quantitySelector.previousElementSibling;

        incrementButton.addEventListener('click', function() {
            const massageDetails = quantitySelector.closest('.massage-details');
            const duration = massageDetails.querySelector('.duration').textContent;
            const name = quantitySelector.closest('.massage-card').querySelector('.massageCardHeading').textContent;

            const massage = selectedMassages.find(massage => massage.name === name && massage.duration === duration);
            if (massage) {
                massage.quantity++;
                quantityDisplay.textContent = massage.quantity;
                updatePaymentSummary();
            }
        });

        decrementButton.addEventListener('click', function() {
            const massageDetails = quantitySelector.closest('.massage-details');
            const duration = massageDetails.querySelector('.duration').textContent;
            const name = quantitySelector.closest('.massage-card').querySelector('.massageCardHeading').textContent;

            const massage = selectedMassages.find(massage => massage.name === name && massage.duration === duration);

            if (massage) {
                if (massage.quantity > 1) {
                    massage.quantity--;
                    quantityDisplay.textContent = massage.quantity;
                } else {
                    const index = selectedMassages.findIndex(m => m.name === name && m.duration === duration);
                    selectedMassages.splice(index, 1);
                    quantitySelector.style.display = 'none';
                    addButton.style.display = 'inline-block';
                }
                updatePaymentSummary();
            }
        });
    });
    
    addXButtons.forEach(addButton => {
        addButton.addEventListener('click', function() {
            detailsSection.style.display = 'none';
            addCard.style.display = 'block';
            hidecard1.style.display = 'block';
            paymentSummary.style.display = 'block';

            // Show the corresponding quantity selector
            const quantitySelector = this.nextElementSibling;
            if (quantitySelector) {
                quantitySelector.style.display = 'block';
            }
            this.style.display = 'none';

            // Get massage details
            const massageCard = this.closest('.massage-details');
            const duration = massageCard.querySelector('.duration').textContent;
            const price = parseFloat(massageCard.querySelector('.feedelprice').textContent);
            const discountPrice = parseFloat(massageCard.querySelector('.feePrice').textContent);
            const name = this.closest('.modalmassage-card').querySelector('.addOnMassageHeading').textContent;

            selectedMassages.push({ name, duration, price, discountPrice, quantity: 1 });
            updatePaymentSummary();    
        });
    });

    quantityMeter.forEach(quantitySelector => {
        const decrementButton = quantitySelector.querySelector('.decrement');
        const incrementButton = quantitySelector.querySelector('.increment');
        const quantityDisplay = quantitySelector.querySelector('.quantity');
        const addButton = quantitySelector.previousElementSibling;

        incrementButton.addEventListener('click', function() {
            const massageDetails = quantitySelector.closest('.massage-details');
            const duration = massageDetails.querySelector('.duration').textContent;
            const name = quantitySelector.closest('.modalmassage-card').querySelector('.addOnMassageHeading').textContent;

            const massage = selectedMassages.find(massage => massage.name === name && massage.duration === duration);
            if (massage) {
                massage.quantity++;
                quantityDisplay.textContent = massage.quantity;
                updatePaymentSummary();
            }
        });

        decrementButton.addEventListener('click', function() {
            const massageDetails = quantitySelector.closest('.massage-details');
            const duration = massageDetails.querySelector('.duration').textContent;
            const name = quantitySelector.closest('.modalmassage-card').querySelector('.addOnMassageHeading').textContent;

            const massage = selectedMassages.find(massage => massage.name === name && massage.duration === duration);

            if (massage) {
                if (massage.quantity > 1) {
                    massage.quantity--;
                    quantityDisplay.textContent = massage.quantity;
                } else {
                    const index = selectedMassages.findIndex(m => m.name === name && m.duration === duration);
                    selectedMassages.splice(index, 1);
                    quantitySelector.style.display = 'none';
                    addButton.style.display = 'inline-block';
                }
                updatePaymentSummary();
            }
        });
    });

    // Original functionality
    const shareButtons = document.querySelectorAll('#share-button');
    const shareOptions = document.querySelectorAll('#share-options');

    function toggleShareOptions(options) {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    }

    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const options = btn.closest('.massage-card').querySelector('#share-options');
            if (options) {
                toggleShareOptions(options);
            }
        });
    });

    // Back button functionality
    document.getElementById('back-button').addEventListener('click', function() {
        window.history.back();
    });

    // Like button functionality (dummy functionality for demonstration)
    document.getElementById('like-button').addEventListener('click', function() {
        this.classList.toggle('liked');
        this.querySelector('i').classList.toggle('fa-solid');
    });

    // Share function for individual share options (dummy function for demonstration)
    window.share = function(platform) {
        const shareURL = window.location.href;
        const shareText = 'Check out this amazing service package!';

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareURL)}`, '_blank');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/', '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareURL)}&text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent('Amazing Service Package')}&body=${encodeURIComponent(shareText + '\n\n' + shareURL)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareURL).then(() => {
                    alert('Link copied to clipboard');
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
                break;
        }
    }
});


/* 2nd work js */
// Function to fetch the total amount from the first script
const addresses = {
    home: '',
    office: '',
    others: ''
};

function updateAddress() {
    const floor = document.getElementById('floor').value;
    const room = document.getElementById('room').value;
    const appartment = document.getElementById('appartment').value;
    const plot = document.getElementById('plot').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;

    const completeAddress = `${floor}, ${room}, ${appartment}, ${plot}, ${locality}, ${city}`;
    document.getElementById('complete-address').innerText = completeAddress;

    const currentType = document.querySelector('.save-address-class .selected').id.replace('Address', '');
    addresses[currentType] = completeAddress;
}

function selectAddressType(type) {
    document.querySelectorAll('.save-address-class span').forEach(span => {
        span.classList.remove('selected');
    });

    document.getElementById(`${type}Address`).classList.add('selected');
    document.getElementById('complete-address').innerText = addresses[type];
}

document.getElementById('floor').addEventListener('input', updateAddress);
document.getElementById('room').addEventListener('input', updateAddress);
document.getElementById('appartment').addEventListener('input', updateAddress);
document.getElementById('plot').addEventListener('input', updateAddress);
document.getElementById('locality').addEventListener('input', updateAddress);
document.getElementById('city').addEventListener('change', updateAddress);

document.getElementById('homeAddress').addEventListener('click', () => selectAddressType('home'));
document.getElementById('officeAddress').addEventListener('click', () => selectAddressType('office'));
document.getElementById('otherAddress').addEventListener('click', () => selectAddressType('others'));

function showSection(sectionNumber) {
    document.querySelectorAll('section').forEach((section, index) => {
        section.classList.toggle('hidden', index !== sectionNumber);
    });
}

function showAddressPage() {
    showSection(1);
}

function showCustomizePage() {
    showSection(2);
}

function showBookingSlotPage() {
    showSection(3);
}

function showTherapistPage() {
    showSection(4);
}

function showFormContainerPage() {
    showSection(5);
}

function showOtpVarificationPage() {
    showSection(6);
}

function goBack(currentSection) {
    showSection(currentSection - 1);
}

function showTimes(day) {
    const days = document.querySelectorAll('.time-selection');
    days.forEach(day => day.classList.remove('active'));
    document.getElementById(day).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    selectAddressType('home');
    showSection(0);

    const aboutMeButtons = document.querySelectorAll('.about-me');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const popupName = document.getElementById('book-button');
    const popupBio = document.getElementById('popup-bio');

    aboutMeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardT = button.closest('.cardT');
            const name = cardT.getAttribute('data-name');
            const bio = cardT.getAttribute('data-bio');
            
            popupName.textContent = name;
            popupBio.textContent = bio;
            popup.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    const dropdown = document.getElementById('massage_type');
    const cardTs = document.querySelectorAll('.cardT');

    function filterCards() {
        const filterValue = dropdown.value;

        const maleCards = Array.from(cardTs).filter(cardT => cardT.getAttribute('data-massage_type') === 'Male to Male');
        const femaleCards = Array.from(cardTs).filter(cardT => cardT.getAttribute('data-massage_type') === 'Female to Female');
        const bothCards = maleCards.concat(femaleCards);
        
        cardTs.forEach(cardT => cardT.style.display = 'none');

        if (filterValue === 'all') {
            cardTs.forEach(cardT => cardT.style.display = 'block'); 
        } else if (filterValue === 'both') {
            bothCards.forEach(cardT => cardT.style.display = 'block');
        } else if (filterValue === 'male') {
            maleCards.forEach(cardT => cardT.style.display = 'block'); 
        } else if (filterValue === 'female') {
            femaleCards.forEach(cardT => cardT.style.display = 'block'); 
        }
    }

    filterCards();
    dropdown.addEventListener('change', filterCards);
});

