import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HashtagAtComment = ({ comment, isTagged = false }) => {
  const determineIsTagged = () => {
    if (!comment.includes('#')) return comment;
    let words = comment.split(' ');

    return words.map((word, idx) => {
      if (word[0] === '#' && word.length > 1) {
        return (
          <Link
            to={`/explore/tags/${word.substring(1)}`}
            className='blue '
            key={idx}
            target='_blank'
            rel='noopener noreferrer'
          >
            {word}
          </Link>
        );
      }
      return <Fragment key={idx}>{word}</Fragment>;
    });
  };

  const determineIsMentioned = () => {
    if (!comment.includes('@')) return comment;
    let words = comment.split(' ');

    return words.map((word, idx) => {
      if (word[0] === '@' && word.length > 1) {
        return (
          <Link
            to={`/profile/${word.substring(1)}`}
            className='blue '
            key={idx}
            target='_blank'
            rel='noopener noreferrer'
          >
            {word}
          </Link>
        );
      }
      return <Fragment key={idx}>{word}</Fragment>;
    });
  };

  return <>{isTagged ? determineIsTagged() : determineIsMentioned()}</>;
};

export default HashtagAtComment;
