// Helper function untuk konversi data ke matriks pairwise AHP
export function toPairwiseMatrix(values: number[]): number[][] {
  const size = values.length;
  const matrix: number[][] = [];

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      if (i === j) {
        matrix[i][j] = 1; // diagonal = 1
      } else if (i < j) {
        matrix[i][j] = values[i] / values[j];
      } else {
        matrix[i][j] = values[j] / values[i];
      }
    }
  }

  return matrix;
}
