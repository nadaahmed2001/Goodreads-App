// export const calculateAverageRating = (reviews) => {
//   if (!reviews || reviews.length === 0) return 0;
//   const total = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
//   return total / reviews.length;
// };

export const calculateAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
  return total / reviews.length;
};
