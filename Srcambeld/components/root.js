import allWords from './testWords.js'

export default class GameData {
  constructor() {
    this.words = allWords.split('\n')
  }

  getSize() {
    return this.words.length
  }

   getWord(i) {
    return this.words[i];
  }

   scramble(w) {
    var word = w;
    var wordLength = word.length;
    var scrambled = "";

    for (var i = 0; i < wordLength; i++) {
      var charIndex = Math.floor(Math.random() * word.length);
      scrambled += word.charAt(charIndex);
      word = word.substr(0, charIndex) + word.substr(charIndex + 1);
    }
    return scrambled.toUpperCase();
  }
}
