export default function StarRating({ rating }: { rating: number }) {
  const stars = "⭐".repeat(rating);

  return <div className="">{stars}</div>;
}
