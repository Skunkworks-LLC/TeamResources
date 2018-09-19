// TEXT HELPERS ----------------------------------
const Helpers = {};

Helpers.CapitalizeEachLetter = (str) => {
    return str.split(' ')
              .map((word) => {
                  return word[0].toUpperCase() + word.substring(1, word.length);
              })
              .join(' ');
}

Helpers.getFirstWords = (paragraph, amount = 5) => {
    return paragraph.split(' ').slice(0, amount).join(' ');
}

Helpers.createCliffHanger = (paragraph) => {
    paragraph = Helpers.getFirstWords(paragraph, 15);
    let isPunctuation = /\W/;
    let lastCharacter = paragraph[paragraph.length-1];
    if (isPunctuation.test(lastCharacter)) {
      paragraph = paragraph.slice(0, paragraph.length-1);
    }
    return paragraph + '...';
}

export default Helpers;