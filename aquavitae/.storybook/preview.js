/** @type { import('@storybook/react-webpack5').Preview } */

const interLink = document.createElement('link');
interLink.rel = 'stylesheet';
interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
document.head.appendChild(interLink);

const globalStyle = document.createElement('style');
globalStyle.textContent = `
  *, *::before, *::after {
    font-family: 'Inter', sans-serif !important;
    box-sizing: border-box;
  }
`;
document.head.appendChild(globalStyle);

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;