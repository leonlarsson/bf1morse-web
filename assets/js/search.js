export function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => {
        const row = Array(n + 1).fill(0);
        row[0] = i;
        return row;
    });
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[m][n];
}

export function fuzzyScore(query, cipher) {
    const q = query.toLowerCase();
    const c = cipher.toLowerCase();

    // Tier 1: exact substring — either direction.
    // c.includes(q): user typed a fragment of the cipher (common case).
    // q.includes(c): user pasted more than just the cipher (e.g. full decoded output
    //               that starts with the cipher then continues with padding text).
    if (c.includes(q) || q.includes(c)) return 1.0;

    // Tier 2+: token matching (split on whitespace) — text only
    // Morse groups are too short and common to be useful search tokens
    const isMorse = q.startsWith(".") || q.startsWith("-");
    const tokens = q.split(/\s+/).filter(Boolean);
    if (!isMorse && tokens.length > 1) {
        const matched = tokens.filter(t => c.includes(t)).length;
        if (matched === tokens.length) return 0.9;
        if (matched > 0) return 0.4 + 0.4 * (matched / tokens.length);
        // No tokens matched — fall through to fuzzy
    }

    // Tier 3: fuzzy match — only for inputs long enough to be meaningful
    // Cap at 3 absolute edits — anything more is a different cipher, not a typo
    if (q.length < 4) return 0;

    // When the query is shorter than the cipher, use a sliding window so that
    // partial fragments (e.g. a 21-char chunk of a 90-char stage-6 cipher)
    // can still fuzzy-match even if one character is wrong.
    // When query >= cipher length, fall back to global edit distance.
    let dist;
    let maxDist;
    if (c.length < q.length * 0.75) {
        // Cipher is embedded in a longer input (user pasted full decoded output with a typo).
        // Tier 1 already handles the exact case; if that missed and the query is very long,
        // the sliding window becomes too expensive and unlikely to yield useful results.
        if (q.length > 120) return 0;
        // Slide a cipher-length window over the query; cap at 2 edits.
        maxDist = 2;
        dist = Infinity;
        for (let i = 0; i <= q.length - c.length; i++) {
            const d = levenshtein(c, q.slice(i, i + c.length));
            if (d < dist) dist = d;
            if (dist === 0) break;
        }
    } else if (q.length < c.length * 0.75) {
        // Fragment search: allow up to 2 edits. Even for binary-alphabet (E/T) ciphers,
        // two random N-char E/T strings are ~N/2 edits apart on average, so cap=2 is
        // statistically near-impossible to false-positive while catching 2-char misreads.
        maxDist = 2;
        dist = Infinity;
        for (let i = 0; i <= c.length - q.length; i++) {
            const d = levenshtein(q, c.slice(i, i + q.length));
            if (d < dist) dist = d;
            if (dist === 0) break;
        }
    } else {
        // Full-cipher typo search: allow up to 3 edits
        maxDist = 3;
        dist = levenshtein(q, c);
    }

    if (dist <= maxDist) return 1 - dist / Math.max(q.length, c.length);

    return 0;
}
