import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/ui/DopamineSlider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black', padding: '2rem', minHeight: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Level1: Story = {
  parameters: { dopamineLevel: 1 },
};

export const Level3: Story = {
  parameters: { dopamineLevel: 3 },
};

export const Level5: Story = {
  parameters: { dopamineLevel: 5 },
};
