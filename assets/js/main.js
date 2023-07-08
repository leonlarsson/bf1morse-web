import locations from "../locations.js";
import stageOperations from "./stageOperations.js";

// Define input
const inputTextBox = document.getElementById("inputTextBox");

// Define output textbox, location text, matches text, results textarea, and result image
const locationText = document.getElementById("locationText");
const matchesText = document.getElementById("matchesText");
const resultsBox = document.getElementById("resultsBox");
const embedCheck = document.getElementById("noEmbedCheck");
const resultImage = document.getElementById("resultImage");

// Add events to each used element. If element is the input box, add the input event
document.querySelectorAll(".decode-trigger").forEach(element => element === inputTextBox ? element.addEventListener("input", decode) : element.addEventListener("change", decode));

// The main function
export function decode() {

    // Define variables
    const input = inputTextBox.value.trim();
    const embedSymbols = embedCheck.checked ? ["<", ">"] : ["", ""];

    // Set input type
    const inputType = (input.startsWith(".") || input.startsWith("-")) ? "morse" : "text";

    // Fill the outout text box and return the selected stage (null if All)
    const stage = stageOperations(input, inputType);

    // Get matches. Takes type, stage 
    const matches = locations.filter(location => location.type === inputType && (location.stage === stage || stage === null) && location.cipher.toLowerCase().includes(input.toLowerCase()));

    // If no matches, set the state and return
    if (!matches.length) {
        locationText.innerHTML = "<span style='color: #ed4245'>❌ No matches found</span>";
        matchesText.innerText = "Matches: (0)";
        resultsBox.value = "No results. Please check your morse.";
        resultsBox.rows = 1;
        resultImage.hidden = true;
        return;
    }

    // If there are matches
    resultsBox.value = matches.map(match => `(Stage ${match.stage}) ${match.plainText}: ${match.mapName} | ${embedSymbols[0]}${match.locationUrl}${embedSymbols[1]}`).join("\n");

    // If we have fewer than 10 matches, set the textarea rows to x matches + 1. +1 to account for smaller screens with wrapping. If 10 or more matches, keep rows at 10
    resultsBox.rows = (matches.length < 10) ? matches.length + 1 : 10;

    // Populate "Matches (n):" text
    matchesText.innerText = `Matches: (${matches.length})`;

    // If one match
    if (matches.length === 1) {

        const match = matches[0];

        // Set title tooltip to match
        matchesText.title = `Last match (${match.date}):\nInput: "${match.inputUsed}"\nStage: ${match.stage}\nLocation: ${match.location}\nMap: ${match.map}`;

        // Populate locationText
        locationText.innerHTML = `<a style="text-decoration: none; color: #3ba55c" target='_blank' href='${match.locationUrl}'>✅ Found on ${match.mapName} (${match.plainText})</a>`;

        // if match is not stage 9 (YouTube), show image
        if (match.stage !== 9) {
            resultImage.src = match.locationUrl;
            resultImage.hidden = false;
        }

        // If more than 1 match AND not stage 9
    } else if (matches.length > 1 && !document.getElementById("check9").checked) {
        locationText.innerHTML = "⏳ Please input more to find exact location";
        resultImage.hidden = true;
    }
}
