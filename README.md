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
