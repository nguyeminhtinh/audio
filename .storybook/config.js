import { configure } from '@storybook/react';

// Using style in storybook
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../src/App.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
