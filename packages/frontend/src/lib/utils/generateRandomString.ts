import {
  RANDOM_STRING_CHARS,
  RANDOM_STRING_MAX_LENGTH,
  RANDOM_STRING_MIN_LENGTH
} from './constants';

const generateRandomString = (): string => {
  const length =
    Math.floor(Math.random() * (RANDOM_STRING_MAX_LENGTH - RANDOM_STRING_MIN_LENGTH + 1)) +
    RANDOM_STRING_MIN_LENGTH;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += RANDOM_STRING_CHARS.charAt(Math.floor(Math.random() * RANDOM_STRING_CHARS.length));
  }

  return result;
};

export { generateRandomString };
