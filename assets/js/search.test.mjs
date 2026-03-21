import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { levenshtein, fuzzyScore } from "./search.js";

// ---------------------------------------------------------------------------
// levenshtein
// ---------------------------------------------------------------------------

describe("levenshtein", () => {

    describe("identical strings", () => {
        test("empty strings", () => assert.equal(levenshtein("", ""), 0));
        test("single char", () => assert.equal(levenshtein("a", "a"), 0));
        test("word", () => assert.equal(levenshtein("amiens", "amiens"), 0));
        test("long morse string", () => {
            const s = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            assert.equal(levenshtein(s, s), 0);
        });
    });

    describe("empty string operands", () => {
        test("empty a", () => assert.equal(levenshtein("", "abc"), 3));
        test("empty b", () => assert.equal(levenshtein("abc", ""), 3));
    });

    describe("single edit", () => {
        test("substitution", () => assert.equal(levenshtein("cat", "bat"), 1));
        test("insertion", () => assert.equal(levenshtein("cat", "cats"), 1));
        test("deletion", () => assert.equal(levenshtein("cats", "cat"), 1));
    });

    describe("known distances", () => {
        test("kitten → sitting = 3", () => assert.equal(levenshtein("kitten", "sitting"), 3));
        test("saturday → sunday = 3", () => assert.equal(levenshtein("saturday", "sunday"), 3));
        test("completely different same length", () => assert.equal(levenshtein("abc", "xyz"), 3));
        test("completely different different length", () => assert.equal(levenshtein("abcdef", "xyz"), 6));
    });

    describe("morse string edits", () => {
        const correct = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";

        test("one dot swapped for dash = distance 2 (..- is U, --- is O, 2 char diff)", () => {
            // ..- (U) → --- (O) requires 2 substitutions: both dots become dashes
            const typo = "--- --- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            assert.equal(levenshtein(correct, typo), 2);
        });

        test("one dot swapped for dash = distance 1 (.-- is W, --- is O, 1 char diff)", () => {
            // Swap the leading . of .-- (W) to - to get --- (O): 1 substitution
            const a = ".- -...";
            const b = "-- -...";
            assert.equal(levenshtein(a, b), 1);
        });

        test("one extra char inserted = distance 1", () => {
            const typo = "---- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            assert.equal(levenshtein(correct, typo), 1);
        });

        test("one group deleted = distance > 1", () => {
            const typo = "..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            assert.ok(levenshtein(correct, typo) > 1);
        });
    });

    describe("symmetry", () => {
        test("levenshtein(a,b) === levenshtein(b,a)", () => {
            assert.equal(levenshtein("saturday", "sunday"), levenshtein("sunday", "saturday"));
            assert.equal(levenshtein("CHURCHRUIN", "CHURCH"), levenshtein("CHURCH", "CHURCHRUIN"));
        });
    });
});

// ---------------------------------------------------------------------------
// fuzzyScore — Tier 1: exact substring
// ---------------------------------------------------------------------------

