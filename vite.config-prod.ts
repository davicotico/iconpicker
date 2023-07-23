import pkg from './package.json';
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const banner = `/*! ${pkg.name} ${pkg.version} | ${pkg.description}
@author ${pkg.author}
@version ${pkg.version}
@license ${pkg.license}
*/`;

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "IconPicker",
      fileName(format, entryName) {
        let strFormat = '';
        if (format != 'es' ) {
          strFormat = `.${format}`;
        }
        return `${entryName}${strFormat}.js`;
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') {
            return 'css/styles.css';
          }
          return `[name][hash][extname]`;
        },
        banner: banner
      },
    }
  },
  plugins: [dts()],
});