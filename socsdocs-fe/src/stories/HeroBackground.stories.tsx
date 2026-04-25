import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroBackground } from '../components/ui/HeroBackground';

const meta: Meta<typeof HeroBackground> = {
  title: 'Components/HeroBackground',
  component: HeroBackground,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '400px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeroBackground>;

export const Level1: Story = {
  parameters: { dopamineLevel: 1 },
};

export const Level2: Story = {
  parameters: { dopamineLevel: 2 },
};

export const Level3: Story = {
  parameters: { dopamineLevel: 3 },
};

export const Level4: Story = {
  parameters: { dopamineLevel: 4 },
};

export const Level5: Story = {
  parameters: { dopamineLevel: 5 },
};