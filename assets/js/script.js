function decode(locationJson) {

    // Define checkboxes
    const check1 = document.getElementById("check1");
    const check2 = document.getElementById("check2");
    const check3 = document.getElementById("check3");
    const check4 = document.getElementById("check4");
    const check5 = document.getElementById("check5");
    const check6 = document.getElementById("check6");
    const check7 = document.getElementById("check7");
    const check8 = document.getElementById("check8");
    const check9 = document.getElementById("check9");
    const check10 = document.getElementById("check10");

    // Define embed checkbox
    const embedCheck = document.getElementById("noEmbedCheck");

    // Define input
    const inputBox = document.getElementsByClassName("input")[0];
    let inputRaw = inputBox.value.toUpperCase();

    // Define output textbox, location text, and the results textarea
    const outputBox = document.getElementById("output");
    const locationText = document.getElementById("locationText");
    const resultsBox = document.getElementById("resultsBox");

    // Define variables
    let isMorse;
    let inputType;
    let stage;
    let input = "";

    // If input is morse, change the ID (changes the font to a more morse-friendly one)
    if (inputRaw.startsWith(".") || inputRaw.startsWith("-")) {
        isMorse = true;
        inputType = "morse";
        inputBox.setAttribute("id", "inputMorse");
    } else {
        isMorse = false;
        inputType = "text";
        inputBox.setAttribute("id", "input");
    }

    // Stage checking
    if (check1.checked) { // 1 - Plain
        stage = "1";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = input;
    }

    if (check2.checked) { // 2 - Reverse
        stage = "2";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = input.split("").reverse().join("");;
    }

    if (check3.checked) { // 3 - Atbash
        stage = "3";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_3(input) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
            let output = ""

            for (i = 0; i < input.length; i++) {
                const coded_letter = input.charAt(i);
                const letter_index = alphabet.indexOf(coded_letter);
                const decoded_letter = tebahpla.charAt(letter_index);
                output = output + decoded_letter;
            }
            return output;
        }

        outputBox.value = getOutput_3(input);
    }

    if (check4.checked) { // 4 - Caesarian Shift
        stage = "4";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = String.fromCharCode(...input.split('').map(char => ((char.charCodeAt() - 65 + 19) % 26) + 65));
    }

    if (check5.checked) { // 5 - Reverse -> Railfence
        stage = "5";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_5(input) {
            const ciphertext = input.split("").reverse().join("").toUpperCase().replace(/[^A-Z]/g, "");
            const key = 5;
            const pt = new Array(ciphertext.length); k = 0;

            for (line = 0; line < key - 1; line++) {
                skip = 2 * (key - line - 1); j = 0;

                for (i = line; i < ciphertext.length;) {
                    pt[i] = ciphertext.charAt(k++);
                    if ((line == 0) || (j % 2 == 0)) i += skip;
                    else i += 2 * (key - 1) - skip;
                    j++;
                }
            }
            for (i = line; i < ciphertext.length; i += 2 * (key - 1)) pt[i] = ciphertext.charAt(k++);
            return pt.join("");
        }

        outputBox.value = getOutput_5(input);
    }

    if (check6.checked) { // 6 - "E">"A", "T">"B" -> Baconian -> Atbash
        stage = "6";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_6(input) {
            let text = input;
            text = text.replace(/E/g, "A").replace(/T/g, "B");
            text = bacon.decode(text, {
                "alphabet": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            })

            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
            let output = "";

            for (i = 0; i < text.length; i++) {
                const coded_letter = text.charAt(i);
                const letter_index = alphabet.indexOf(coded_letter);
                const decoded_letter = tebahpla.charAt(letter_index);
                output = output + decoded_letter;
            }
            return output;
        }

        outputBox.value = getOutput_6(input);
    }

    if (check7.checked) { // 7 - Vigenere (pass)
        stage = "7";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = VigenereCipher.decrypt(input, "Edward");
    }

    if (check8.checked) { // 8 - Vigenere (autokey)
        stage = "8";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = Vigenere(-1, input, "George", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z")
    }

    if (check9.checked) { // 9 - Reverse -> Vigenere (autokey) -> Reverse
        stage = "9";
        outputBox.removeAttribute("placeholder");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_9(input) {
            let string;
            string = input.split("").reverse().join("").toUpperCase();
            string = Vigenere(-1, string, "London", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z")
            string = string.split("").reverse().join("").toUpperCase();
            return string;
        }

        outputBox.value = getOutput_9(input);
        locationText.innerHTML = "<a id='locationLink' target='_blank' href='https://www.youtube.com/watch?v=WjGDr5J6QjQ'>You reached the final stage! Head to Giant's Shadow.</a>";
    }

    if (check10.checked) { // 10 - All
        outputBox.value = "";
        outputBox.setAttribute("placeholder", "Please select a stage if you want to filter results and see the output. This is not required.");
    }

    // Regex stuff
    // Determines which locations to search in. If stage is not specified, search for all. Also determines if to use text or morse locations.
    let str;
    if (stage) {

        str = JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}${stage}`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "");

    } else {

        str = `${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}1`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}2`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}3`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}4`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}5`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}6`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}7`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}8`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJson, `*.*.*.cipher_${inputType}9`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}`

    }

    // Create initial regex
    let initialRegex;
    if (inputBox.value == "") { // If no input, display everything. Replace morse input to escape the special regex dot. Works with both text and morse.
        initialRegex = new RegExp("(?:(.*..*))", "gi");
    } else {
        initialRegex = new RegExp("(?:(.*" + inputRaw.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ".*))", "gi");
    }

    // Get initial matches
    let matches = str.match(initialRegex);

    // Kaktus' fix: If no matches on initial regex, start removing characters and see if we have a match with fluff. Remove this entire block if this causes issues.
    noresult: if (matches === null) {

        let minimumChars;
        isMorse ? minimumChars = 15 : minimumChars = 5;

        let regex2;
        for (i = 1; i < inputRaw.length - minimumChars; i++) {
            if (isMorse) {
                regex2 = new RegExp("(?:(.*" + inputRaw.slice(0, inputRaw.length - i).replaceAll(".", "\\.") + ".*))", "gi");
            } else {
                regex2 = new RegExp("(?:(.*" + inputRaw.slice(0, inputRaw.length - i).replaceAll(".", "\\.").replaceAll(" ", "") + ".*))", "gi");
            }
            const arr2 = str.match(regex2);
            if (arr2) {
                matches = arr2;
                break noresult;
            }
        }
        resultsBox.value = "No results. Please check your morse.";
        locationText.innerText = "No matches found. Please ask #easter-egg-help.";
        document.getElementById("matchesText").innerText = `Matches: (0)`;
        return;
    }

    // Gets the number of matches
    totalMatches = matches.length;

    // Join the matches with a newline
    matches = matches.join("\n");

    // If checked, prevent embed on links
    let embed1, embed2;
    if (embedCheck.checked) {
        embed1 = "<";
        embed2 = ">";
    } else {
        embed1 = "";
        embed2 = "";
    }

    // REPLACE (Make actually readable) //
    // Amiens
    // 1-1
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.amiens.location_1.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);

    // 1-2
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.amiens.location_2.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);

    // 1-3
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.amiens.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.amiens.location_3.plain_text_spaces}: ${locationJson.maps.amiens.map_name} | ${embed1}${locationJson.maps.amiens.map_url}${embed2}`);

    // Apremont
    // 2-1
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.apremont.location_1.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);

    // 2-2
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.apremont.location_2.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.apremont.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.apremont.location_3.plain_text_spaces}: ${locationJson.maps.apremont.map_name} | ${embed1}${locationJson.maps.apremont.map_url}${embed2}`);

    // Varennes
    // 3-1
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.varennes.location_1.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);

    // 3-2
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.varennes.location_2.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.varennes.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.varennes.location_3.plain_text_spaces}: ${locationJson.maps.varennes.map_name} | ${embed1}${locationJson.maps.varennes.map_url}${embed2}`);

    // Adriatic
    // 4-1
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.adriatic.location_1.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);

    // 4-2
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.adriatic.location_2.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);

    // 4-3
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.adriatic.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.adriatic.location_3.plain_text_spaces}: ${locationJson.maps.adriatic.map_name} | ${embed1}${locationJson.maps.adriatic.map_url}${embed2}`);

    // Faw
    // 5-1
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.faw.location_1.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);

    // 5-2
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.faw.location_2.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);

    // 5-3
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.faw.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.faw.location_3.plain_text_spaces}: ${locationJson.maps.faw.map_name} | ${embed1}${locationJson.maps.faw.map_url}${embed2}`);

    // Venetian
    // 6-1
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.venetian.location_1.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);

    // 6-2
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.venetian.location_2.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);

    // 6-3
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.venetian.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.venetian.location_3.plain_text_spaces}: ${locationJson.maps.venetian.map_name} | ${embed1}${locationJson.maps.venetian.map_url}${embed2}`);

    // Jifar
    // 7-1
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.jifar.location_1.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);

    // 7-2
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.jifar.location_2.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);

    // 7-3
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.jifar.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.jifar.location_3.plain_text_spaces}: ${locationJson.maps.jifar.map_name} | ${embed1}${locationJson.maps.jifar.map_url}${embed2}`);

    // Peronne
    // 8-1
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.peronne.location_1.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);

    // 8-2
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.peronne.location_2.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);

    // 8-3
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.peronne.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.peronne.location_3.plain_text_spaces}: ${locationJson.maps.peronne.map_name} | ${embed1}${locationJson.maps.peronne.map_url}${embed2}`);

    // Canal
    // 9-1
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.canal.location_1.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);

    // 9-2
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.canal.location_2.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);

    // 9-3
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);
    matches = matches.replace(locationJson.maps.canal.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJson.maps.canal.location_3.plain_text_spaces}: ${locationJson.maps.canal.map_name} | ${embed1}${locationJson.maps.canal.map_url}${embed2}`);

    // 10-1
    matches = matches.replace(locationJson.maps.giantsshadow.location_1[`cipher_${inputType}9`], `(Stage 9) ${locationJson.maps.giantsshadow.location_1.plain_text_spaces}: ${locationJson.maps.giantsshadow.map_name} | ${embed1}${locationJson.maps.giantsshadow.map_url}${embed2}`);

    resultsBox.value = matches;

    document.getElementById("matchesText").innerText = `Matches: (${totalMatches})`;

    if (totalMatches === 1) {
        if (resultsBox.value.includes(locationJson.maps.amiens.location_1.plain_text_spaces)) { // amiens 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.amiens.map_url}'>Found on ${locationJson.maps.amiens.map_name} (${locationJson.maps.amiens.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.amiens.location_2.plain_text_spaces)) { // amiens 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.amiens.map_url}'>Found on ${locationJson.maps.amiens.map_name} (${locationJson.maps.amiens.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.amiens.location_3.plain_text_spaces)) { // amiens 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.amiens.map_url}'>Found on ${locationJson.maps.amiens.map_name} (${locationJson.maps.amiens.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.apremont.location_1.plain_text_spaces)) { // apremont 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.apremont.map_url}'>Found on ${locationJson.maps.apremont.map_name} (${locationJson.maps.apremont.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.apremont.location_2.plain_text_spaces)) { // apremont 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.apremont.map_url}'>Found on ${locationJson.maps.apremont.map_name} (${locationJson.maps.apremont.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.apremont.location_3.plain_text_spaces)) { // apremont 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.apremont.map_url}'>Found on ${locationJson.maps.apremont.map_name} (${locationJson.maps.apremont.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.varennes.location_1.plain_text_spaces)) { // varennes 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.varennes.map_url}'>Found on ${locationJson.maps.varennes.map_name} (${locationJson.maps.varennes.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.varennes.location_2.plain_text_spaces)) { // varennes 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.varennes.map_url}'>Found on ${locationJson.maps.varennes.map_name} (${locationJson.maps.varennes.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.varennes.location_3.plain_text_spaces)) { // varennes 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.varennes.map_url}'>Found on ${locationJson.maps.varennes.map_name} (${locationJson.maps.varennes.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.adriatic.location_1.plain_text_spaces)) { // adriatic 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.adriatic.map_url}'>Found on ${locationJson.maps.adriatic.map_name} (${locationJson.maps.adriatic.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.adriatic.location_2.plain_text_spaces)) { // adriatic 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.adriatic.map_url}'>Found on ${locationJson.maps.adriatic.map_name} (${locationJson.maps.adriatic.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.adriatic.location_3.plain_text_spaces)) { // adriatic 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.adriatic.map_url}'>Found on ${locationJson.maps.adriatic.map_name} (${locationJson.maps.adriatic.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.faw.location_1.plain_text_spaces)) { // faw 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.faw.map_url}'>Found on ${locationJson.maps.faw.map_name} (${locationJson.maps.faw.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.faw.location_2.plain_text_spaces)) { // faw 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.faw.map_url}'>Found on ${locationJson.maps.faw.map_name} (${locationJson.maps.faw.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.faw.location_3.plain_text_spaces)) { // faw 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.faw.map_url}'>Found on ${locationJson.maps.faw.map_name} (${locationJson.maps.faw.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.venetian.location_1.plain_text_spaces)) { // venetian 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.venetian.map_url}'>Found on ${locationJson.maps.venetian.map_name} (${locationJson.maps.venetian.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.venetian.location_2.plain_text_spaces)) { // venetian 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.venetian.map_url}'>Found on ${locationJson.maps.venetian.map_name} (${locationJson.maps.venetian.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.venetian.location_3.plain_text_spaces)) { // venetian 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.venetian.map_url}'>Found on ${locationJson.maps.venetian.map_name} (${locationJson.maps.venetian.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.jifar.location_1.plain_text_spaces)) { // jifar 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.jifar.map_url}'>Found on ${locationJson.maps.jifar.map_name} (${locationJson.maps.jifar.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.jifar.location_2.plain_text_spaces)) { // jifar 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.jifar.map_url}'>Found on ${locationJson.maps.jifar.map_name} (${locationJson.maps.jifar.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.jifar.location_3.plain_text_spaces)) { // jifar 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.jifar.map_url}'>Found on ${locationJson.maps.jifar.map_name} (${locationJson.maps.jifar.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.peronne.location_1.plain_text_spaces)) { // peronne 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.peronne.map_url}'>Found on ${locationJson.maps.peronne.map_name} (${locationJson.maps.peronne.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.peronne.location_2.plain_text_spaces)) { // peronne 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.peronne.map_url}'>Found on ${locationJson.maps.peronne.map_name} (${locationJson.maps.peronne.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.peronne.location_3.plain_text_spaces)) { // peronne 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.peronne.map_url}'>Found on ${locationJson.maps.peronne.map_name} (${locationJson.maps.peronne.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.canal.location_1.plain_text_spaces)) { // canal 1
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.canal.map_url}'>Found on ${locationJson.maps.canal.map_name} (${locationJson.maps.canal.location_1.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.canal.location_2.plain_text_spaces)) { // canal 2
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.canal.map_url}'>Found on ${locationJson.maps.canal.map_name} (${locationJson.maps.canal.location_2.plain_text_spaces})</a>`;
        }
        if (resultsBox.value.includes(locationJson.maps.canal.location_3.plain_text_spaces)) { // canal 3
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.canal.map_url}'>Found on ${locationJson.maps.canal.map_name} (${locationJson.maps.canal.location_3.plain_text_spaces})</a>`;
        }

        if (resultsBox.value.includes(locationJson.maps.giantsshadow.location_1.plain_text_spaces)) { // final
            locationText.innerHTML = `<a id='locationLink' target='_blank' href='${locationJson.maps.giantsshadow.map_url}'>Found on ${locationJson.maps.giantsshadow.map_name} (${locationJson.maps.giantsshadow.location_1.plain_text_spaces})</a>`;
        }

    } else if (totalMatches > 1) {
        if (!check9.checked) {
            locationText.innerHTML = `Please input more to find exact location.`;
        }
    }
}
