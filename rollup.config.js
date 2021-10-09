import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions: [...DEFAULT_EXTENSIONS, ".ts", "tsx"],
        babelHelpers: "runtime",
        plugins: [["@babel/plugin-transform-runtime"]],
      }),
      external({
        includeDependencies: true,
      }),
      resolve(),
      terser(),
      url(),
      svgr(),
      commonjs({
        include: "node_modules/prop-types/**",
      }),
    ],
  },
];
