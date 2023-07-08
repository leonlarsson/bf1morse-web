import { decode } from "./main.js";
import { getStage } from "./stageOperations.js";

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

export const populateSettings = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const input = searchParams.get("input");
    const stage = searchParams.get("stage");

    if (input) inputTextBox.value = input.trim();

    if (stage) {
        if (stage == 1) check1.checked = true;
        if (stage == 2) check2.checked = true;
        if (stage == 3) check3.checked = true;
        if (stage == 4) check4.checked = true;
        if (stage == 5) check5.checked = true;
        if (stage == 6) check6.checked = true;
        if (stage == 7) check7.checked = true;
        if (stage == 8) check8.checked = true;
        if (stage == 9) check9.checked = true;
        if (!stage) check10.checked = true;
    };

    decode();
};

export const copySettings = () => {
    const customURL = new URL(window.location.origin);

    const input = document.getElementById("inputTextBox").value;
    const stage = getStage();

    customURL.searchParams.set("input", input.trim());
    if (stage) customURL.searchParams.set("stage", stage);

    navigator.clipboard.writeText(customURL.href);
    alert(`Copied to clipboard!\nInput: ${input.trim() || "N/A"}\nStage: ${stage || "All"}`);
};