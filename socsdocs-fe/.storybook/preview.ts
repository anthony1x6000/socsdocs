import type { Preview } from '@storybook/react-vite'
import '../src/index.css';
import { DopamineProvider } from '../src/store/useDopamineStore';
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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story, context) => {
      const level = context.parameters.dopamineLevel ?? context.args.level;
      if (level !== undefined) {
        return React.createElement(DopamineProvider, { initialLevel: Number(level) }, React.createElement(Story));
      }
      return React.createElement(Story);
    },
  ],
};

export default preview;
