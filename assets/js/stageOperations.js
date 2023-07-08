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
const output = document.getElementById("output");
const outputTextBox = document.getElementById("outputTextBox");

/**
 * Determine the stage and fill the outout text box.
 * @param {String} inputRaw The input.
 * @param {"morse" | "text"} inputType The input type.
 * @returns {String} The stage.
 */
export const performStageOperations = (inputRaw, inputType) => {

    // Only show Output if All isn't selected
    output.hidden = check10.checked;

    const stage = getStage();
    const input = inputType === "morse" ? MorseCode.decode(inputRaw) : inputRaw;

    // 1 - Plain
    if (check1.checked) outputTextBox.value = input;

    // 2 - Reverse
    if (check2.checked) outputTextBox.value = input.split("").reverse().join("");

    // 3 - Atbash
    if (check3.checked) {
        const getOutput_3 = input => {
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
    if (check4.checked) outputTextBox.value = String.fromCharCode(...input.split('').map(char => ((char.charCodeAt() - 65 + 19) % 26) + 65));

    // 5 - Reverse -> Railfence
    if (check5.checked) {
        const getOutput_5 = input => {
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
        const getOutput_6 = input => {
            let text = input;
            text = text.replace(/E/g, "A").replace(/T/g, "B");
            text = bacon.decode(text, {
                "alphabet": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            });

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
    if (check7.checked) outputTextBox.value = VigenereCipher.decrypt(input, "Edward");

    // 8 - Vigenere (autokey)
    if (check8.checked) outputTextBox.value = Vigenere(-1, input, "George", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");

    // 9 - Reverse -> Vigenere (autokey) -> Reverse
    if (check9.checked) {
        const getOutput_9 = input => {
            let string;
            string = input.split("").reverse().join("").toUpperCase();
            string = Vigenere(-1, string, "London", "ZABCDEFGHIJKLMNOPQRSTUVWXY", "Z");
            string = string.split("").reverse().join("").toUpperCase();
            return string;
        }

        outputTextBox.value = getOutput_9(input);
    }

    return stage;
}

export const getStage = () => {
    if (check1.checked) return 1;
    if (check2.checked) return 2;
    if (check3.checked) return 3;
    if (check4.checked) return 4;
    if (check5.checked) return 5;
    if (check6.checked) return 6;
    if (check7.checked) return 7;
    if (check8.checked) return 8;
    if (check9.checked) return 9;
    if (check10.checked) return null;
};