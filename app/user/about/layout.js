import { SITE_URL, SITE_NAME_AR, DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata = {
  title: "من نحن",
  description:
    "تعرف على ألفا جروب تكنولوجي، خبرتنا في الأجهزة الإلكترونية والخدمات التقنية وسياسات الضمان والاستبدال.",
  alternates: { canonical: `${SITE_URL}/user/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/user/about`,
    siteName: SITE_NAME_AR,
    locale: "ar_EG",
    title: `من نحن | ${SITE_NAME_AR}`,
    description:
      "تعرف على ألفا جروب تكنولوجي وخبرتنا في الأجهزة الإلكترونية والخدمات التقنية.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME_AR }],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
