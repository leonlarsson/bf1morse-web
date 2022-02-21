function decode(locationJSON) {

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

    // Define output textbox, location text, matches text, results textarea, and result image
    const outputBox = document.getElementById("output");
    const locationText = document.getElementById("locationText");
    const matchesText = document.getElementById("matchesText");
    const resultsBox = document.getElementById("resultsBox");
    const resultImage = document.getElementById("resultImage");

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

    // 1 - Plain
    if (check1.checked) {
        stage = "1";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = input;
    }

    // 2 - Reverse
    if (check2.checked) {
        stage = "2";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = input.split("").reverse().join("");
    }

    // 3 - Atbash
    if (check3.checked) {
        stage = "3";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_3(input) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
            let output = "";

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

    // 4 - Caesarian Shift
    if (check4.checked) {
        stage = "4";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = String.fromCharCode(...input.split('').map(char => ((char.charCodeAt() - 65 + 19) % 26) + 65));
    }

    // 5 - Reverse -> Railfence
    if (check5.checked) {
        stage = "5";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
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

    // 6 - "E">"A", "T">"B" -> Baconian -> Atbash
    if (check6.checked) {
        stage = "6";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
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

    // 7 - Vigenere (pass)
    if (check7.checked) {
        stage = "7";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = VigenereCipher.decrypt(input, "Edward");
    }

    // 8 - Vigenere (autokey)
    if (check8.checked) {
        stage = "8";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;
        outputBox.value = Vigenere(-1, input, "George", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");
    }

    // 9 - Reverse -> Vigenere (autokey) -> Reverse
    if (check9.checked) {
        stage = "9";
        outputBox.setAttribute("placeholder", "Please start typing to see decoded text.");
        isMorse ? input = MorseCode.decode(inputRaw) : input = inputRaw;

        function getOutput_9(input) {
            let string;
            string = input.split("").reverse().join("").toUpperCase();
            string = Vigenere(-1, string, "London", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");
            string = string.split("").reverse().join("").toUpperCase();
            return string;
        }

        outputBox.value = getOutput_9(input);
    }

    if (check10.checked) { // 10 - All
        outputBox.value = "";
        outputBox.setAttribute("placeholder", "Please select a stage if you want to filter results and see the output. This is not required.");
    }

    // Regex stuff
    // Determines which locations to search in. If stage is not specified, search for all. Also determines if to use text or morse locations
    let str;
    if (stage) {

        str = JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}${stage}`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "");

    } else {

        str = `${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}1`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}2`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}3`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}4`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}5`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}6`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}7`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}8`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(locationJSON, `*.*.*.cipher_${inputType}9`)).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}`

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
        locationText.innerHTML = "<span style='color: #ed4245'>❌ No matches found</span>";
        matchesText.innerText = "Matches: (0)";
        resultsBox.value = "No results. Please check your morse.";
        resultImage.hidden = true;
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

    // REPLACE (Make actually readable)
    // Amiens
    // 1-1
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.amiens.location_1.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_1.map_url}${embed2}`);

    // 1-2
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.amiens.location_2.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_2.map_url}${embed2}`);

    // 1-3
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.amiens.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.amiens.location_3.plain_text_spaces}: ${locationJSON.maps.amiens.map_name} | ${embed1}${locationJSON.maps.amiens.location_3.map_url}${embed2}`);

    // Apremont
    // 2-1
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.apremont.location_1.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_1.map_url}${embed2}`);

    // 2-2
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.apremont.location_2.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_2.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.apremont.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.apremont.location_3.plain_text_spaces}: ${locationJSON.maps.apremont.map_name} | ${embed1}${locationJSON.maps.apremont.location_3.map_url}${embed2}`);

    // Varennes
    // 3-1
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.varennes.location_1.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_1.map_url}${embed2}`);

    // 3-2
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.varennes.location_2.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_2.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.varennes.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.varennes.location_3.plain_text_spaces}: ${locationJSON.maps.varennes.map_name} | ${embed1}${locationJSON.maps.varennes.location_3.map_url}${embed2}`);

    // Adriatic
    // 4-1
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.adriatic.location_1.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_1.map_url}${embed2}`);

    // 4-2
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.adriatic.location_2.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_2.map_url}${embed2}`);

    // 4-3
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.adriatic.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.adriatic.location_3.plain_text_spaces}: ${locationJSON.maps.adriatic.map_name} | ${embed1}${locationJSON.maps.adriatic.location_3.map_url}${embed2}`);

    // Faw
    // 5-1
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.faw.location_1.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_1.map_url}${embed2}`);

    // 5-2
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.faw.location_2.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_2.map_url}${embed2}`);

    // 5-3
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.faw.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.faw.location_3.plain_text_spaces}: ${locationJSON.maps.faw.map_name} | ${embed1}${locationJSON.maps.faw.location_3.map_url}${embed2}`);

    // Venetian
    // 6-1
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.venetian.location_1.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_1.map_url}${embed2}`);

    // 6-2
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.venetian.location_2.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_2.map_url}${embed2}`);

    // 6-3
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.venetian.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.venetian.location_3.plain_text_spaces}: ${locationJSON.maps.venetian.map_name} | ${embed1}${locationJSON.maps.venetian.location_3.map_url}${embed2}`);

    // Jifar
    // 7-1
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.jifar.location_1.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_1.map_url}${embed2}`);

    // 7-2
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.jifar.location_2.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_2.map_url}${embed2}`);

    // 7-3
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.jifar.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.jifar.location_3.plain_text_spaces}: ${locationJSON.maps.jifar.map_name} | ${embed1}${locationJSON.maps.jifar.location_3.map_url}${embed2}`);

    // Peronne
    // 8-1
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.peronne.location_1.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_1.map_url}${embed2}`);

    // 8-2
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.peronne.location_2.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_2.map_url}${embed2}`);

    // 8-3
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.peronne.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.peronne.location_3.plain_text_spaces}: ${locationJSON.maps.peronne.map_name} | ${embed1}${locationJSON.maps.peronne.location_3.map_url}${embed2}`);

    // Canal
    // 9-1
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_1[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.canal.location_1.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_1.map_url}${embed2}`);

    // 9-2
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_2[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.canal.location_2.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_2.map_url}${embed2}`);

    // 9-3
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}1`], `(Stage 1) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}2`], `(Stage 2) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}3`], `(Stage 3) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}4`], `(Stage 4) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}5`], `(Stage 5) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}6`], `(Stage 6) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}7`], `(Stage 7) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);
    matches = matches.replace(locationJSON.maps.canal.location_3[`cipher_${inputType}8`], `(Stage 8) ${locationJSON.maps.canal.location_3.plain_text_spaces}: ${locationJSON.maps.canal.map_name} | ${embed1}${locationJSON.maps.canal.location_3.map_url}${embed2}`);

    // 10-1
    matches = matches.replace(locationJSON.maps.giantsshadow.location_1[`cipher_${inputType}9`], `(Stage 9) ${locationJSON.maps.giantsshadow.location_1.plain_text_spaces}: ${locationJSON.maps.giantsshadow.map_name} | ${embed1}${locationJSON.maps.giantsshadow.map_url}${embed2}`);

    // Fill results textarea with matches
    resultsBox.value = matches;

    // Populate "Matches (n):" text
    matchesText.innerText = `Matches: (${totalMatches})`;

    if (totalMatches === 1) {

        const match = {
            date: new Date(),
            stage: matches.match(/Stage (\d)/)[1],
            location: matches.match(/Stage \d\) (.*): /)[1],
            location_url: matches.match(/(https.*)/)[1].replace("<", "").replace(">", ""),
            map: matches.match(/: (.*) (?=\|)/)[1],
            map_url: matches.match(/(https.*)/)[1].replace(/\d\.png/, ".png").replace("<", "").replace(">", "")
        }

        // Save match to localStorage
        localStorage.setItem("lastMatch", JSON.stringify(match));

        // Set title tooltip to match
        matchesText.setAttribute("title", `Last match (${match.date}):\nStage: ${match.stage}\nLocation: ${match.location}\nMap: ${match.map}`);

        // Populate locationText
        locationText.innerHTML = `<a style="text-decoration: none; color: #3ba55c" target='_blank' href='${match.location_url}'>✅ Found on ${match.map} (${match.location})</a>`;

        // if match is not stage 9 (YouTube), show image
        if (match.stage !== "9") {
            resultImage.src = match.location_url;
            resultImage.hidden = false;
        }

    } else if (totalMatches > 1) {
        if (!check9.checked) {
            locationText.innerHTML = "⏳ Please input more to find exact location";
            resultImage.hidden = true;
        }
    }
}
