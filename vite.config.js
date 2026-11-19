import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'copy-static-site-files',
        apply: 'build',
        closeBundle(error) {
          if (error) return;
          const rootDir = process.cwd();
          const distDir = path.resolve(rootDir, 'dist');
          if (!fs.existsSync(distDir)) return;

          for (const entry of fs.readdirSync(rootDir)) {
            if (entry.endsWith('.html')) {
              fs.copyFileSync(path.join(rootDir, entry), path.join(distDir, entry));
            }
          }

          for (const folder of ['css', 'js', 'assets']) {
            const src = path.join(rootDir, folder);
            const dest = path.join(distDir, folder);
            if (fs.existsSync(src)) {
              fs.cpSync(src, dest, {recursive: true, force: true});
            }
          }
        },
      },
    ],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
