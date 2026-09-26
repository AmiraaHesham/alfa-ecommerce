import ProductDetails from "../../components/productDetails";

const getProduct = async (itemId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/items/${itemId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const result = await res.json();

    return result.data ?? result;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { id } = params;

  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product",
    };
  }

  const imageUrl = product.images?.[0]?.imageUrl;

  const image = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${imageUrl}`
    : null;

  return {
    title: product.nameEn,
    description: product.descriptionEn,

    openGraph: {
      title: product.nameEn,
      description: product.descriptionEn,
      type: "website",

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: product.nameEn,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: product.nameEn,
      description: product.descriptionEn,
      images: image ? [image] : [],
    },
  };
}

export default function ProductDetailsPage({ params }) {
  const { id } = params;

  return (
    <div className="bg-white">
      <ProductDetails itemId={id} />

      <hr />
    </div>
  );
}