document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
  const container = document.querySelector('.container');

  // Load dark mode preference from local storage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Apply dark mode if preference is true
  if (isDarkMode) {
    container.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }

  // Toggle dark mode on switch change
  darkModeToggle.addEventListener('change', function () {
    if (this.checked) {
      container.classList.add('dark-mode');
      localStorage.setItem('darkMode', true);
    } else {
      container.classList.remove('dark-mode');
      localStorage.setItem('darkMode', false);
    }
  });
    // Function to fetch daily quote from quotes.json
    function getDailyQuote() {
      const currentDate = new Date();
      const today = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const storedQuoteDate = localStorage.getItem('dailyQuoteDate');
  
      // Check if there's a stored quote for today
      if (storedQuoteDate === today) {
        const storedQuote = localStorage.getItem('dailyQuote');
        const dailyQuoteElement = document.getElementById('daily-quote');
        dailyQuoteElement.textContent = storedQuote;
      } else {
        // Read quotes from quotes.json
        fetch('quotes.json')
          .then(response => response.json())
          .then(data => {
            const categories = Object.keys(data.categories);
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const quotes = data.categories[randomCategory];
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const dailyQuote = quotes[randomIndex];
            const dailyQuoteElement = document.getElementById('daily-quote');
            dailyQuoteElement.textContent = dailyQuote;
  
            // Store the daily quote and date in local storage
            localStorage.setItem('dailyQuote', dailyQuote);
            localStorage.setItem('dailyQuoteDate', today);
          })
          .catch(error => {
            console.error('Error fetching quotes:', error);
          });
      }
    }
  
    // Fetch daily quote
    getDailyQuote();
  
    function getQuotesByCategory(category) {
        return fetch('quotes.json')
          .then(response => response.json())
          .then(data => {
            return data.categories[category];
          })
          .catch(error => {
            console.error('Error fetching quotes:', error);
            return [];
          });
      }
      
      // Handle category form submission
      const categoryForm = document.getElementById('category-form');
      const categorySelect = document.getElementById('category-select');
      const categoryQuoteElement = document.getElementById('category-quote');
      
      categoryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedCategory = categorySelect.value;
        getQuotesByCategory(selectedCategory)
          .then(categoryQuotes => {
            if (categoryQuotes.length > 0) {
              const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
              const randomQuote = categoryQuotes[randomIndex];
              categoryQuoteElement.textContent = randomQuote;
            } else {
              categoryQuoteElement.textContent = "No quotes found for this category.";
            }
          })
          .catch(error => {
            console.error('Error fetching category quotes:', error);
          });
      });

    });
  