import originalLocations from "./locations.js";

const newLocations = jmespath.search(originalLocations, "[].{mapName: mapName, mapUrl: mapUrl, locations: [location1, location2, location3]}");

const transformedJson = [];

newLocations.forEach(map => {
    if (map.mapName === "Giant's Shadow") return;
    map.locations.forEach(location => {
        for (let stage = 1; stage <= 8; stage++) {
            ["Morse", "Text"].forEach(type => {
                transformedJson.push({
                    mapName: map.mapName,
                    mapUrl: map.mapUrl,
                    locationUrl: location.mapUrl,
                    plainText: location.plainText,
                    stage,
                    type: type.toLowerCase(),
                    cipher: location[`cipher${type}${stage}`]
                });
            });
        }
    });
});

// Manually add Giant's Shadow
transformedJson.push(
    {
        mapName: originalLocations[9].mapName,
        mapUrl: originalLocations[9].mapUrl,
        locationUrl: originalLocations[9].mapUrl,
        plainText: originalLocations[9].location1.plainText,
        stage: 9,
        type: "morse",
        cipher: originalLocations[9].location1.cipherMorse9
    },
    {
        mapName: originalLocations[9].mapName,
        mapUrl: originalLocations[9].mapUrl,
        locationUrl: originalLocations[9].mapUrl,
        plainText: originalLocations[9].location1.plainText,
        stage: 9,
        type: "text",
        cipher: originalLocations[9].location1.cipherText9
    }
);

export default transformedJson;