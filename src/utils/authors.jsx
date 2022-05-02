export const filterOutOccupiedAuthors = (author, occupiedAuthors) => {
  if (!occupiedAuthors.length) return true;
  return !occupiedAuthors.find(
    (occupiedAuthorId) => occupiedAuthorId === author.id
  );
};
export const getOccupiedAuthors = (authors, occupiedAuthors) => {
  if (!occupiedAuthors.length) return [];
  return occupiedAuthors.map((occupiedAuthorId) =>
    authors.find((author) => author.id === occupiedAuthorId)
  );
};
