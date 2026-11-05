"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function EmailFailedPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-bold">
        {t("emailConfirmationFailed") || "Email confirmation failed"}
      </h1>
      <p className="max-w-lg text-gray-600">
        {t("emailConfirmationFailedMessage") ||
          "The confirmation link is invalid or has expired. Please request a new confirmation email."}
      </p>
      <Link href="/signin" className="text-red-600 font-semibold">
        {t("backToSignIn") || "Back to sign in"}
      </Link>
    </div>
  );
}
