import {toPattern} from 'vanilla-masker';

interface PatternOptions {
  pattern?: string | undefined;
  placeholder?: string | undefined;
}

export const unMask = (value: string): string => value.replace(/\W/g, '');

const masker = (
  value: string,
  pattern: string,
  options?: Omit<PatternOptions, 'pattern'>,
) => toPattern(value, {pattern, ...options});

const multimasker = (
  value: string,
  patterns: string[],
  options?: Omit<PatternOptions, 'pattern'>,
) =>
  masker(
    value,
    patterns.reduce(
      (memo, pattern) => (value.length <= unMask(memo).length ? memo : pattern),
      patterns[0],
    ),
    options,
  );

export const mask = (
  value: string,
  pattern: string | string[],
  options?: Omit<PatternOptions, 'pattern'>,
): string =>
  typeof pattern === 'string'
    ? masker(value, pattern || '', options)
    : multimasker(value, pattern, options);
