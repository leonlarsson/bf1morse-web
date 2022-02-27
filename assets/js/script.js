import locationJSON from "../locations.json" assert { type: "json" };
import cleanOutput from "./cleanOutput.js";
import stageOperations from "./stageOperations.js";

// Define input
const inputBox = document.getElementById("input");

// Define output textbox, location text, matches text, results textarea, and result image
const locationText = document.getElementById("locationText");
const matchesText = document.getElementById("matchesText");
const resultsBox = document.getElementById("resultsBox");
const resultImage = document.getElementById("resultImage");

// Add events to each used element. If element is the input box, add the input event
document.querySelectorAll(".decode-trigger").forEach(element => {
    if (element === inputBox) {
        element.addEventListener("input", decode);
    } else {
        element.addEventListener("change", decode);
    }
});

// The main function
function decode() {

    // Define variables
    const inputRaw = inputBox.value.toUpperCase();
    let isMorse;
    let inputType;

    // If input is morse, change the ID (changes the font to a more morse-friendly one)
    if (inputRaw.startsWith(".") || inputRaw.startsWith("-")) {
        isMorse = true;
        inputType = "morse";
        inputBox.id = "inputMorse";
    } else {
        isMorse = false;
        inputType = "text";
        inputBox.id = "input";
    }

    // Determine the stage and fill the outout text box
    const stage = stageOperations(inputRaw, isMorse);

    // Regex stuff
    // Determines which locations to search in. If stage is not specified, search for all. Also determines if to use text or morse locations
    let locationsString;
    if (stage) {

        locationsString = JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}${stage}`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "");

    } else {

        locationsString = `${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}1`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}2`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}3`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}4`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}5`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}6`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}7`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}8`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}9`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}`;

    }

    // Create initial regex
    let initialRegex;

    // If no input, display everything. Replace morse input to escape the special regex dot. Works with both text and morse
    if (!inputBox.value) {
        initialRegex = new RegExp("(?:(.*..*))", "gi");
    } else {
        initialRegex = new RegExp("(?:(.*" + inputRaw.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ".*))", "gi");
    }

    // Get initial matches
    let matches = locationsString.match(initialRegex);

    // Kaktus' fix: If no matches on initial regex, start removing characters and see if we have a match with fluff. Remove this entire block if this causes issues.
    noresult: if (!matches) {

        const minimumChars = isMorse ? 15 : 5;

        for (let i = 1; i < inputRaw.length - minimumChars; i++) {
            const regex2 = isMorse ? new RegExp("(?:(.*" + inputRaw.slice(0, inputRaw.length - i).replaceAll(".", "\\.") + ".*))", "gi") : new RegExp("(?:(.*" + inputRaw.slice(0, inputRaw.length - i).replaceAll(".", "\\.").replaceAll(" ", "") + ".*))", "gi");
            const arr2 = locationsString.match(regex2);
            if (arr2) {
                matches = arr2;
                break noresult;
            }
        }
        locationText.innerHTML = "<span style='color: #ed4245'>❌ No matches found</span>";
        matchesText.innerText = "Matches: (0)";
        resultsBox.value = "No results. Please check your morse.";
        resultsBox.rows = 1;
        resultImage.hidden = true;
        return;
    }

    // Gets the number of matches
    const totalMatches = matches.length;

    // Join the matches with a newline
    matches = matches.join("\n");

    // Fill the resultsBox with the cleaned matches
    resultsBox.value = cleanOutput(matches, inputType);

    // If we have fewer than 10 matches, set the textarea rows to x matches + 1. +1 to account for smaller screens with wrapping. If 10 or more matches, keep rows at 10
    resultsBox.rows = (totalMatches < 10) ? totalMatches + 1 : 10;

    // Populate "Matches (n):" text
    matchesText.innerText = `Matches: (${totalMatches})`;

    // If one match
    if (totalMatches === 1) {

        const match = {
            date: new Date(),
            inputUsed: inputRaw,
            stage: resultsBox.value.match(/Stage (\d)/)[1],
            location: resultsBox.value.match(/Stage \d\) (.*): /)[1],
            location_url: resultsBox.value.match(/(https.*)/)[1].replace("<", "").replace(">", ""),
            map: resultsBox.value.match(/: (.*) (?=\|)/)[1],
            map_url: resultsBox.value.match(/(https.*)/)[1].replace(/\d\.png/, ".png").replace("<", "").replace(">", "")
        };

        // Save match to localStorage
        localStorage.setItem("lastMatch", JSON.stringify(match));

        // Set title tooltip to match
        matchesText.title = `Last match (${match.date}):\nInput: "${match.inputUsed}"\nStage: ${match.stage}\nLocation: ${match.location}\nMap: ${match.map}`;

        // Populate locationText
        locationText.innerHTML = `<a style="text-decoration: none; color: #3ba55c" target='_blank' href='${match.location_url}'>✅ Found on ${match.map} (${match.location})</a>`;

        // if match is not stage 9 (YouTube), show image
        if (match.stage !== "9") {
            resultImage.src = match.location_url;
            resultImage.hidden = false;
        }

    } else if (totalMatches > 1) {
        if (!document.getElementById("check9").checked) {
            locationText.innerHTML = "⏳ Please input more to find exact location";
            resultImage.hidden = true;
        }
    }
}
