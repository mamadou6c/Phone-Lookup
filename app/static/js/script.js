const phoneForm = document.getElementById('phone-form');
const clearButton = document.getElementById('clear-button');
const phoneNumberInput = document.getElementById('phone_number');
const phoneErrorMessage = document.getElementById('phone-error-message');
const resultsCard = document.getElementById('results-card');
const errorCard = document.getElementById('error-card');
const loadingSpinner = document.getElementById('loading-spinner');



const validatePhoneNumber = () => {
    const phoneNumber = phoneNumberInput.value;
    // A simple regex for international phone numbers. 
    // Starts with '+' followed by 1 to 3 digits (country code), then 4 to 14 digits.
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phoneNumber === '' || phoneRegex.test(phoneNumber)) {
        phoneNumberInput.classList.remove('border-red-500', 'focus:border-red-500', 'dark:border-red-500');
        phoneNumberInput.classList.add('border-gray-300', 'dark:border-gray-600', 'focus:border-primary');
        phoneErrorMessage.classList.add('hidden');
        return true;
    } else {
        phoneNumberInput.classList.remove('border-gray-300', 'dark:border-gray-600', 'focus:border-primary');
        phoneNumberInput.classList.add('border-red-500', 'focus:border-red-500', 'dark:border-red-500');
        phoneErrorMessage.classList.remove('hidden');
        return false;
    }
};


const lookupPhone = async (phoneNumber) => {
    if (!phoneNumber) return false;

    const payload = { 'phone' : phoneNumber};
    
    const data = await fetch('http://127.0.0.1:5000/lookup', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },

        body : JSON.stringify(payload)
    });
    
    if (!data.ok) {
        console.error(`An error occured when looking up phone number : ${data.status}`);
        return false;
    } else {
        return data.json()
    };
};


phoneNumberInput.addEventListener('input', validatePhoneNumber);
phoneForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!validatePhoneNumber()) {
        resultsCard.classList.add('hidden');
        errorCard.classList.add('hidden');
        loadingSpinner.classList.add('hidden');
        console.error('Phone number validation error');
        return;
    }
    const phoneNumber = phoneNumberInput.value;
    // Hide previous results/errors and show spinner
    resultsCard.classList.add('hidden');
    errorCard.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    try {
        const data = await lookupPhone(phoneNumber);
        
        if (data) {
            // Hide spinner
            loadingSpinner.classList.add('hidden'); 
            
            // Show results card with dummy data
            document.getElementById('result-phone').textContent = data.phone;
            document.getElementById('result-country').textContent = data.country;
            document.getElementById('result-provider').textContent = data.service_provider;
            document.getElementById('result-latitude').textContent = data.latitude;
            document.getElementById('result-longitude').textContent = data.longitude;
            document.getElementById('result-address').textContent = data.address;
            resultsCard.classList.remove('hidden'); 
        } else {
            // Show error card
            loadingSpinner.classList.remove('hidden');
            document.getElementById('error-message').textContent = 'Unable to lookup phone number. Please check and try again.';
            errorCard.classList.remove('hidden');
            console.error("Phone number lookup error");

        };
        
    } catch (error) {
        loadingSpinner.classList.remove('hidden');
        document.getElementById('error-message').textContent = `Unable to lookup phone number. Please check and try again. ${error}`;
        errorCard.classList.remove('hidden');
    }
});


clearButton.addEventListener('click', function() {
    phoneNumberInput.value = '';
    validatePhoneNumber(); // Reset validation state
    resultsCard.classList.add('hidden');
    errorCard.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
});


resultsCard.addEventListener('click', function(event) {
    const button = event.target.closest('button');
    if (button && button.title.startsWith('Copy')) {
        const fieldContainer = button.previousElementSibling;
        const valueElement = fieldContainer.querySelector('[id^="result-"]');
        if (valueElement) {
            navigator.clipboard.writeText(valueElement.textContent)
                .then(() => {
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<span class="material-icons text-green-500">check</span>';
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    }
});
