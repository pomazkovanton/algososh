export const delay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export const randomArr = (
  length: number = 17,
  min: number = 3,
  max: number = 100
): number[] => {
  const tempArray = [];

  for (let i = 1; i <= length; i++) {
    tempArray.push(Math.floor(Math.random() * (max - min)) + min);
  }

  return tempArray;
};
