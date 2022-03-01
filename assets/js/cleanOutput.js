import locationData from "../locations.json" assert { type: "json" };

// Define embed checkbox
const embedCheck = document.getElementById("noEmbedCheck");

/**
 * Fill the resultsBox with the cleaned matches.
 * @param {String} matches The match array, joined with newlines.
 * @param {String} inputType "morse" or "text".
 * @returns {String} The cleaned matches.
 */
export default (matches, inputType) => {

    // If checked, prevent embed on links
    const embedSymbols = embedCheck.checked ? ["<", ">"] : ["", ""];

    const maps = Object.keys(locationData.maps);
    const locations = ["location_1", "location_2", "location_3"];
    const stages = ["1", "2", "3", "4", "5", "6", "7", "8"];

    // For each map, stage (1-8), and location, clean the output
    maps.forEach(map => {
        if (map === "giantsshadow") return;
        locations.forEach(location => {
            stages.forEach(stage => {
                matches = matches.replace(locationData.maps[map][location][`cipher_${inputType}${stage}`], `(Stage ${stage}) ${locationData.maps[map][location].plain_text_spaces}: ${locationData.maps[map].map_name} | ${embedSymbols[0]}${locationData.maps[map][location].map_url}${embedSymbols[1]}`);
            })
        });
    });

    // For stage 9, which only has location_1
    matches = matches.replace(locationData.maps.giantsshadow.location_1[`cipher_${inputType}9`], `(Stage 9) ${locationData.maps.giantsshadow.location_1.plain_text_spaces}: ${locationData.maps.giantsshadow.map_name} | ${embedSymbols[0]}${locationData.maps.giantsshadow.map_url}${embedSymbols[1]}`);

    return matches;
}