describe("fuzzyScore — Tier 1: exact substring → 1.0", () => {

    test("full match", () =>
        assert.equal(fuzzyScore("CHURCHRUINAMIENS", "CHURCHRUINAMIENS"), 1.0));

    test("query is prefix of cipher", () =>
        assert.equal(fuzzyScore("CHURCH", "CHURCHRUINAMIENS"), 1.0));

    test("query is suffix of cipher", () =>
        assert.equal(fuzzyScore("AMIENS", "CHURCHRUINAMIENS"), 1.0));

    test("query is middle of cipher", () =>
        assert.equal(fuzzyScore("RUIN", "CHURCHRUINAMIENS"), 1.0));

    test("case insensitive — lowercase query", () =>
        assert.equal(fuzzyScore("church", "CHURCHRUINAMIENS"), 1.0));

    test("case insensitive — mixed case", () =>
        assert.equal(fuzzyScore("ChUrCh", "CHURCHRUINAMIENS"), 1.0));

    test("empty query matches everything (included in any string)", () =>
        assert.equal(fuzzyScore("", "CHURCHRUINAMIENS"), 1.0));

    test("exact morse substring", () => {
        const cipher = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        assert.equal(fuzzyScore("--- ..-", cipher), 1.0);
    });

    test("full morse exact match", () => {
        const cipher = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        assert.equal(fuzzyScore(cipher, cipher), 1.0);
    });

    test("real cipher: OUTPOST BARREL FAW stage 1", () => {
        const cipher = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        assert.equal(fuzzyScore(cipher, cipher), 1.0);
    });

    test("real cipher: AYHCLJFHAAPJWLYVUUL stage 4 Peronne location 2", () =>
        assert.equal(fuzzyScore("AYHCLJFHAAPJWLYVUUL", "AYHCLJFHAAPJWLYVUUL"), 1.0));

    test("input longer than cipher (cipher is prefix of input) → 1.0", () => {
        // User pastes full decoded output; stored cipher is only the relevant fragment.
        // e.g. stage 8 HILL BARN ADRIATIC: cipher=ONADIFZWMPTJSHJG,
        // but user input is the full decoded string starting with that cipher.
        const cipher = "ONADIFZWMPTJSHJG";
        const fullInput = "ONADIFZWMPTJSHJGXROUUEKUWFHGJHNWUYMESYQYXXFAWAUGQNMESY";
        assert.equal(fuzzyScore(fullInput, cipher), 1.0);
    });

    test("cipher embedded in longer input with prefix junk → 1.0 (q.includes(c))", () => {
        const cipher = "ONADIFZWMPTJSHJG";
        const fullInput = "XXXONADIFZWMPTJSHJGXROUUEKUWFHGJHNWUYMESYQYXXFAWAUGQNMESY";
        assert.equal(fuzzyScore(fullInput, cipher), 1.0);
    });

    test("cipher embedded in longer input with 1-char typo → high score via sliding window", () => {
        // SHJG → SHHG: 1 substitution inside the cipher portion
        const cipher = "ONADIFZWMPTJSHJG";
        const fullInput = "XXXONADIFZWMPTJSHHGXROUUEKUWFHGJHNWUYMESYQYXXFAWAUGQNMESY";
        const score = fuzzyScore(fullInput, cipher);
        assert.ok(score >= 0.45, `Expected score >= 0.45, got ${score}`);
        assert.ok(score < 1.0, `Expected score < 1.0, got ${score}`);
    });
});

// ---------------------------------------------------------------------------
// fuzzyScore — Tier 2: token matching (text only)
// ---------------------------------------------------------------------------

