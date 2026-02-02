/// <reference types="astro/client" />

// Declare .astro modules for TypeScript
declare module '*.astro' {
  const Component: any;
  export default Component;
}
