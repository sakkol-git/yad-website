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
    },
  },
];

export default eslintConfig;
