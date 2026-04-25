import type { Preview } from '@storybook/react-vite'
import '../src/index.css';
import { DopamineProvider } from '../src/store/DopamineProvider';
import { SongProvider } from '../src/utils/SongProvider';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story, context) => {
      const level = context.parameters.dopamineLevel ?? context.args.level;
      const content = React.createElement(SongProvider, null, React.createElement(Story));
      
      if (level !== undefined) {
        return React.createElement(DopamineProvider, { initialLevel: Number(level) }, content);
      }
      return React.createElement(DopamineProvider, null, content);
    },
  ],
};

export default preview;
