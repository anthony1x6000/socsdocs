import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/DopamineSlider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'inline-radio',
      options: ['black', 'white'],
      description: 'Toggles the background color of the preview',
    },
  },
  args: {
    backgroundColor: 'black',
  },
  decorators: [
    (Story, context) => (
      <div style={{ backgroundColor: context.args.backgroundColor, padding: '3rem', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};
