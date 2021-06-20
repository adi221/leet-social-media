export const findHashtags = description => {
  const hashtags = [];
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
      newHashtag.length && hashtags.push(newHashtag);
    } else {
      i++;
    }
  }
  return hashtags;
};
