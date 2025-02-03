# Makyo Project

1. Init Project

   - Use React + Vite for best performance :
     npx create-vite . --template react

   - Add Dependencies :
     npm install @headlessui/react @floating-ui/react classnames

     Notes :

     - @headlessui/react → For dropdown accessibility.
     - @floating-ui/react → To handle dropdown position with elements that have high z-index.
     - classnames → To make it easier to manage CSS classes.

   - Setup Tailwind CSS
     npm install -D tailwindcss@3
     npx tailwindcss init

2. Storybook Setup

   - Install Storybook:
     npx storybook@latest init
   - Running Storybook:
     npm run storybook

3. Packages for NPM

   - Add code to package.json for dependency:
     "main": "src/components/Dropdown/index.js",
     "module": "src/components/Dropdown/index.js",
     "files": [
     "src/components/Dropdown"
     ],
     "publishConfig": {
     "access": "public"
     }

   - Publish
     npm publish --access=public

Folder Structure Explanation :
✅ This folder is now more modular with logic and UI separated.
✅ hooks/useDropdown.js → Manages Dropdown state & behavior.
✅ Dropdown.jsx → Main component that manages Dropdown UI.
✅ DropdownOption.jsx → Separate component for rendering options.
✅ Dropdown.module.css → (Optional) CSS module if needed.
✅ index.js → Re-export file for easy import.
✅ Dropdown.stories.jsx → Storybook configuration for component testing.

Conclusion :
✅ Searchable dropdown
✅ Single & Multiple Selection
✅ Custom rendering
✅ Z-index compatibility
✅ Portal support
✅ NPM-ready & Storybook-tested
