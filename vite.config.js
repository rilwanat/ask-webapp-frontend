import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // This should be '/' for subdomain deployment
  plugins: [
    react(),
    tailwindcss(),
    // //
    // obfuscator({
    //   options: {
    //     compact: true,
    //     controlFlowFlattening: true,
    //     controlFlowFlatteningThreshold: 0.75,
    //     numbersToExpressions: true,
    //     simplify: true,
    //     stringArrayShuffle: true,
    //     splitStrings: true,
    //     stringArrayThreshold: 0.75
    //   }
    // })
    // //
  ],
  // //
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       drop_console: true, // Remove console logs
  //       drop_debugger: true // Remove debugger statements
  //     }
  //   }
  // }
  // //
})
