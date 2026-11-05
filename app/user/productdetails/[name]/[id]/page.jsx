import { notFound, permanentRedirect } from "next/navigation";
import { getProductById } from "../../../../../lib/api";

/**
 * Legacy product URL. Middleware issues a 301 to the canonical slug; this
 * server fallback keeps the same destination if middleware is unavailable and
 * guarantees the old id/name URL never serves duplicate product content.
 */
export default async function LegacyProductPage({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  if (!product.seoCode) {
    notFound();
  }

  permanentRedirect(`/products/${encodeURIComponent(product.seoCode)}`);
}
