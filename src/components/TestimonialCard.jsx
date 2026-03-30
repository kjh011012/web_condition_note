/**
 * 변화·경험 중심 짧은 후기 카드
 */
export default function TestimonialCard({ quote, author, tag }) {
  return (
    <figure className="cn-testimonial">
      {tag ? <p className="cn-testimonial__tag">{tag}</p> : null}
      <blockquote className="cn-testimonial__quote">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="cn-testimonial__author">— {author}</figcaption>
    </figure>
  );
}
