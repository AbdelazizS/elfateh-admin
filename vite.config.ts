import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, 'src')
  const env = loadEnv(mode, process.cwd(), '')
  const production = env.NODE_ENV === 'production'

  return {
    root: rootDir,
    base: '/',
    server: {
      port: 3000,
      cors: false,
    },
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwind()
          // VueI18nPlugin({
          //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**') // provide a path to the folder where you'll store translation data (see below)
          // })
        ]
      }
    },
    resolve: {
      alias: {
        '@': rootDir
      }
    },
    build: {
      minify: production,
      sourcemap: production,
      outDir: path.resolve(rootDir, '..', 'dist')
    }
  }
})
