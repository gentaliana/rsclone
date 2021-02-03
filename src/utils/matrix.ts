export const initCells = (fieldSize: number, firstWord: string): string[] => {
  const cells = [];
  const wordRowIndex = Math.round(fieldSize / 2) - 1;
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      const id = i * fieldSize + j;
      let letter = '';

      if (wordRowIndex === i) {
        letter = firstWord.charAt(j).toUpperCase();
      }

      cells[id] = letter;
    }
  }

  return cells;
};
