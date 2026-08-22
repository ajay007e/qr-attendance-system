import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  prettier,

  {
    plugins: {
      boundaries,
    },

    settings: {
      "boundaries/ignore": ["eslint.config.mjs", "next.config.ts", "postcss.config.mjs", "next-env.d.ts"],
      "boundaries/elements": [
        {
          type: "app",
          pattern: "app",
        },

        {
          type: "feature",
          pattern: "features/*",
          capture: ["featureName"],
        },

        {
          type: "shared",
          pattern: "shared",
        },
      ],
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "boundaries/dependencies": [
        "error",
        {
          // Anything not explicitly allowed is forbidden.
          default: "disallow",
          policies: [
            {
              from: {
                element: {
                  type: "app",
                },
              },
              allow: [
                {
                  to: {
                    element: {
                      type: "feature",
                    },
                  },
                },
                {
                  to: {
                    element: {
                      type: "shared",
                    },
                  },
                },
              ],
            },
            {
              from: {
                element: {
                  type: "feature",
                },
              },
              allow: [
                {
                  to: {
                    element: {
                      type: "shared",
                    },
                  },
                },
                {
                  to: {
                    element: {
                      type: "feature",
                      captured: {
                        featureName: "{{from.featureName}}",
                      },
                    },
                  },
                },
              ],
            },
            {
              from: {
                element: {
                  type: "shared",
                },
              },
              allow: [
                {
                  to: {
                    element: {
                      type: "shared",
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      //
      // Every source file must belong to an element.
      //
      "boundaries/no-unknown-files": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
