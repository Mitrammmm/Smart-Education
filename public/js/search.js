// search.js

// Array of suggested keywords
const suggestions = ["web design", "data structures & algorithms", "machine learning"];

// Function to find suggestions matching the input keyword
function findSuggestions(keyword) {
    return suggestions.filter(suggestion => suggestion.toLowerCase().includes(keyword.toLowerCase()));
}

// Function to display suggestions
function displaySuggestions(keyword) {
    const matchedSuggestions = findSuggestions(keyword);
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';

    matchedSuggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        suggestionsList.appendChild(listItem);
    });
}

// Function to update search bar with suggestion on pressing Enter
function updateSearchBarWithSuggestion(suggestion) {
    document.getElementById('keyword').value = suggestion;
}

document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementById('keyword');

    keywordInput.addEventListener('input', function() {
        const keyword = keywordInput.value;
        if (keyword.length >= 2) {
            displaySuggestions(keyword);
        } else {
            const suggestionsList = document.getElementById('suggestions');
            suggestionsList.innerHTML = '';
        }
    });

    keywordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const suggestionsList = document.getElementById('suggestions');
            if (suggestionsList.children.length > 0) {
                updateSearchBarWithSuggestion(suggestionsList.children[0].textContent);
            }
        }
    });
});

// search.js

document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementById('keyword');
    const form = document.querySelector('form');

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const keyword = keywordInput.value.trim();
        if (keyword) {
            // Check if the keyword matches any of the suggestions
            const suggestions = ["web design", "data structures & algorithms", "machine learning"];
            const matchedSuggestion = suggestions.find(suggestion => suggestion.toLowerCase() === keyword.toLowerCase());
            
            if (matchedSuggestion) {
                // Open the EJS page based on the matched suggestion
                window.location.href = `/${matchedSuggestion.replace(/ /g, '-').toLowerCase()}`;
            } else {
                // If the keyword doesn't match any suggestion, you can handle it here
                console.log('Keyword does not match any suggestion.');
            }
        } else {
            // If the input is empty, you can handle it here
            console.log('Please enter a keyword.');
        }
    });
});

