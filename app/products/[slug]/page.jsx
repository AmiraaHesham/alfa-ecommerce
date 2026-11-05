import { notFound, permanentRedirect } from "next/navigation";
import ProductDetails from "../../user/productdetails/components/productDetails";
import { getProductBySlug, getSeoRedirect } from "../../../lib/api";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  buildProductMetadata,
  productBreadcrumbs,
  serializeJsonLd,
} from "../../../lib/seo";

export const revalidate = 300;
export const dynamic = "force-dynamic";

async function resolveProduct(slug) {
  const product = await getProductBySlug(slug);
  if (product) return product;

  const redirect = await getSeoRedirect("item", slug);
  if (redirect?.newSlug && redirect.targetExists !== false) {
    permanentRedirect(`/products/${encodeURIComponent(redirect.newSlug)}`);
  }
  notFound();
}

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug);
  const product = await resolveProduct(slug);
  return buildProductMetadata(product);
}

export default async function ProductPage({ params }) {
  const slug = decodeURIComponent(params.slug);
  const product = await resolveProduct(slug);

  if (product.seoCode && product.seoCode !== slug) {
    permanentRedirect(`/products/${encodeURIComponent(product.seoCode)}`);
  }

  const breadcrumbs = productBreadcrumbs(product);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProductJsonLd(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <ProductDetails
        itemId={product.itemId}
        initialProduct={product}
        categorySlug={product.itemCategory?.seoCode}
      />
      <hr />
    </div>
  );
}
