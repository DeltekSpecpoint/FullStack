export const getClasses = (classes: string[]): string =>
  classes
    .filter((item: string) => item !== '')
    .join(' ')
    .trim();