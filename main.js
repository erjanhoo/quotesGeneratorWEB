// API endpoint - replace with your actual API URL
const API_URL = 'https://dummyjson.com/quotes/random';

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const generateBtn = document.getElementById('generateBtn');
const quoteCard = document.querySelector('.quote-card');
const twitterIcon = document.querySelector('.fa-twitter');

// Function to fetch quote from API
async function getQuote() {
    try {
        // Add loading state
        quoteCard.classList.add('loading');
        
        // Fetch data from API
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // API returns a single object, not an array
        const quoteData = data;

        // Update the quote and author with fade animation
        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.textContent = quoteData['quote'] || 'No quote available';
            quoteAuthor.textContent = quoteData['author'] || 'Unknown';
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }, 300);
        
        // Remove loading state
        quoteCard.classList.remove('loading');
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = 'Failed to load quote. Please try again.';
        quoteAuthor.textContent = '';
        
        // Remove loading state
        quoteCard.classList.remove('loading');
    }
}


// Event listener for dice button click
generateBtn.addEventListener('click', getQuote);

// Add transition to quote text and author
quoteText.style.transition = 'opacity 0.3s ease';
quoteAuthor.style.transition = 'opacity 0.3s ease';