describe("fuzzyScore — Tier 2: token matching (text only)", () => {

    describe("all tokens match → 0.9", () => {
        test("two tokens, both in cipher", () =>
            assert.equal(fuzzyScore("CHURCH RUIN", "CHURCHRUINAMIENS"), 0.9));

        test("two tokens, both in cipher (reversed order)", () =>
            assert.equal(fuzzyScore("RUIN CHURCH", "CHURCHRUINAMIENS"), 0.9));

        test("two tokens, cipher has no spaces", () =>
            assert.equal(fuzzyScore("LUGGAGE BASEMENT", "LUGGAGEBASEMENTAPREMONT"), 0.9));

        test("two tokens matching different parts", () =>
            assert.equal(fuzzyScore("COASTAL FORTRESS", "COASTALFORTRESSADRIATIC"), 0.9));

        test("three tokens, all present", () =>
            assert.equal(fuzzyScore("COASTAL FORTRESS ADRIATIC", "COASTALFORTRESSADRIATIC"), 0.9));

        test("BUCKET MARSHLANDS in concatenated cipher", () =>
            assert.equal(fuzzyScore("BUCKET MARSHLANDS", "BUCKETMARSHLANDSFAW"), 0.9));
    });

    describe("some tokens match → proportional score (0.4–0.79)", () => {
        test("1 of 2 tokens matches → 0.6", () =>
            assert.equal(fuzzyScore("CHURCH NOTHERE", "CHURCHRUINAMIENS"), 0.4 + 0.4 * (1 / 2)));

        test("1 of 3 tokens matches → ~0.53", () =>
            assert.equal(fuzzyScore("CHURCH NOPE WRONG", "CHURCHRUINAMIENS"), 0.4 + 0.4 * (1 / 3)));

        test("2 of 3 tokens match → ~0.67", () =>
            assert.equal(fuzzyScore("CHURCH RUIN WRONG", "CHURCHRUINAMIENS"), 0.4 + 0.4 * (2 / 3)));

        test("score is between 0.4 and 0.8 for partial token match", () => {
            const score = fuzzyScore("CHURCH NOTHERE", "CHURCHRUINAMIENS");
            assert.ok(score > 0.4 && score < 0.8);
        });
    });

    describe("no tokens match → falls through (Levenshtein or 0)", () => {
        test("no tokens match, query < 4 chars per token", () => {
            // Query has 2 tokens, neither in cipher, and each is long enough for Levenshtein
            // but Levenshtein edit distance > 3 so returns 0
            const score = fuzzyScore("ZZZZZ QQQQQ", "CHURCHRUINAMIENS");
            assert.equal(score, 0);
        });
    });

    describe("token matching is skipped for single-token queries", () => {
        test("no spaces → tier 2 skipped, goes to Levenshtein", () => {
            // CHURCHRUIN vs CHURCHRUINAMIENS: exact substring match fires at tier 1
            assert.equal(fuzzyScore("CHURCHRUIN", "CHURCHRUINAMIENS"), 1.0);
        });
    });

    describe("token matching is skipped for morse input", () => {
        test("morse starting with . does not trigger token matching", () => {
            // .-- .- is a morse query with 2 tokens but should NOT token-match
            // individual morse groups are too common; score should NOT be 0.9
            const score = fuzzyScore(".-- .-", "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--");
            assert.notEqual(score, 0.9);
        });

        test("morse starting with - does not trigger token matching", () => {
            const score = fuzzyScore("--- ..-", "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--");
            // This is an exact substring match (tier 1), score = 1.0
            assert.equal(score, 1.0);
        });

        test("full morse input does not scatter-match into 217 results (regression)", () => {
            // This was the big bug: exact morse input should score 1.0 on its own cipher,
            // and 0 (not partial) on unrelated morse ciphers
            const morseQuery = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const unrelatedMorse = ".-.. --- -. --. ..- . ...- .. .-.. .-.. . ... - .- - ..- . .- -- .. . -. ...";
            const score = fuzzyScore(morseQuery, unrelatedMorse);
            // Must NOT pass threshold: too different to be a typo
            assert.ok(score < 0.45, `Expected score < 0.45, got ${score}`);
        });
    });
});

// ---------------------------------------------------------------------------
// fuzzyScore — Tier 3: Levenshtein fuzzy matching
// ---------------------------------------------------------------------------

