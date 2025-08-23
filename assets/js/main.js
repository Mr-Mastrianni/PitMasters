// Initial loading animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingProgress = document.getElementById('loading-progress');
    const loadingScreen = document.getElementById('loading-screen');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1;
        loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // After loading is complete, fade out and remove the loading screen
            anime({
                targets: loadingScreen,
                opacity: 0,
                duration: 800,
                easing: 'easeInOutQuad',
                complete: () => {
                    loadingScreen.style.display = 'none';
                    startPageAnimations();
                }
            });
        }
    }, 20);
    
    // Simple chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chatbot with anime.js animation
    chatbotToggle.addEventListener('click', function() {
        if (chatbot.style.display === 'block') {
            anime({
                targets: chatbot,
                opacity: 0,
                translateY: 20,
                duration: 300,
                easing: 'easeOutQuad',
                complete: function() {
                    chatbot.style.display = 'none';
                }
            });
        } else {
            chatbot.style.display = 'block';
            chatbot.style.opacity = 0;
            anime({
                targets: chatbot,
                opacity: 1,
                translateY: [20, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    });

    // Close chatbot
    closeChat.addEventListener('click', function() {
        anime({
            targets: chatbot,
            opacity: 0,
            translateY: 20,
            duration: 300,
            easing: 'easeOutQuad',
            complete: function() {
                chatbot.style.display = 'none';
            }
        });
    });

    // Send message function
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');
            userInput.value = '';

            // Simulate bot response
            setTimeout(function() {
                const botResponses = [
                    "Our most popular dish is our Texas-Style Ribs, slow-smoked to perfection!",
                    "We are a delivery-only kitchen, bringing the best BBQ right to your door!",
                    "Yes, we offer catering services for events of all sizes!",
                    "Our homemade seasoning is available for purchase by the bottle.",
                    "All our meats are smoked fresh daily using traditional methods.",
                    "I'd be happy to help you place an order!"
                ];
                
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(randomResponse, 'bot-message');
                
                // If message contains "image" or "picture", show image demo
                if (message.toLowerCase().includes('image') || message.toLowerCase().includes('picture') || message.toLowerCase().includes('photo') || message.toLowerCase().includes('show me')) {
                    setTimeout(function() {
                        addMessage("Here's an image of our famous ribs:", 'bot-message');
                        addImageMessage("https://heygrillhey.com/wp-content/uploads/2019/06/3-2-1Ribs-7-1024x683.jpg");
                    }, 800);
                }
            }, 600);
        }
    }

    // Add message to chat with animation
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.style.opacity = 0;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        
        anime({
            targets: messageDiv,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add image message to chat with animation
    function addImageMessage(imageUrl) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.style.opacity = 0;
        messageDiv.innerHTML = `<img src="${imageUrl}" alt="Food image" class="w-full h-auto rounded-lg">`;
        chatMessages.appendChild(messageDiv);
        
        anime({
            targets: messageDiv,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            anime({
                targets: mobileMenu,
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            // Hide menu
            anime({
                targets: mobileMenu,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeOutQuad',
                complete: function() {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            anime({
                targets: mobileMenu,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeOutQuad',
                complete: function() {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    });
    
    // Menu category selection with animation
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            menuCategories.forEach(c => c.classList.remove('bg-red-600', 'text-white'));
            menuCategories.forEach(c => c.classList.add('bg-gray-200', 'text-gray-700'));
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-red-600', 'text-white');
            
            anime({
                targets: this,
                scale: [1, 1.1, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Animation functions
function startPageAnimations() {
    // Hero section animations
    animateHeroElements();
    
    // Animate section titles when scrolled into view
    animateSectionTitles();
    
    // Animate menu items with staggered timing
    animateMenuItems();
    
    // Animate gallery items
    animateGalleryItems();
    
    // Animate testimonial cards
    animateTestimonialCards();
    
    // Add scroll event listener for additional animations
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    // Logo animation
    animateLogo();
    
    // Animate nav items
    animateNavItems();
}

function animateHeroElements() {
    anime({
        targets: '#hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutQuad',
    });
    
    anime({
        targets: '#hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 200,
        easing: 'easeOutQuad',
    });
    
    anime({
        targets: '#hero-text',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 400,
        easing: 'easeOutQuad',
    });
    
    anime({
        targets: ['#hero-btn-1', '#hero-btn-2'],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(200, {start: 600}),
        easing: 'easeOutQuad',
    });
}

function animateSectionTitles() {
    anime({
        targets: '.section-title',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutQuad',
        delay: anime.stagger(100),
        complete: function() {
            // Animate the underline after the title appears
            anime({
                targets: '.section-title::after',
                width: [0, 80],
                duration: 800,
                easing: 'easeOutQuad',
            });
        }
    });
}

function animateMenuItems() {
    anime({
        targets: '.menu-item',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(100, {grid: [3, 2], from: 'center'}),
        easing: 'easeOutQuad',
    });
}

function animateGalleryItems() {
    anime({
        targets: '.gallery-item',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(50, {grid: [4, 2], from: 'center'}),
        easing: 'easeOutQuad',
    });
}

function animateTestimonialCards() {
    anime({
        targets: '.testimonial-card',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuad',
    });
}

function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            if (element.style.opacity !== '1') {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad',
                });
            }
        }
    });
}

function animateLogo() {
    anime({
        targets: '#brand-logo',
        rotateY: [90, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutQuad',
    });
}

function animateNavItems() {
    anime({
        targets: '.nav-item',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateFeeBtn = document.getElementById('calculate-fee-btn');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const deliveryFeeResult = document.getElementById('delivery-fee-result');

    if (calculateFeeBtn) {
        calculateFeeBtn.addEventListener('click', calculateAndShowDeliveryFee);
    }

    function calculateAndShowDeliveryFee() {
        const destinationAddress = deliveryAddressInput.value;
        if (!destinationAddress) {
            deliveryFeeResult.textContent = 'Please enter a delivery address.';
            deliveryFeeResult.style.color = 'red';
            return;
        }

        // This address is a placeholder and is required for the calculation.
        // It will NOT be displayed on the website.
        const originAddress = 'YOUR_RESTAURANT_ADDRESS';

        if (originAddress === 'YOUR_RESTAURANT_ADDRESS') {
            deliveryFeeResult.textContent = 'Delivery fee calculation is not yet configured.';
            deliveryFeeResult.style.color = 'orange';
            console.error('Please replace YOUR_RESTAURANT_ADDRESS in assets/js/main.js with a valid origin address.');
            return;
        }

        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [originAddress],
            destinations: [destinationAddress],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (response, status) => {
            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                const distanceInMiles = response.rows[0].elements[0].distance.value / 1609.34; // meters to miles
                let fee = distanceInMiles * 1.50;
                if (fee > 25) {
                    fee = 25;
                }
                deliveryFeeResult.textContent = `Delivery Fee: $${fee.toFixed(2)}`;
                deliveryFeeResult.style.color = 'green';
            } else {
                deliveryFeeResult.textContent = 'Could not calculate delivery fee. Please check the address.';
                deliveryFeeResult.style.color = 'red';
            }
        });
    }
});

// Order Management System
let orderItems = [];

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all "Add to Order" buttons
    const addToOrderBtns = document.querySelectorAll('.add-to-order-btn');
    addToOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            addItemToOrder(itemName, itemPrice);
        });
    });

    // Clear order button
    const clearOrderBtn = document.getElementById('clear-order');
    if (clearOrderBtn) {
        clearOrderBtn.addEventListener('click', clearOrder);
    }

    // Update form submission to include order items
    const orderForm = document.querySelector('#order form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            updateOrderItemsInput();
        });
    }
});

function addItemToOrder(name, price) {
    // Check if item already exists in order
    const existingItem = orderItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderItems.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateOrderDisplay();
    
    // Show success animation
    anime({
        targets: '.add-to-order-btn[data-name="' + name + '"]',
        scale: [1, 1.1, 1],
        backgroundColor: ['#dc2626', '#16a34a', '#dc2626'],
        duration: 600,
        easing: 'easeOutQuad'
    });
}

function updateOrderDisplay() {
    const orderSummary = document.getElementById('order-summary');
    const orderItemsDiv = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    if (orderItems.length === 0) {
        orderSummary.style.display = 'none';
        return;
    }
    
    orderSummary.style.display = 'block';
    
    // Clear existing items
    orderItemsDiv.innerHTML = '';
    
    let total = 0;
    
    orderItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center mb-2 p-2 bg-white rounded';
        itemDiv.innerHTML = `
            <div class="flex-1">
                <span class="font-medium">${item.name}</span>
                <div class="text-sm text-gray-600">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="flex items-center space-x-2">
                <button type="button" class="quantity-btn bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button type="button" class="quantity-btn bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center" onclick="changeQuantity(${index}, 1)">+</button>
                <span class="w-16 text-right font-medium">$${itemTotal.toFixed(2)}</span>
                <button type="button" class="remove-item text-red-600 hover:text-red-800 ml-2" onclick="removeItem(${index})">×</button>
            </div>
        `;
        orderItemsDiv.appendChild(itemDiv);
    });
    
    orderTotal.textContent = `$${total.toFixed(2)}`;
    
    // Animate the order summary appearance
    if (orderSummary.style.display === 'block') {
        anime({
            targets: orderSummary,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
}

function changeQuantity(index, change) {
    if (orderItems[index]) {
        orderItems[index].quantity += change;
        
        if (orderItems[index].quantity <= 0) {
            orderItems.splice(index, 1);
        }
        
        updateOrderDisplay();
    }
}

function removeItem(index) {
    orderItems.splice(index, 1);
    updateOrderDisplay();
}

function clearOrder() {
    orderItems = [];
    updateOrderDisplay();
    
    // Show confirmation animation
    anime({
        targets: '#clear-order',
        scale: [1, 1.2, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function updateOrderItemsInput() {
    const orderItemsInput = document.getElementById('order-items-input');
    if (orderItemsInput) {
        const orderSummary = orderItems.map(item => 
            `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderItemsInput.value = orderSummary + `\n\nTotal: $${total.toFixed(2)}`;
    }
}
