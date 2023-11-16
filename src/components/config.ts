export type TagColor = "pink" | "yellow" | "green" | "lime" | "default";

export const TAG_COLORS = {
  pink: "text-pink-500 bg-pink-100",
  yellow: "text-yellow-500 bg-yellow-100",
  green: "text-green-500 bg-green-100",
  lime: "text-lime-500 bg-lime-100",
  default: "text-gray-500 bg-gray-100",
};

export const INITIAL_TAG_COLOR =
  "text-gray-500 bg-white border-gray-200 hover:text-gray-400";
export const SELECTED_TAG_COLOR = "text-white bg-pink-400 border-transparent";

export const SELECTED_TAG_COLORS = {
  pink: "text-white border-transparent bg-pink-400",
  yellow: "text-white border-transparent bg-yellow-400",
  green: "text-white border-transparent bg-green-400",
  lime: "text-white border-transparent bg-lime-400",
  default: "text-white border-transparent bg-gray-400",
};
