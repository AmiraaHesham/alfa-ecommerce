import Link from "next/link";
import { categoryPath, productPath, productDisplayName } from "../../lib/seo";

export default function HomeSeoIntro({ categories = [], products = [] }) {
  const visibleCategories = categories
    .filter((category) => Number(category.itemsCount || 0) > 0)
    .slice(0, 12);

  return (
    <section aria-labelledby="home-seo-title" className="px-3 pt-6">
      <div className="rounded-3xl bg-white px-5 py-6 shadow-sm sm:px-8">
        <h1
          id="home-seo-title"
          className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl"
        >
          ألفا جروب تكنولوجي – إلكترونيات وأجهزة منزلية بأسعار حقيقية
        </h1>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-gray-600">
          تسوق أجهزة استقبال وشاشات وكابلات وأجهزة منزلية وإلكترونيات من ألفا
          جروب تكنولوجي. تصفح الأقسام للوصول إلى المنتجات والأسعار والمواصفات
          المتاحة.
        </p>
        {visibleCategories.length > 0 ? (
          <nav aria-label="تصفح أقسام المتجر" className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {visibleCategories.map((category) => (
                <li key={category.itemCategoryId || category.seoCode}>
                  <Link
                    href={categoryPath(category)}
                    className="inline-flex rounded-full border border-gray-200 bg-[#f8f8fa] px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#E14A5C] hover:text-[#E14A5C]"
                  >
                    {category.nameAr || category.nameEn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="inline-flex rounded-full bg-[#E14A5C] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#CD4354]"
                >
                  كل المنتجات
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}

        {products.length > 0 ? (
          <div className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-bold text-gray-900">منتجات مختارة</h2>
            <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <li key={product.itemId} className="min-w-0">
                  <Link
                    href={productPath(product)}
                    className="block truncate text-gray-700 transition-colors hover:text-[#E14A5C]"
                  >
                    {productDisplayName(product, "ar")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
