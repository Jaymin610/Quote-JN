import "./styles.css";

const quoteContainer = document.getElementById("quote-container");
const quoteContent = document.getElementById("quote-content");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const twButton = document.getElementById("tw-btn");
const wpButton = document.getElementById("wp-btn");
const newButton = document.getElementById("quote-btn");
const loader = document.getElementById("loader");
const loadText = document.getElementById("load-text");

async function getQuote() {
  const url = "https://api.quotable.io/random";
  loading();
  try {
    const r = await fetch(url);
    const data = await r.json();
    if (data.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;
    quoteAuthor.innerText = "~ " + data.author;
    complete();
  } catch (e) {
    console.log("Error");
  }
}

function loading() {
  loader.hidden = false;
  loadText.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    loadText.hidden = true;
    quoteContainer.hidden = false;
  }
}
function sentTwit() {
  const twitURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText}  ${quoteAuthor.innerText}`;
  window.open(twitURL, "_blank");
}
function whatsapp() {
  const wpURL = `https://api.whatsapp.com/send?text=${quoteText.innerText} ${quoteAuthor.innerText}`;
  window.open(wpURL, "_blank");
}
getQuote();

newButton.addEventListener("click", getQuote);
twButton.addEventListener("click", sentTwit);
wpButton.addEventListener("click", whatsapp);
