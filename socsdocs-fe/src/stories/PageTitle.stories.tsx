import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '../components/Title';

// 1. The Default Export (Meta Config)
// This tells Storybook how to categorize your component and sets up the controls
const meta: Meta<typeof PageTitle> = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Changes the dopamine style level of the title',
    },
    text: {
      control: 'text',
      description: 'The text displayed inside the heading',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

// 2. The Named Exports (The actual "Stories")
// Each of these represents a different variation of your component

export const DefaultLevel1: Story = {
  args: {
    text: 'This is a Level 1 Title',
    level: 1,
  },
};

export const Level2: Story = {
  args: {
    text: 'This is a Level 2 Title',
    level: 2,
  },
};

export const Level3: Story = {
  args: {
    text: 'This is a Level 3 Title',
    level: 3,
  },
};

export const Level4: Story = {
  args: {
    text: 'This is a Level 4 Title',
    level: 4,
  },
};

export const Level5: Story = {
  args: {
    text: 'This is a Level 5 Title',
    level: 5,
  },
};

// You can even test what happens if someone forgets to pass a level
export const MissingLevelFallback: Story = {
  args: {
    text: 'This should fallback to Level 1 styles',
    // notice no level is provided here
  },
};