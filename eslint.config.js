import nextConfigVitals from "eslint-config-next/core-web-vitals";
import nextConfigTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextConfigVitals,
  ...nextConfigTs,
  {
    ignores: [
      ".next/",
      "out/",
      "build/",
      "dist/",
      ".output/",
      ".vinxi/",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-page-custom-font": "off"
    },
  },
];

export default eslintConfig;
