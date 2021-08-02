// Vigenere text cipher

// Code written by Tyler Akins and placed in the public domain. <<<<
// It would be nice if you left this header intact.  http://rumkin.com

// Requires util.js

// Vigenere encrypt text
// encdec = 1 to encode, -1 to decode
// text = the text you want to encode
// pass = the password to use
// key = the key to make a keyed alphabet (or leave it blank)
function Vigenere(encdec, text, pass, key, autokey) {
   var s, b, i;

   // Change the pass into A-Z only
   pass = OnlyAlpha(pass.toUpperCase());

   // Change the key into a keyed alphabet
   // key = "ZABCDEFGHIJKLMNOPQRSTUVWXY";

   s = "";
   for (i = 0; i < text.length; i++) {
      b = text.charAt(i);
      limit = ' ';
      if (b >= 'A' && b <= 'Z')
         limit = 'A';
      if (b >= 'a' && b <= 'z')
         limit = 'a';
      if (limit != ' ' && pass.length) {
         b = b.toUpperCase();

         // Handle autokey
         //  if (autokey && encdec > 0)
         //     pass += b;

         // Just ignore the non-alpha characters from the cipher
         bval = key.indexOf(b) + encdec * key.indexOf(pass.charAt(0));
         bval = (bval + 26) % 26;
         b = key.charAt(bval);

         // Handle autokey
         if (autokey && encdec < 0)
            pass += b;

         if (limit == 'a')
            b = b.toLowerCase();

         // Rotate the password
         if (!autokey)
            pass += pass.charAt(0);

         pass = pass.slice(1, pass.length);
      }
      s += b;
   }
   return s;
}