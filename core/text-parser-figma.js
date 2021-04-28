replaceNewLineChars = ((someString, replacementString = ``) => { // defaults to just removing
  const LF = `\u{000a}`; // Line Feed (\n)
  const VT = `\u{000b}`; // Vertical Tab
  const FF = `\u{000c}`; // Form Feed
  const CR = `\u{000d}`; // Carriage Return (\r)
  const CRLF = `${CR}${LF}`; // (\r\n)
  const NEL = `\u{0085}`; // Next Line
  const LS = `\u{2028}`; // Line Separator
  const PS = `\u{2029}`; // Paragraph Separator
  const lineTerminators = [LF, VT, FF, CR, CRLF, NEL, LS, PS]; // all Unicode `lineTerminators`
  let finalString = someString.normalize(`NFD`); // better safe than sorry? Or is it?
  for (let lineTerminator of lineTerminators) {
    if (finalString.includes(lineTerminator)) { // check if the string contains the current `lineTerminator`
      let regex = new RegExp(lineTerminator.normalize(`NFD`), `gu`); // create the `regex` for the current `lineTerminator`
      finalString = finalString.replace(regex, replacementString); // perform the replacement
    };
  };
  return finalString.normalize(`NFC`); // return the `finalString` (without any Unicode `lineTerminators`)
});


arr = arr.reduce((previousValue, currentValue, index, array) => {
  previousValue.push({text: replaceNewLineChars(currentValue.text).toLowerCase()})
  return previousValue
}, new Array());
