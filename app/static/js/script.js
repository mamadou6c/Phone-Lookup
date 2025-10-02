const phoneForm = document.getElementById('phone-form');
const clearButton = document.getElementById('clear-button');
const phoneNumberInput = document.getElementById('phone_number');
const phoneErrorMessage = document.getElementById('phone-error-message');
const resultsCard = document.getElementById('results-card');
const errorCard = document.getElementById('error-card');
const loadingSpinner = document.getElementById('loading-spinner');
const mapContainer = document.getElementById('map-container');
const viewMapBtn = document.getElementById('view-map-btn');
const closeMapBtn = document.getElementById('close-map-btn');
const mapDiv = document.getElementById('map');



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
    mapContainer.classList.add('hidden');
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
    mapContainer.classList.add('hidden');
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

const viewMap = () => {
     const lat = document.getElementById('result-latitude').textContent;
    const lon = document.getElementById('result-longitude').textContent;
    mapContainer.classList.remove('hidden');
    // Simple map embed using an iframe (e.g., OpenStreetMap)
    mapDiv.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon)-0.01}%2C${parseFloat(lat)-0.01}%2C${parseFloat(lon)+0.01}%2C${parseFloat(lat)+0.01}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" style="border: 1px solid black; border-radius: 0.5rem;"></iframe>`;
    mapContainer.scrollIntoView({ behavior: 'smooth' });
};

const closeMap = () => {
    mapContainer.classList.add('hidden');
    mapDiv.innerHTML = '<p class="text-subtext-light dark:text-subtext-dark">Map will be displayed here.</p>'; // Reset map content
};

viewMapBtn.addEventListener('click', viewMap);
closeMapBtn.addEventListener('click', closeMap);
