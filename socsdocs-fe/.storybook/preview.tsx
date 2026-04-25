/// <reference types="vite/client" />
import type { Preview } from '@storybook/react-vite'
import '../src/index.css';
import { DopamineProvider } from '../src/store/DopamineProvider';
import { SongProvider } from '../src/utils/SongProvider';

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
      const content = (
        <SongProvider>
          <Story />
        </SongProvider>
      );
      
      if (level !== undefined) {
        return (
          <DopamineProvider initialLevel={Number(level)}>
            {content}
          </DopamineProvider>
        );
      }
      return (
        <DopamineProvider>
          {content}
        </DopamineProvider>
      );
    },
  ],
};

export default preview;
