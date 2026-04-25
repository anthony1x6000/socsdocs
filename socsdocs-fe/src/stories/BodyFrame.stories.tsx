import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyFrame } from '../components/ui/BodyFrame';

const meta: Meta<typeof BodyFrame> = {
  title: 'Components/BodyFrame',
  component: BodyFrame,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#222', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BodyFrame>;

export const Level1: Story = {
  args: {
    children: <div className="text-white">Dopamine Level 1 Content</div>,
  },
  parameters: { dopamineLevel: 1 },
};

export const Level3: Story = {
  args: {
    children: <div className="text-white">Dopamine Level 3 Content</div>,
  },
  parameters: { dopamineLevel: 3 },
};

export const Level5: Story = {
  args: {
    children: <div className="text-white">Dopamine Level 5 Content</div>,
  },
  parameters: { dopamineLevel: 5 },
};