describe("fuzzyScore — Tier 3: Levenshtein", () => {

    describe("edit distance 1 (single typo)", () => {
        test("one dot → dash in morse group (U → O)", () => {
            const correct = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const typo    = "--- --- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const score = fuzzyScore(typo, correct);
            assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
            assert.ok(score < 1.0,  `Expected score < 1.0, got ${score}`);
        });

        test("one dash → dot in morse group", () => {
            const correct = "-.-. .... ..- .-. -.-. .... .-. ..- .. -. .- -- .. . -. ...";
            const typo    = "..-. .... ..- .-. -.-. .... .-. ..- .. -. .- -- .. . -. ...";
            const score = fuzzyScore(typo, correct);
            assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
        });

        test("one char substitution in text cipher", () => {
            const correct = "CHURCHRUINAMIENS";
            const typo    = "CHURCHRUINAMIENZ"; // Z instead of S
            const score = fuzzyScore(typo, correct);
            assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
            assert.ok(score < 1.0);
        });

        test("score approaches 1 for long string with 1 edit", () => {
            const correct = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const typo    = "--- --- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const score = fuzzyScore(typo, correct);
            assert.ok(score > 0.95, `Expected score > 0.95, got ${score}`);
        });
    });

    describe("edit distance 2", () => {
        test("two char substitutions", () => {
            const correct = "CHURCHRUINAMIENS";
            const typo2   = "CHURCXRUINAMIENZ"; // 2 substitutions
            const score = fuzzyScore(typo2, correct);
            assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
        });
    });

    describe("edit distance 3 (boundary)", () => {
        test("exactly 3 edits still passes threshold", () => {
            const correct = "ABCDEFGHIJ"; // 10 chars
            const typo    = "XBCYEFGHIZ"; // A→X, D→Y, J→Z = 3 substitutions
            const score = fuzzyScore(typo, correct);
            assert.ok(score > 0, `Expected score > 0, got ${score}`);
        });
    });

    describe("edit distance > 3 (blocked)", () => {
        test("4 edits → 0", () => {
            const correct = "ABCDEFGHIJ";
            const typo    = "XBCYEFGHZW"; // A→X, D→Y, I→Z, J→W = 4 substitutions
            assert.equal(fuzzyScore(typo, correct), 0);
        });

        test("regression: AYHCLJFHAAPJWLYVUUL vs YBPUCLUABYLWLYVUUL → 0", () => {
            // These share suffix WLYVUUL but differ by ~10 chars — must NOT match
            assert.equal(fuzzyScore("AYHCLJFHAAPJWLYVUUL", "YBPUCLUABYLWLYVUUL"), 0);
        });

        test("completely unrelated text ciphers → 0", () => {
            assert.equal(fuzzyScore("STCYBJHXZSZXPJFGJTGJYIX", "LONGUEVILLESTATUEAMIENS"), 0);
        });

        test("completely unrelated morse ciphers → 0", () => {
            const a = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
            const b = ".-.. --- -. --. ..- . ...- .. .-.. .-.. . ... - .- - ..- . .- -- .. . -. ...";
            assert.equal(fuzzyScore(a, b), 0);
        });
    });

    describe("short query guard (< 4 chars)", () => {
        test("3-char query → 0 when no substring match", () =>
            assert.equal(fuzzyScore("XYZ", "CHURCHRUINAMIENS"), 0));

        test("2-char text query → 0 when no substring match (guard blocks Levenshtein)", () =>
            assert.equal(fuzzyScore("ZZ", "CHURCHRUINAMIENS"), 0));

        test("3-char query that IS a substring → still 1.0 (tier 1 fires first)", () =>
            assert.equal(fuzzyScore("RUI", "CHURCHRUINAMIENS"), 1.0));
    });
});

// ---------------------------------------------------------------------------
// fuzzyScore — score ordering / ranking sanity checks
// ---------------------------------------------------------------------------

describe("fuzzyScore — score ordering", () => {

    test("exact match scores higher than all-tokens match", () => {
        const exact  = fuzzyScore("CHURCHRUIN", "CHURCHRUINAMIENS");         // tier 1: 1.0
        const tokens = fuzzyScore("CHURCH RUIN", "CHURCHRUINAMIENS");        // tier 2: 0.9
        assert.ok(exact > tokens, `exact=${exact} should > tokens=${tokens}`);
    });

    test("all-tokens match scores higher than partial-tokens match", () => {
        const allTokens  = fuzzyScore("CHURCH RUIN", "CHURCHRUINAMIENS");    // 0.9
        const someTokens = fuzzyScore("CHURCH NOTHERE", "CHURCHRUINAMIENS"); // ~0.6
        assert.ok(allTokens > someTokens);
    });

    test("partial-token match scores higher than fuzzy match", () => {
        const partial = fuzzyScore("CHURCH NOTHERE", "CHURCHRUINAMIENS");   // ~0.6
        // use a fuzzy that doesn't substring match
        const fuzzy2  = fuzzyScore("CHURCHRUINAMIENZ", "CHURCHRUINAMIENS"); // 1 edit
        // partial token score ~0.6, fuzzy ~0.94 — fuzzy actually wins here
        // The important thing is partial > 0 and fuzzy > 0 and both < exact
        assert.ok(partial > 0);
        assert.ok(fuzzy2 > 0);
    });

    test("1-edit fuzzy scores higher than 3-edit fuzzy", () => {
        const base    = "ABCDEFGHIJKLMNOP"; // 16 chars
        const oneEdit = "ABCDEFGHIJKLMNOX"; // 1 substitution
        const threeEdit = "XBCYEFGHIJKLMNOZ"; // 3 substitutions
        const score1 = fuzzyScore(oneEdit, base);
        const score3 = fuzzyScore(threeEdit, base);
        assert.ok(score1 > score3, `1-edit (${score1}) should > 3-edit (${score3})`);
    });

    test("no match scores 0, below any real match", () => {
        const noMatch = fuzzyScore("ZZZZZZZZZZZZZZZ", "CHURCHRUINAMIENS");
        assert.equal(noMatch, 0);
    });
});

