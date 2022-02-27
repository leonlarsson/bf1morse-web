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
const outputTextBox = document.getElementById("outputTextBox");

/**
 * Determine the stage and fill the outout text box.
 * @param {String} inputRaw The input.
 * @param {Boolean} isMorse If the input type is morse.
 * @returns {String} The stage.
 */
export default (inputRaw, isMorse) => {

    let stage;
    let input;
    const stageSelectedPlaceholderText = "Please start typing to see decoded text.";

    // 1 - Plain
    if (check1.checked) {
        stage = "1";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;
        outputTextBox.value = input;
    }

    // 2 - Reverse
    if (check2.checked) {
        stage = "2";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;
        outputTextBox.value = input.split("").reverse().join("");
    }

    // 3 - Atbash
    if (check3.checked) {
        stage = "3";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;

        function getOutput_3(input) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
            let output = "";

            for (let i = 0; i < input.length; i++) {
                const coded_letter = input.charAt(i);
                const letter_index = alphabet.indexOf(coded_letter);
                const decoded_letter = tebahpla.charAt(letter_index);
                output = output + decoded_letter;
            }
            return output;
        }

        outputTextBox.value = getOutput_3(input);
    }

    // 4 - Caesarian Shift
    if (check4.checked) {
        stage = "4";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;
        outputTextBox.value = String.fromCharCode(...input.split('').map(char => ((char.charCodeAt() - 65 + 19) % 26) + 65));
    }

    // 5 - Reverse -> Railfence
    if (check5.checked) {
        stage = "5";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;

        function getOutput_5(input) {
            const ciphertext = input.split("").reverse().join("").toUpperCase().replace(/[^A-Z]/g, "");
            const key = 5;
            const pt = new Array(ciphertext.length);
            let k = 0;
            let line;

            for (line = 0; line < key - 1; line++) {
                const skip = 2 * (key - line - 1);
                let j = 0;

                for (let i = line; i < ciphertext.length;) {
                    pt[i] = ciphertext.charAt(k++);
                    if ((line == 0) || (j % 2 == 0)) i += skip;
                    else i += 2 * (key - 1) - skip;
                    j++;
                }
            }
            for (let i = line; i < ciphertext.length; i += 2 * (key - 1)) pt[i] = ciphertext.charAt(k++);
            return pt.join("");
        }

        outputTextBox.value = getOutput_5(input);
    }

    // 6 - "E">"A", "T">"B" -> Baconian -> Atbash
    if (check6.checked) {
        stage = "6";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;

        function getOutput_6(input) {
            let text = input;
            text = text.replace(/E/g, "A").replace(/T/g, "B");
            text = bacon.decode(text, {
                "alphabet": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            })

            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
            let output = "";

            for (let i = 0; i < text.length; i++) {
                const coded_letter = text.charAt(i);
                const letter_index = alphabet.indexOf(coded_letter);
                const decoded_letter = tebahpla.charAt(letter_index);
                output = output + decoded_letter;
            }
            return output;
        }

        outputTextBox.value = getOutput_6(input);
    }

    // 7 - Vigenere (pass)
    if (check7.checked) {
        stage = "7";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;
        outputTextBox.value = VigenereCipher.decrypt(input, "Edward");
    }

    // 8 - Vigenere (autokey)
    if (check8.checked) {
        stage = "8";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;
        outputTextBox.value = Vigenere(-1, input, "George", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");
    }

    // 9 - Reverse -> Vigenere (autokey) -> Reverse
    if (check9.checked) {
        stage = "9";
        outputTextBox.placeholder = stageSelectedPlaceholderText;
        input = isMorse ? MorseCode.decode(inputRaw) : inputRaw;

        function getOutput_9(input) {
            let string;
            string = input.split("").reverse().join("").toUpperCase();
            string = Vigenere(-1, string, "London", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");
            string = string.split("").reverse().join("").toUpperCase();
            return string;
        }

        outputTextBox.value = getOutput_9(input);
    }

    // 10 - All
    if (check10.checked) {
        stage = null;
        outputTextBox.value = "";
        outputTextBox.placeholder = "Please select a stage if you want to filter results and see the output. This is not required.";
    }

    return stage;
}