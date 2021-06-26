export const findHashtags = description => {
  const hashtags = new Set();
  let i = 0;
  while (i < description.length) {
    let char = description[i];
    if (char === '#') {
      let newHashtag = '';
      while (
        ++i < description.length &&
        description[i] !== ' ' &&
        description[i] !== '#'
      ) {
        newHashtag += description[i];
      }
      newHashtag.length && hashtags.add(newHashtag);
    } else {
      i++;
    }
  }
  return [...hashtags];
};

export const findMentions = comment => {
  let users = new Set();
  const atFirstIndex = comment.indexOf('@');
  if (atFirstIndex === -1) return [];
  let words = comment.substring(atFirstIndex).split(' ');
  words.forEach(word => {
    if (word[0] === '@') {
      users.add(word.substring(1));
    }
  });
  return [...users];
};