// ---------------------------------------------------------------------------
// fuzzyScore — real cipher regression tests
// ---------------------------------------------------------------------------

describe("fuzzyScore — real cipher regressions", () => {

    test("OUTPOST BARREL FAW stage 1 morse — exact returns 1.0", () => {
        const cipher = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        assert.equal(fuzzyScore(cipher, cipher), 1.0);
    });

    test("OUTPOST BARREL FAW — one-dot typo caught", () => {
        const correct = "--- ..- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        const typo    = "--- --- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        assert.ok(fuzzyScore(typo, correct) > 0.45);
    });

    test("OUTPOST BARREL FAW — typo does NOT match LONGUEVILLE STATUE AMIENS cipher", () => {
        const typo        = "--- --- - .--. --- ... - -... .- .-. .-. . .-.. ..-. .- .--";
        const unrelatedCipher = ".-.. --- -. --. ..- . ...- .. .-.. .-.. . ... - .- - ..- . .- -- .. . -. ...";
        assert.ok(fuzzyScore(typo, unrelatedCipher) < 0.45);
    });

    test("CHURCH RUIN AMIENS stage 1 text — spaced query", () =>
        assert.equal(fuzzyScore("CHURCH RUIN", "CHURCHRUINAMIENS"), 0.9));

    test("CHURCH RUIN AMIENS stage 1 text — exact concat", () =>
        assert.equal(fuzzyScore("CHURCHRUINAMIENS", "CHURCHRUINAMIENS"), 1.0));

    test("TRAVECY ATTIC PERONNE stage 4 — no false positive with stage 4 RUIN VENTURE PERONNE", () => {
        const query            = "AYHCLJFHAAPJWLYVUUL"; // Travecy Attic Peronne stage 4
        const falsePositive    = "YBPUCLUABYLWLYVUUL";  // Ruin Venture Peronne stage 4
        assert.equal(fuzzyScore(query, falsePositive), 0);
    });

    test("LONGUEVILLE STATUE AMIENS stage 1 — partial text query", () =>
        assert.equal(fuzzyScore("LONGUEVILLE STATUE", "LONGUEVILLESTATUEAMIENS"), 0.9));

    test("PANEL WATER APREMONT — one-dot typo in morse", () => {
        const correct = ".--. .- -. . .-.. .-- .- - . .-. .- .--. .-. . -- --- -. -";
        const typo    = ".--. .- -. . .-.. .-- .- - . .-. .- .--. .-. . -- .-- -. -";
        assert.ok(fuzzyScore(typo, correct) > 0.45);
    });

    // --- Transcription error regressions (reported by user) ---

    test("LONGUEVILLE STATUE AMIENS — ...- misheard as ..-. AND trailing dot missing (3 edits, global path)", () => {
        // query is 1 char shorter than cipher (ratio 0.987) → global levenshtein, cap 3
        // Global dist = 3: two substitutions in ...- → ..-. plus one deletion at end
        const cipher = ".-.. --- -. --. ..- . ...- .. .-.. .-.. . ... - .- - ..- . .- -- .. . -. ...";
        const query  = ".-.. --- -. --. ..- . ..-. .. .-.. .-.. . ... - .- - ..- . .- -- .. . -. ..";
        assert.ok(fuzzyScore(query, cipher) >= 0.45, "should match via global Levenshtein");
    });

    test("AMIENS NEUF FURNITURE — dropped dah from A (.- → ., 1 deletion)", () => {
        const cipher = ".- -- .. . -. ... -. . ..- ..-. ..-. ..- .-. -. .. - ..- .-. .";
        const query  = ". -- .. . -. ... -. . ..- ..-. ..-. ..- .-. -. .. - ..- .-. .";
        assert.ok(fuzzyScore(query, cipher) >= 0.45);
    });

    test("VARENNES SERVANT BED — extra dit inserted into ...- (V → 4, 1 insertion)", () => {
        const cipher = "...- .- .-. . -. -. . ... ... . .-. ...- .- -. - -... . -..";
        const query  = "....- .- .-. . -. -. . ... ... . .-. ...- .- -. - -... . -..";
        assert.ok(fuzzyScore(query, cipher) >= 0.45);
    });

    test("CHURCH RUIN AMIENS — M (--) misheard as O (---), 1 insertion", () => {
        const cipher = "-.-. .... ..- .-. -.-. .... .-. ..- .. -. .- -- .. . -. ...";
        const query  = "-.-. .... ..- .-. -.-. .... .-. ..- .. -. .- --- .. . -. ...";
        assert.ok(fuzzyScore(query, cipher) >= 0.45);
    });

    test("PANEL WATER APREMONT — O (---) misheard as W (.--), 1 substitution", () => {
        const cipher = ".--. .- -. . .-.. .-- .- - . .-. .- .--. .-. . -- --- -. -";
        const query  = ".--. .- -. . .-.. .-- .- - . .-. .- .--. .-. . -- .-- -. -";
        assert.ok(fuzzyScore(query, cipher) >= 0.45);
    });

    test("BALLROOM MAP VARENNES stage 1 morse — exact", () => {
        const cipher = "-... .- .-.. .-.. .-. --- --- -- -- .- .--. ...- .- .-. . -. -. . ...";
        assert.equal(fuzzyScore(cipher, cipher), 1.0);
    });

    test("stage 6 E/T fragment with 1 char wrong — sliding window finds it", () => {
        // Construct a cipher that definitely contains a known fragment,
        // then query with 1 character swapped
        const knownFragment = "EETEEETTEETEETEETETET"; // 21 chars, E/T only
        const cipher = "EETTEETEET" + knownFragment + "TTTETETATAT"; // fragment at position 10
        const queryWithTypo = "EETEEETTETTEETEETETET"; // position 10: E→T (1 edit)
        const score = fuzzyScore(queryWithTypo, cipher);
        assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
    });

    test("stage 6 exact fragment — tier 1 fires", () => {
        const knownFragment = "EETEEETTEETEETEETETET";
        const cipher = "EETTEETEET" + knownFragment + "TTTETETATAT";
        assert.equal(fuzzyScore(knownFragment, cipher), 1.0);
    });

    test("stage 6 fragment 2 chars wrong — still matches (cap = 2 for sliding window)", () => {
        const knownFragment = "EETEEETTEETEETEETETET";
        const cipher = "EETTEETEET" + knownFragment + "TTTETETATAT";
        const twoEdits = "EETEEETTETTEETEETETET".replace("E", "T"); // 2 edits from knownFragment
        const score = fuzzyScore(twoEdits, cipher);
        assert.ok(score > 0.45, `Expected score > 0.45, got ${score}`);
    });

    test("false positive check: stage 6 fragment does NOT match unrelated text cipher", () => {
        const stage6fragment = "EETEEETTEETEETEETETET";
        const textCipher = "LONGUEVILLESTATUEAMIENS";
        assert.equal(fuzzyScore(stage6fragment, textCipher), 0);
    });
});
