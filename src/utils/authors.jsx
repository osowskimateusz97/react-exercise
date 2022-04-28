export const filterOutOccupiedAuthors = (author, occupiedAuthors) => {
  if (!occupiedAuthors.length) return true;
  return !occupiedAuthors.find(
    (occupiedAuthorId) => occupiedAuthorId === author.id
  );
};
