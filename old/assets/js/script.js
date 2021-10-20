function decode() {

    var check1 = document.getElementById("check1");
    var check2 = document.getElementById("check2");
    var check3 = document.getElementById("check3");
    var check4 = document.getElementById("check4");
    var check5 = document.getElementById("check5");
    var check6 = document.getElementById("check6");
    var check7 = document.getElementById("check7");
    var check8 = document.getElementById("check8");
    var check9 = document.getElementById("check9");
    var check10 = document.getElementById("check10");

    var embedCheck = document.getElementById("noEmbedCheck");

    var input = document.getElementsByClassName("input")[0];
    var output = document.getElementById("output");
    var location = document.getElementById("locationText");
    var textarea = document.getElementById("resultsBox");

    // json = JSON.parse(sessionStorage.getItem("json")); // Removed for json variable

    var inputUse = input.value;

    // If input is morse, change the ID (changes the font to a more morse-friendly one)
    if (input.value.startsWith(".") || input.value.startsWith("-")) {
        isMorse = true;
        input.setAttribute("id", "inputMorse")
    } else {
        isMorse = false;
        input.setAttribute("id", "input")
    }

    // Stage checking
    if (check1.checked) { // 1 - Plain
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse1")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text1")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }
        output.value = string.toUpperCase();
    }

    if (check2.checked) { // 2 - Reverse
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse2")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text2")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        string = string.split("").reverse().join("");
        output.value = string.toUpperCase();
    }

    if (check3.checked) { // 3 - Atbash
        output.removeAttribute("placeholder");
        var rawText = input.value.toUpperCase();

        if (isMorse) {
            rawText = MorseCode.decode(rawText);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse3")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text3")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
        var string = "";

        for (i = 0; i < rawText.length; i++) {
            var coded_letter = rawText.charAt(i);
            var letter_index = alphabet.indexOf(coded_letter);
            var decoded_letter = tebahpla.charAt(letter_index);
            string = string + decoded_letter;
        }
        output.value = string;
    }

    if (check4.checked) { // 4 - Caesarian Shift
        output.removeAttribute("placeholder");
        var string = input.value.toUpperCase();

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse4")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text4")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        output.value = String.fromCharCode(...string.split('').map(char => ((char.charCodeAt() - 65 + 19) % 26) + 65));
    }

    if (check5.checked) { // 5 - Reverse -> Railfence
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse5")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text5")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        string = string.split("").reverse().join("").toUpperCase();


        ciphertext = string.replace(/[^A-Z]/g, "");
        var key = 5;
        pt = new Array(ciphertext.length); k = 0;
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
        output.value = pt.join("");
    }

    if (check6.checked) { // 6 - "E">"A", "T">"B" -> Baconian -> Atbash
        output.removeAttribute("placeholder");
        var string = input.value.toUpperCase();

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse6")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text6")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        var text = string;
        text = text.replace(/E/g, "A").replace(/T/g, "B");
        text = bacon.decode(text, {
            "alphabet": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        })

        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
        var string = "";

        for (i = 0; i < text.length; i++) {
            var coded_letter = text.charAt(i);
            var letter_index = alphabet.indexOf(coded_letter);
            var decoded_letter = tebahpla.charAt(letter_index);
            string = string + decoded_letter;
        }
        output.value = string;
    }

    if (check7.checked) { // 7 - Vigenere (pass)
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse7")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text7")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        string = string.toUpperCase();
        output.value = VigenereCipher.decrypt(string, "Edward");
    }

    if (check8.checked) { // 8 - Vigenere (autokey)
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse8")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text8")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        string = string.toUpperCase();
        output.value = Vigenere(-1, string, "George", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z")
    }

    if (check9.checked) { // 9 - Reverse -> Vigenere (autokey) -> Reverse
        output.removeAttribute("placeholder");
        var string = input.value;

        if (isMorse) {
            string = MorseCode.decode(string);
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse9")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        } else {
            var str = JSON.stringify(jmespath.search(json, "*.*.*.cipher_text9")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")
        }

        string = string.split("").reverse().join("").toUpperCase();
        string = Vigenere(-1, string, "London", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z")
        string = string.split("").reverse().join("").toUpperCase();
        output.value = string;
        location.innerHTML = "<a id='locationLink' target='_blank' href='https://www.youtube.com/watch?v=WjGDr5J6QjQ'>You reached the final stage! Head to Giant's Shadow.</a>";
    }

    if (check10.checked) { // 10 - All
        output.value = "";
        output.setAttribute("placeholder", "Please select a stage if you want to filter results and see the output. This is not required.");
    }


    // Regex stuff

    if (!check1.checked && !check2.checked && !check3.checked && !check4.checked && !check5.checked && !check6.checked && !check7.checked && !check8.checked && !check9.checked) {

        if (isMorse) {
            var str = `${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse1")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse2")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse3")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse4")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse5")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse6")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse7")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse8")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_morse9")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}`
        } else {
            var str = `${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text1")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text2")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text3")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text4")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text5")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text6")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text7")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text8")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}
${JSON.stringify(jmespath.search(json, "*.*.*.cipher_text9")).replaceAll(`","`, "\n").replaceAll(`"],["`, "\n").replaceAll(",", "").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "")}`
        }
    }

    if (input.value == "") { // If no input, display everything. Replace morse input to escape the special regex dot. Works with both text and morse.
        var regex = new RegExp("(?:(.*" + str + ".*))", "gi");
    } else {
        var regex = new RegExp("(?:(.*" + inputUse.replaceAll(".", "\\.") + ".*))", "gi");
    }

    arr = str.match(regex);

    noresult: if (arr == null) {

        // Dirtiest fix
        // Start removing character and se if we have a match with fluff
        var minimumChars = 5;
        if (isMorse) {
            minimumChars = 15;
        }
        for (i = 1; i < inputUse.length - minimumChars; i++) {
            if (isMorse) {
                var regex2 = new RegExp("(?:(.*" + inputUse.slice(0, inputUse.length - i).replaceAll(".", "\\.") + ".*))", "gi");
            } else {
                var regex2 = new RegExp("(?:(.*" + inputUse.slice(0, inputUse.length - i).replaceAll(".", "\\.").replaceAll(" ", "") + ".*))", "gi");
            }
            arr2 = str.match(regex2);
            if (arr2) {
                arr = arr2;
                break noresult;
            }
        }

        textarea.value = "No results. Please check your morse.";
        location.innerText = "No matches found. Please ask #easter-egg-help.";
        document.getElementById("matchesText").innerText = `Matches: (0)`;
        return;
    }

    matches = arr[0] + "\n" + arr[1] + "\n" + arr[2] + "\n" + arr[3] + "\n" + arr[4] + "\n" + arr[5] + "\n" + arr[6] + "\n" + arr[7] + "\n" + arr[8] + "\n" + arr[9]
        + "\n" + arr[10] + "\n" + arr[11] + "\n" + arr[12] + "\n" + arr[13] + "\n" + arr[14] + "\n" + arr[15] + "\n" + arr[16] + "\n" + arr[17] + "\n" + arr[18] + "\n" + arr[19] + "\n" + arr[20]
        + "\n" + arr[21] + "\n" + arr[22] + "\n" + arr[23] + "\n" + arr[24] + "\n" + arr[25] + "\n" + arr[26] + "\n" + arr[27] + "\n" + arr[28];


    var textarea = document.getElementById("resultsBox");
    var location = document.getElementById("locationText");

    // json = JSON.parse(sessionStorage.getItem("json")); // Removed for json variable

    // Replace the raw output (match) with a pretty version with more information. 2 sets for each (Morse/Text)

    if (embedCheck.checked) { // If checked, prevent embed on links
        var embed1 = "<";
        var embed2 = ">";
    } else {
        var embed1 = "";
        var embed2 = "";
    }

    // Morse Replace
    // Amiens
    // 1-1
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse1, `(Stage 1) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse2, `(Stage 2) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse3, `(Stage 3) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse4, `(Stage 4) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse5, `(Stage 5) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse6, `(Stage 6) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse7, `(Stage 7) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_morse8, `(Stage 8) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // 1-2
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse1, `(Stage 1) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse2, `(Stage 2) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse3, `(Stage 3) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse4, `(Stage 4) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse5, `(Stage 5) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse6, `(Stage 6) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse7, `(Stage 7) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_morse8, `(Stage 8) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // 1-3
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse1, `(Stage 1) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse2, `(Stage 2) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse3, `(Stage 3) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse4, `(Stage 4) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse5, `(Stage 5) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse6, `(Stage 6) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse7, `(Stage 7) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_morse8, `(Stage 8) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // Apremont
    // 2-1
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse1, `(Stage 1) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse2, `(Stage 2) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse3, `(Stage 3) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse4, `(Stage 4) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse5, `(Stage 5) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse6, `(Stage 6) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse7, `(Stage 7) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_morse8, `(Stage 8) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // 2-2
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse1, `(Stage 1) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse2, `(Stage 2) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse3, `(Stage 3) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse4, `(Stage 4) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse5, `(Stage 5) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse6, `(Stage 6) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse7, `(Stage 7) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_morse8, `(Stage 8) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse1, `(Stage 1) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse2, `(Stage 2) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse3, `(Stage 3) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse4, `(Stage 4) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse5, `(Stage 5) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse6, `(Stage 6) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse7, `(Stage 7) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_morse8, `(Stage 8) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // Varennes
    // 3-1
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse1, `(Stage 1) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse2, `(Stage 2) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse3, `(Stage 3) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse4, `(Stage 4) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse5, `(Stage 5) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse6, `(Stage 6) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse7, `(Stage 7) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_morse8, `(Stage 8) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // 3-2
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse1, `(Stage 1) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse2, `(Stage 2) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse3, `(Stage 3) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse4, `(Stage 4) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse5, `(Stage 5) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse6, `(Stage 6) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse7, `(Stage 7) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_morse8, `(Stage 8) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse1, `(Stage 1) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse2, `(Stage 2) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse3, `(Stage 3) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse4, `(Stage 4) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse5, `(Stage 5) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse6, `(Stage 6) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse7, `(Stage 7) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_morse8, `(Stage 8) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // Adriatic
    // 4-1
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse1, `(Stage 1) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse2, `(Stage 2) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse3, `(Stage 3) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse4, `(Stage 4) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse5, `(Stage 5) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse6, `(Stage 6) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse7, `(Stage 7) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_morse8, `(Stage 8) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // 4-2
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse1, `(Stage 1) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse2, `(Stage 2) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse3, `(Stage 3) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse4, `(Stage 4) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse5, `(Stage 5) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse6, `(Stage 6) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse7, `(Stage 7) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_morse8, `(Stage 8) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // 4-3
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse1, `(Stage 1) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse2, `(Stage 2) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse3, `(Stage 3) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse4, `(Stage 4) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse5, `(Stage 5) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse6, `(Stage 6) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse7, `(Stage 7) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_morse8, `(Stage 8) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // Faw
    // 5-1
    matches = matches.replace(json.maps.faw.location_1.cipher_morse1, `(Stage 1) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse2, `(Stage 2) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse3, `(Stage 3) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse4, `(Stage 4) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse5, `(Stage 5) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse6, `(Stage 6) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse7, `(Stage 7) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_morse8, `(Stage 8) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // 5-2
    matches = matches.replace(json.maps.faw.location_2.cipher_morse1, `(Stage 1) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse2, `(Stage 2) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse3, `(Stage 3) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse4, `(Stage 4) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse5, `(Stage 5) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse6, `(Stage 6) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse7, `(Stage 7) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_morse8, `(Stage 8) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // 5-3
    matches = matches.replace(json.maps.faw.location_3.cipher_morse1, `(Stage 1) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse2, `(Stage 2) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse3, `(Stage 3) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse4, `(Stage 4) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse5, `(Stage 5) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse6, `(Stage 6) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse7, `(Stage 7) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_morse8, `(Stage 8) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // Venetian
    // 6-1
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse1, `(Stage 1) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse2, `(Stage 2) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse3, `(Stage 3) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse4, `(Stage 4) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse5, `(Stage 5) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse6, `(Stage 6) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse7, `(Stage 7) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_morse8, `(Stage 8) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // 6-2
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse1, `(Stage 1) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse2, `(Stage 2) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse3, `(Stage 3) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse4, `(Stage 4) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse5, `(Stage 5) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse6, `(Stage 6) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse7, `(Stage 7) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_morse8, `(Stage 8) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // 6-3
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse1, `(Stage 1) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse2, `(Stage 2) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse3, `(Stage 3) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse4, `(Stage 4) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse5, `(Stage 5) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse6, `(Stage 6) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse7, `(Stage 7) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_morse8, `(Stage 8) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // Jifar
    // 7-1
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse1, `(Stage 1) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse2, `(Stage 2) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse3, `(Stage 3) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse4, `(Stage 4) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse5, `(Stage 5) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse6, `(Stage 6) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse7, `(Stage 7) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_morse8, `(Stage 8) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // 7-2
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse1, `(Stage 1) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse2, `(Stage 2) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse3, `(Stage 3) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse4, `(Stage 4) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse5, `(Stage 5) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse6, `(Stage 6) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse7, `(Stage 7) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_morse8, `(Stage 8) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // 7-3
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse1, `(Stage 1) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse2, `(Stage 2) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse3, `(Stage 3) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse4, `(Stage 4) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse5, `(Stage 5) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse6, `(Stage 6) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse7, `(Stage 7) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_morse8, `(Stage 8) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // Peronne
    // 8-1
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse1, `(Stage 1) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse2, `(Stage 2) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse3, `(Stage 3) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse4, `(Stage 4) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse5, `(Stage 5) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse6, `(Stage 6) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse7, `(Stage 7) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_morse8, `(Stage 8) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // 8-2
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse1, `(Stage 1) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse2, `(Stage 2) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse3, `(Stage 3) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse4, `(Stage 4) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse5, `(Stage 5) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse6, `(Stage 6) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse7, `(Stage 7) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_morse8, `(Stage 8) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // 8-3
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse1, `(Stage 1) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse2, `(Stage 2) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse3, `(Stage 3) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse4, `(Stage 4) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse5, `(Stage 5) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse6, `(Stage 6) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse7, `(Stage 7) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_morse8, `(Stage 8) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // Canal
    // 9-1
    matches = matches.replace(json.maps.canal.location_1.cipher_morse1, `(Stage 1) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse2, `(Stage 2) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse3, `(Stage 3) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse4, `(Stage 4) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse5, `(Stage 5) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse6, `(Stage 6) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse7, `(Stage 7) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_morse8, `(Stage 8) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 9-2
    matches = matches.replace(json.maps.canal.location_2.cipher_morse1, `(Stage 1) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse2, `(Stage 2) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse3, `(Stage 3) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse4, `(Stage 4) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse5, `(Stage 5) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse6, `(Stage 6) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse7, `(Stage 7) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_morse8, `(Stage 8) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 9-3
    matches = matches.replace(json.maps.canal.location_3.cipher_morse1, `(Stage 1) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse2, `(Stage 2) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse3, `(Stage 3) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse4, `(Stage 4) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse5, `(Stage 5) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse6, `(Stage 6) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse7, `(Stage 7) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_morse8, `(Stage 8) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 10-1
    matches = matches.replace(json.maps.giantsshadow.location_1.cipher_morse9, `(Stage 9) ${json.maps.giantsshadow.location_1.plain_text_spaces}: ${json.maps.giantsshadow.map_name} | ${embed1}${json.maps.giantsshadow.map_url}${embed2}`);

    // Text Replace
    // Amiens
    // 1-1
    matches = matches.replace(json.maps.amiens.location_1.cipher_text1, `(Stage 1) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text2, `(Stage 2) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text3, `(Stage 3) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text4, `(Stage 4) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text5, `(Stage 5) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text6, `(Stage 6) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text7, `(Stage 7) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_1.cipher_text8, `(Stage 8) ${json.maps.amiens.location_1.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // 1-2
    matches = matches.replace(json.maps.amiens.location_2.cipher_text1, `(Stage 1) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text2, `(Stage 2) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text3, `(Stage 3) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text4, `(Stage 4) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text5, `(Stage 5) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text6, `(Stage 6) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text7, `(Stage 7) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_2.cipher_text8, `(Stage 8) ${json.maps.amiens.location_2.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // 1-3
    matches = matches.replace(json.maps.amiens.location_3.cipher_text1, `(Stage 1) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text2, `(Stage 2) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text3, `(Stage 3) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text4, `(Stage 4) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text5, `(Stage 5) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text6, `(Stage 6) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text7, `(Stage 7) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);
    matches = matches.replace(json.maps.amiens.location_3.cipher_text8, `(Stage 8) ${json.maps.amiens.location_3.plain_text_spaces}: ${json.maps.amiens.map_name} | ${embed1}${json.maps.amiens.map_url}${embed2}`);

    // Apremont
    // 2-1
    matches = matches.replace(json.maps.apremont.location_1.cipher_text1, `(Stage 1) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text2, `(Stage 2) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text3, `(Stage 3) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text4, `(Stage 4) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text5, `(Stage 5) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text6, `(Stage 6) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text7, `(Stage 7) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_1.cipher_text8, `(Stage 8) ${json.maps.apremont.location_1.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // 2-2
    matches = matches.replace(json.maps.apremont.location_2.cipher_text1, `(Stage 1) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text2, `(Stage 2) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text3, `(Stage 3) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text4, `(Stage 4) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text5, `(Stage 5) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text6, `(Stage 6) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text7, `(Stage 7) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_2.cipher_text8, `(Stage 8) ${json.maps.apremont.location_2.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(json.maps.apremont.location_3.cipher_text1, `(Stage 1) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text2, `(Stage 2) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text3, `(Stage 3) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text4, `(Stage 4) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text5, `(Stage 5) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text6, `(Stage 6) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text7, `(Stage 7) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);
    matches = matches.replace(json.maps.apremont.location_3.cipher_text8, `(Stage 8) ${json.maps.apremont.location_3.plain_text_spaces}: ${json.maps.apremont.map_name} | ${embed1}${json.maps.apremont.map_url}${embed2}`);

    // Varennes
    // 3-1
    matches = matches.replace(json.maps.varennes.location_1.cipher_text1, `(Stage 1) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text2, `(Stage 2) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text3, `(Stage 3) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text4, `(Stage 4) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text5, `(Stage 5) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text6, `(Stage 6) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text7, `(Stage 7) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_1.cipher_text8, `(Stage 8) ${json.maps.varennes.location_1.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // 3-2
    matches = matches.replace(json.maps.varennes.location_2.cipher_text1, `(Stage 1) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text2, `(Stage 2) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text3, `(Stage 3) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text4, `(Stage 4) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text5, `(Stage 5) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text6, `(Stage 6) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text7, `(Stage 7) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_2.cipher_text8, `(Stage 8) ${json.maps.varennes.location_2.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // 3-3
    matches = matches.replace(json.maps.varennes.location_3.cipher_text1, `(Stage 1) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text2, `(Stage 2) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text3, `(Stage 3) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text4, `(Stage 4) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text5, `(Stage 5) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text6, `(Stage 6) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text7, `(Stage 7) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);
    matches = matches.replace(json.maps.varennes.location_3.cipher_text8, `(Stage 8) ${json.maps.varennes.location_3.plain_text_spaces}: ${json.maps.varennes.map_name} | ${embed1}${json.maps.varennes.map_url}${embed2}`);

    // Adriatic
    // 4-1
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text1, `(Stage 1) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text2, `(Stage 2) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text3, `(Stage 3) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text4, `(Stage 4) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text5, `(Stage 5) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text6, `(Stage 6) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text7, `(Stage 7) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_1.cipher_text8, `(Stage 8) ${json.maps.adriatic.location_1.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // 4-2
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text1, `(Stage 1) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text2, `(Stage 2) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text3, `(Stage 3) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text4, `(Stage 4) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text5, `(Stage 5) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text6, `(Stage 6) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text7, `(Stage 7) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_2.cipher_text8, `(Stage 8) ${json.maps.adriatic.location_2.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // 4-3
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text1, `(Stage 1) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text2, `(Stage 2) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text3, `(Stage 3) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text4, `(Stage 4) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text5, `(Stage 5) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text6, `(Stage 6) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text7, `(Stage 7) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);
    matches = matches.replace(json.maps.adriatic.location_3.cipher_text8, `(Stage 8) ${json.maps.adriatic.location_3.plain_text_spaces}: ${json.maps.adriatic.map_name} | ${embed1}${json.maps.adriatic.map_url}${embed2}`);

    // Faw
    // 5-1
    matches = matches.replace(json.maps.faw.location_1.cipher_text1, `(Stage 1) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text2, `(Stage 2) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text3, `(Stage 3) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text4, `(Stage 4) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text5, `(Stage 5) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text6, `(Stage 6) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text7, `(Stage 7) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_1.cipher_text8, `(Stage 8) ${json.maps.faw.location_1.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // 5-2
    matches = matches.replace(json.maps.faw.location_2.cipher_text1, `(Stage 1) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text2, `(Stage 2) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text3, `(Stage 3) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text4, `(Stage 4) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text5, `(Stage 5) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text6, `(Stage 6) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text7, `(Stage 7) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_2.cipher_text8, `(Stage 8) ${json.maps.faw.location_2.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // 5-3
    matches = matches.replace(json.maps.faw.location_3.cipher_text1, `(Stage 1) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text2, `(Stage 2) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text3, `(Stage 3) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text4, `(Stage 4) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text5, `(Stage 5) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text6, `(Stage 6) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text7, `(Stage 7) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);
    matches = matches.replace(json.maps.faw.location_3.cipher_text8, `(Stage 8) ${json.maps.faw.location_3.plain_text_spaces}: ${json.maps.faw.map_name} | ${embed1}${json.maps.faw.map_url}${embed2}`);

    // Venetian
    // 6-1
    matches = matches.replace(json.maps.venetian.location_1.cipher_text1, `(Stage 1) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text2, `(Stage 2) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text3, `(Stage 3) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text4, `(Stage 4) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text5, `(Stage 5) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text6, `(Stage 6) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text7, `(Stage 7) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_1.cipher_text8, `(Stage 8) ${json.maps.venetian.location_1.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // 6-2
    matches = matches.replace(json.maps.venetian.location_2.cipher_text1, `(Stage 1) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text2, `(Stage 2) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text3, `(Stage 3) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text4, `(Stage 4) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text5, `(Stage 5) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text6, `(Stage 6) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text7, `(Stage 7) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_2.cipher_text8, `(Stage 8) ${json.maps.venetian.location_2.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // 6-3
    matches = matches.replace(json.maps.venetian.location_3.cipher_text1, `(Stage 1) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text2, `(Stage 2) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text3, `(Stage 3) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text4, `(Stage 4) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text5, `(Stage 5) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text6, `(Stage 6) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text7, `(Stage 7) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);
    matches = matches.replace(json.maps.venetian.location_3.cipher_text8, `(Stage 8) ${json.maps.venetian.location_3.plain_text_spaces}: ${json.maps.venetian.map_name} | ${embed1}${json.maps.venetian.map_url}${embed2}`);

    // Jifar
    // 7-1
    matches = matches.replace(json.maps.jifar.location_1.cipher_text1, `(Stage 1) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text2, `(Stage 2) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text3, `(Stage 3) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text4, `(Stage 4) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text5, `(Stage 5) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text6, `(Stage 6) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text7, `(Stage 7) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_1.cipher_text8, `(Stage 8) ${json.maps.jifar.location_1.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // 7-2
    matches = matches.replace(json.maps.jifar.location_2.cipher_text1, `(Stage 1) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text2, `(Stage 2) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text3, `(Stage 3) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text4, `(Stage 4) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text5, `(Stage 5) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text6, `(Stage 6) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text7, `(Stage 7) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_2.cipher_text8, `(Stage 8) ${json.maps.jifar.location_2.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // 7-3
    matches = matches.replace(json.maps.jifar.location_3.cipher_text1, `(Stage 1) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text2, `(Stage 2) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text3, `(Stage 3) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text4, `(Stage 4) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text5, `(Stage 5) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text6, `(Stage 6) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text7, `(Stage 7) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);
    matches = matches.replace(json.maps.jifar.location_3.cipher_text8, `(Stage 8) ${json.maps.jifar.location_3.plain_text_spaces}: ${json.maps.jifar.map_name} | ${embed1}${json.maps.jifar.map_url}${embed2}`);

    // Peronne
    // 8-1
    matches = matches.replace(json.maps.peronne.location_1.cipher_text1, `(Stage 1) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text2, `(Stage 2) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text3, `(Stage 3) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text4, `(Stage 4) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text5, `(Stage 5) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text6, `(Stage 6) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text7, `(Stage 7) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_1.cipher_text8, `(Stage 8) ${json.maps.peronne.location_1.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // 8-2
    matches = matches.replace(json.maps.peronne.location_2.cipher_text1, `(Stage 1) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text2, `(Stage 2) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text3, `(Stage 3) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text4, `(Stage 4) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text5, `(Stage 5) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text6, `(Stage 6) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text7, `(Stage 7) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_2.cipher_text8, `(Stage 8) ${json.maps.peronne.location_2.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // 8-3
    matches = matches.replace(json.maps.peronne.location_3.cipher_text1, `(Stage 1) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text2, `(Stage 2) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text3, `(Stage 3) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text4, `(Stage 4) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text5, `(Stage 5) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text6, `(Stage 6) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text7, `(Stage 7) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);
    matches = matches.replace(json.maps.peronne.location_3.cipher_text8, `(Stage 8) ${json.maps.peronne.location_3.plain_text_spaces}: ${json.maps.peronne.map_name} | ${embed1}${json.maps.peronne.map_url}${embed2}`);

    // Canal
    // 9-1
    matches = matches.replace(json.maps.canal.location_1.cipher_text1, `(Stage 1) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text2, `(Stage 2) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text3, `(Stage 3) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text4, `(Stage 4) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text5, `(Stage 5) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text6, `(Stage 6) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text7, `(Stage 7) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_1.cipher_text8, `(Stage 8) ${json.maps.canal.location_1.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 9-2
    matches = matches.replace(json.maps.canal.location_2.cipher_text1, `(Stage 1) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text2, `(Stage 2) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text3, `(Stage 3) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text4, `(Stage 4) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text5, `(Stage 5) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text6, `(Stage 6) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text7, `(Stage 7) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_2.cipher_text8, `(Stage 8) ${json.maps.canal.location_2.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 9-3
    matches = matches.replace(json.maps.canal.location_3.cipher_text1, `(Stage 1) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text2, `(Stage 2) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text3, `(Stage 3) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text4, `(Stage 4) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text5, `(Stage 5) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text6, `(Stage 6) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text7, `(Stage 7) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);
    matches = matches.replace(json.maps.canal.location_3.cipher_text8, `(Stage 8) ${json.maps.canal.location_3.plain_text_spaces}: ${json.maps.canal.map_name} | ${embed1}${json.maps.canal.map_url}${embed2}`);

    // 10-1
    matches = matches.replace(json.maps.giantsshadow.location_1.cipher_text9, `(Stage 9) ${json.maps.giantsshadow.location_1.plain_text_spaces}: ${json.maps.giantsshadow.map_name} | ${embed1}${json.maps.giantsshadow.map_url}${embed2}`);

    // matches = matches.replaceAll(/\n\n/g, '\n'); // Remove 1 newline from doubles
    matches = matches.replaceAll(/undefined\n/g, "");
    matches = matches.replaceAll("undefined", "");
    matches = matches.replaceAll(/\n.*$/g, ''); // Removes last newline
    textarea.value = matches;


    var numberOfResults = textarea.value.split("\n").length;
    document.getElementById("matchesText").innerText = `Matches: (${numberOfResults})`;

    if (numberOfResults == 1) {
        if (textarea.value.includes(json.maps.amiens.location_1.plain_text_spaces)) { // amiens 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.amiens.map_url}'>Found on ${json.maps.amiens.map_name} (${json.maps.amiens.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.amiens.location_2.plain_text_spaces)) { // amiens 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.amiens.map_url}'>Found on ${json.maps.amiens.map_name} (${json.maps.amiens.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.amiens.location_3.plain_text_spaces)) { // amiens 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.amiens.map_url}'>Found on ${json.maps.amiens.map_name} (${json.maps.amiens.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.apremont.location_1.plain_text_spaces)) { // apremont 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.apremont.map_url}'>Found on ${json.maps.apremont.map_name} (${json.maps.apremont.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.apremont.location_2.plain_text_spaces)) { // apremont 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.apremont.map_url}'>Found on ${json.maps.apremont.map_name} (${json.maps.apremont.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.apremont.location_3.plain_text_spaces)) { // apremont 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.apremont.map_url}'>Found on ${json.maps.apremont.map_name} (${json.maps.apremont.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.varennes.location_1.plain_text_spaces)) { // varennes 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.varennes.map_url}'>Found on ${json.maps.varennes.map_name} (${json.maps.varennes.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.varennes.location_2.plain_text_spaces)) { // varennes 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.varennes.map_url}'>Found on ${json.maps.varennes.map_name} (${json.maps.varennes.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.varennes.location_3.plain_text_spaces)) { // varennes 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.varennes.map_url}'>Found on ${json.maps.varennes.map_name} (${json.maps.varennes.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.adriatic.location_1.plain_text_spaces)) { // adriatic 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.adriatic.map_url}'>Found on ${json.maps.adriatic.map_name} (${json.maps.adriatic.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.adriatic.location_2.plain_text_spaces)) { // adriatic 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.adriatic.map_url}'>Found on ${json.maps.adriatic.map_name} (${json.maps.adriatic.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.adriatic.location_3.plain_text_spaces)) { // adriatic 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.adriatic.map_url}'>Found on ${json.maps.adriatic.map_name} (${json.maps.adriatic.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.faw.location_1.plain_text_spaces)) { // faw 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.faw.map_url}'>Found on ${json.maps.faw.map_name} (${json.maps.faw.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.faw.location_2.plain_text_spaces)) { // faw 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.faw.map_url}'>Found on ${json.maps.faw.map_name} (${json.maps.faw.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.faw.location_3.plain_text_spaces)) { // faw 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.faw.map_url}'>Found on ${json.maps.faw.map_name} (${json.maps.faw.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.venetian.location_1.plain_text_spaces)) { // venetian 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.venetian.map_url}'>Found on ${json.maps.venetian.map_name} (${json.maps.venetian.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.venetian.location_2.plain_text_spaces)) { // venetian 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.venetian.map_url}'>Found on ${json.maps.venetian.map_name} (${json.maps.venetian.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.venetian.location_3.plain_text_spaces)) { // venetian 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.venetian.map_url}'>Found on ${json.maps.venetian.map_name} (${json.maps.venetian.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.jifar.location_1.plain_text_spaces)) { // jifar 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.jifar.map_url}'>Found on ${json.maps.jifar.map_name} (${json.maps.jifar.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.jifar.location_2.plain_text_spaces)) { // jifar 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.jifar.map_url}'>Found on ${json.maps.jifar.map_name} (${json.maps.jifar.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.jifar.location_3.plain_text_spaces)) { // jifar 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.jifar.map_url}'>Found on ${json.maps.jifar.map_name} (${json.maps.jifar.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.peronne.location_1.plain_text_spaces)) { // peronne 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.peronne.map_url}'>Found on ${json.maps.peronne.map_name} (${json.maps.peronne.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.peronne.location_2.plain_text_spaces)) { // peronne 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.peronne.map_url}'>Found on ${json.maps.peronne.map_name} (${json.maps.peronne.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.peronne.location_3.plain_text_spaces)) { // peronne 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.peronne.map_url}'>Found on ${json.maps.peronne.map_name} (${json.maps.peronne.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.canal.location_1.plain_text_spaces)) { // canal 1
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.canal.map_url}'>Found on ${json.maps.canal.map_name} (${json.maps.canal.location_1.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.canal.location_2.plain_text_spaces)) { // canal 2
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.canal.map_url}'>Found on ${json.maps.canal.map_name} (${json.maps.canal.location_2.plain_text_spaces})</a>`;
        }
        if (textarea.value.includes(json.maps.canal.location_3.plain_text_spaces)) { // canal 3
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.canal.map_url}'>Found on ${json.maps.canal.map_name} (${json.maps.canal.location_3.plain_text_spaces})</a>`;
        }

        if (textarea.value.includes(json.maps.giantsshadow.location_1.plain_text_spaces)) { // final
            location.innerHTML = `<a id='locationLink' target='_blank' href='${json.maps.giantsshadow.map_url}'>Found on ${json.maps.giantsshadow.map_name} (${json.maps.giantsshadow.location_1.plain_text_spaces})</a>`;
        }

    } else if (numberOfResults > 1) {
        if (!check9.checked) {
            location.innerHTML = `Please input more to find exact location.`;
        }
    }
}
