export const headingLevels = (root: ParentNode = document): number[] =>
  Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((el) =>
    Number(el.tagName[1])
  );

export const headingOrderSkips = (levels: number[]): Array<[number, number]> => {
  const skips: Array<[number, number]> = [];
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] > levels[i - 1] + 1) {
      skips.push([levels[i - 1], levels[i]]);
    }
  }
  return skips;
};
