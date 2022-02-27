import locationJSON from "../locations.json" assert { type: "json" };

// Define embed checkbox
const embedCheck = document.getElementById("noEmbedCheck");

/**
 * Fill the resultsBox with the cleaned matches.
 * @param {String} matches The match array, joined with newlines.
 * @param {String} inputType morse or text.
 * @returns {String} The cleaned matches.
 */
export default (matches, inputType) => {

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

    return matches;
}