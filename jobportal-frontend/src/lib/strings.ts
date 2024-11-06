export const getFirstLetters = (name: string) => {
  const words = name.split(' ');
  let result = '';

  if (words.length > 1) {
    // If there are multiple words, take the first letter of the first two words
    result = words[0].charAt(0) + words[1].charAt(0);
  } else {
    // If there is only one word, take the first two letters of that word
    result = words[0].substring(0, 2);
  }

  return result;
};
