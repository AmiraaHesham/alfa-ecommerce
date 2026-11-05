import { notFound, permanentRedirect } from "next/navigation";
import { getCategoryById } from "../../../../../../lib/api";

/**
 * Legacy category URL. Middleware issues a 301; this fallback preserves the
 * same permanent destination and prevents duplicate category content.
 */
export default async function LegacyCategoryPage({ params }) {
  if (params.category === "all" || params.id === "null") {
    permanentRedirect("/products");
  }

  const category = await getCategoryById(params.id);

  if (!category?.seoCode) {
    notFound();
  }

  permanentRedirect(`/categories/${encodeURIComponent(category.seoCode)}`);
}
