import locations from "../locations.js";
import { performStageOperations } from "./stageOperations.js";
import { fuzzyScore } from "./search.js";

const FUZZY_THRESHOLD = 0.45;

const STAGE_EXTRA_TEXT = {
    1: "OLD METHODS COMPROMISED. MUST ACQUIRE NEW KEY. WILL MISS DROPOFF IF DELAY OR INCORRECT LOCATION.",
    2: "REMEMBER FIRST RULE. IF COMPROMISED. L PILL.",
    3: "SECOND RULE. SIGHTING. REPORT AND WAIT. INVESTIGATING ALONE COULD LEAD TO DEATH",
    4: "THIRD RULE. IF TAKEN BY THE OTHERS DISCOVER MEANS TO COMMUNICATE TO HOUSE",
    5: "FOURTH RULE. KILL ALL ON SAME TRAIL. REMOVE DOG TAGS AND REPORT TO HOUSE",
    6: "MORSE MESSAGES BEING INTERCEPTED. BEGINNING FULL ENCRYPTION SOON",
    7: "ALLIES CAN BE CLOTHED AS ENEMIES. ENEMIES CAN BE CLOTHED AS ALLIES. ALWAYS USE ID",
    8: "FINAL. BELIEVE EVERYTHING. REPORT EVERYTHING",
};

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
const fuzzyHintBanner = document.getElementById("fuzzyHintBanner");

// Add events to each used element. If element is the input box, add the input event
document.querySelectorAll(".decode-trigger").forEach(element => element === inputTextBox ? element.addEventListener("input", decode) : element.addEventListener("change", decode));

// Dismiss the fuzzy banner when the user turns fuzzy search off
fuzzySearchCheck.addEventListener("change", () => {
    if (!fuzzySearchCheck.checked) document.getElementById("fuzzyBanner")?.remove();
});

// The main function
export function decode() {

    handleVisiblity();
    fuzzyHintBanner.innerHTML = "";

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

    // If any result is an exact match, suppress partial/fuzzy results
    const hasExact = scoredMatches.some(({ score }) => score === 1.0);
    const finalMatches = hasExact ? scoredMatches.filter(({ score }) => score === 1.0) : scoredMatches;

    const matches = finalMatches.map(({ loc }) => loc);
    const scores = finalMatches.map(({ score }) => score);

    // If no matches, set the state and return
    if (!matches.length) {
        locationText.innerHTML = "<span style='color: #ed4245'>❌ No matches found</span>";
        matchesText.innerText = "Matches: (0)";
        resultImage.hidden = true;
        cardDisplay.innerHTML = null;

        resultsBox.value = "No results. Please check your morse.";
        resultsBox.rows = 1;

        // If fuzzy is off, check whether enabling it would find anything
        if (!fuzzySearchCheck.checked && eligible.some(loc => fuzzyScore(input, loc.cipher) >= FUZZY_THRESHOLD)) {
            fuzzyHintBanner.innerHTML = `<div class="alert alert-warning py-1 px-2 mt-1 mb-1 small" role="alert">💡 No exact match, but <strong>Fuzzy search</strong> found possible matches. <span style="cursor:pointer;text-decoration:underline" onclick="document.getElementById('fuzzySearchCheck').click()">Enable it</span>.</div>`;
        } else {
            fuzzyHintBanner.innerHTML = "";
        }
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
                ${STAGE_EXTRA_TEXT[match.stage] ? `<p class="card-text small text-body-secondary mt-2 mb-0">+ ${STAGE_EXTRA_TEXT[match.stage]}</p>` : ""}
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