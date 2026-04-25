import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageTitle } from '../components/ui/Title';
import { DopamineProvider } from '../store/DopamineProvider';

const meta: Meta<typeof PageTitle> = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text displayed inside the heading',
    },
  },
  args: {
    text: 'Dopamine Title',
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {};

export const Level1: Story = {
  decorators: [
    (Story) => (
      <DopamineProvider initialLevel={1}>
        <Story />
      </DopamineProvider>
    ),
  ],
};

export const Level2: Story = {
  decorators: [
    (Story) => (
      <DopamineProvider initialLevel={2}>
        <Story />
      </DopamineProvider>
    ),
  ],
};

export const Level3: Story = {
  decorators: [
    (Story) => (
      <DopamineProvider initialLevel={3}>
        <Story />
      </DopamineProvider>
    ),
  ],
};

export const Level4: Story = {
  decorators: [
    (Story) => (
      <DopamineProvider initialLevel={4}>
        <Story />
      </DopamineProvider>
    ),
  ],
};

export const Level5: Story = {
  decorators: [
    (Story) => (
      <DopamineProvider initialLevel={5}>
        <Story />
      </DopamineProvider>
    ),
  ],
};
