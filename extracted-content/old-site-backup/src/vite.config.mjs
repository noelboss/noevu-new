import createProjectConfig from "../../vite.config.projects.mjs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Export the project-specific config
// All configuration is now handled in vite.config.projects.mjs
const __dirname = dirname(fileURLToPath(import.meta.url));
export default createProjectConfig(__dirname);
