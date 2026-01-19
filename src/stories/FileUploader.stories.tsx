import type { Meta, StoryObj } from "@storybook/react";
import FileUploader from "../components/FileUploader";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
};

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {};