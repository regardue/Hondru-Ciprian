export const initialItems = new Array(29999999).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 29999999,
  };
});
