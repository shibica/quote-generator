const quoteContainer = document.getElementById("qoute-container");
const quoteText = document.getElementById("qoute");
const autorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQute() {
    loading();
  // Pick a random quote from api quotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  /* 
  Different Option for API
    Sample Requests
    https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request
    https://zenquotes.io/api/today - Generate the quote of the day on each request
    https://zenquotes.io/api/random - Generate a random quote on each request
    */
  // Check if qouthor field is blank and replace it with quote unknown
  if (!quote.autor) {
    autorText.textContent = "Unknown";
  } else {
    autorText.textContent = quote.author;
  }
  // Check the quote length to determine the styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQutes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQute();
  } catch (error) {
    // Catch Error Here
    alert(error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/post?text=${quoteText.textContent} - ${autorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQute);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQutes();
