import locations from "../locations.js";
import { performStageOperations } from "./stageOperations.js";
import { fuzzyScore } from "./search.js";

const FUZZY_THRESHOLD = 0.45;

// Define input
const inputTextBox = document.getElementById("inputTextBox");

// Define output textbox, location text, matches text, results textarea, and result image
const locationText = document.getElementById("locationText");
const matchesText = document.getElementById("matchesText");
const resultsBox = document.getElementById("resultsBox");
const showCardsCheck = document.getElementById("showCardsCheck");
const noEmbedCheck = document.getElementById("noEmbedCheck");
const fuzzySearchCheck = document.getElementById("fuzzySearchCheck");
const resultImage = document.getElementById("resultImage");
const cardDisplay = document.getElementById("cardDisplay");

// Add events to each used element. If element is the input box, add the input event
document.querySelectorAll(".decode-trigger").forEach(element => element === inputTextBox ? element.addEventListener("input", decode) : element.addEventListener("change", decode));

// Dismiss the fuzzy banner when the user turns fuzzy search off
fuzzySearchCheck.addEventListener("change", () => {
    if (!fuzzySearchCheck.checked) document.getElementById("fuzzyBanner")?.remove();
});

// The main function
export function decode() {

    handleVisiblity();

    // Define variables
    const input = inputTextBox.value.trim();
    const embedSymbols = noEmbedCheck.checked ? ["<", ">"] : ["", ""];

    // Set input type
    const inputType = (input.startsWith(".") || input.startsWith("-")) ? "morse" : "text";

    // Fill the outout text box and return the selected stage (null if All)
    const stage = performStageOperations(input, inputType);

    // Get matches — fuzzy scored when enabled, exact substring when disabled
    const eligible = locations.filter(loc => loc.type === inputType && (loc.stage === stage || stage === null));
    const scoredMatches = fuzzySearchCheck.checked
        ? eligible
            .map(loc => ({ loc, score: fuzzyScore(input, loc.cipher) }))
            .filter(({ score }) => score >= FUZZY_THRESHOLD)
            .sort((a, b) => b.score - a.score)
        : eligible
            .filter(loc => loc.cipher.toLowerCase().includes(input.toLowerCase()))
            .map(loc => ({ loc, score: 1.0 }));

    const matches = scoredMatches.map(({ loc }) => loc);
    const scores = scoredMatches.map(({ score }) => score);

    // If no matches, set the state and return
    if (!matches.length) {
        locationText.innerHTML = "<span style='color: #ed4245'>❌ No matches found</span>";
        matchesText.innerText = "Matches: (0)";
        resultsBox.value = "No results. Please check your morse.";
        resultsBox.rows = 1;
        resultImage.hidden = true;
        cardDisplay.innerHTML = null;
        return;
    }

    handleVisiblity()

    // If there are matches
    resultsBox.value = matches.map((match, i) => {
        const label = scores[i] === 1.0 ? "" : scores[i] >= 0.85 ? " [partial]" : " [~fuzzy]";
        return `(Stage ${match.stage}) ${match.plainText}: ${match.mapName} | ${embedSymbols[0]}${match.locationUrl}${embedSymbols[1]}${label}`;
    }).join("\n");

    // If we have fewer than 10 matches, set the textarea rows to x matches + 1. +1 to account for smaller screens with wrapping. If 10 or more matches, keep rows at 10
    resultsBox.rows = (matches.length < 10) ? matches.length + 1 : 10;

    // Populate "Matches (n):" text
    matchesText.innerText = `Matches: (${matches.length})`;

    cardDisplay.innerHTML = showCardsCheck.checked ? matches.map((match, i) => {
        const badge = scores[i] >= 0.85 && scores[i] < 1.0
            ? `<span class="badge bg-warning text-dark ms-1">partial</span>`
            : scores[i] < 0.85
            ? `<span class="badge bg-secondary ms-1">~fuzzy</span>`
            : "";
        const cipherDisplay = match.cipher.toLowerCase().includes(input.toLowerCase())
            ? match.cipher.replace(input.toUpperCase(), `<span><mark>${input.toUpperCase()}</mark></span>`)
            : match.cipher;
        return `
        <div class="card" style="width: 19rem">
            ${noEmbedCheck.checked || match.stage === 9 ? "" : `<img src="${match.locationUrl}" class="card-image-top" loading="lazy"></img>`}
            <div class="card-body">
                <h5 class="card-title">${match.plainText}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Stage ${match.stage} - <a href="${match.locationUrl}" target="_blank" class="card-link">${match.mapName}</a>${badge}</h6>
                Cipher: ${cipherDisplay}
            </div>
        </div>`;
    }).join("\n") : null;

    // If one match
    if (matches.length === 1) {

        const match = matches[0];

        // Populate locationText
        locationText.innerHTML = `<a style="text-decoration: none; color: #3ba55c" target='_blank' href='${match.locationUrl}'>✅ Found on ${match.mapName} (${match.plainText})</a>`;

        // if match is not stage 9 (YouTube), show image
        if (match.stage !== 9) {
            resultImage.src = match.locationUrl;
            if (!showCardsCheck.checked) resultImage.hidden = false;
        }

        // If more than 1 match AND not stage 9
    } else if (matches.length > 1 && !document.getElementById("check9").checked) {
        locationText.innerHTML = "⏳ Please input more to find exact location";
        resultImage.hidden = true;
    }
}

function handleVisiblity() {
    resultsBox.hidden = showCardsCheck.checked;
    cardDisplay.hidden = !showCardsCheck.checked;
    resultImage.hidden = showCardsCheck.checked;
}