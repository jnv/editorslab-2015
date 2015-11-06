
const colsOverride = {
  freedom: 'Violation of freedom',
}

export function colLabel (column) {
  return colsOverride[column] || column
}
