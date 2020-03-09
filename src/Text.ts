import { theme } from "./theme";
import styled from "styled-components";

type TextLevel = "heading" | "subheading" | "normal" | "subtle";

export const Text = styled.span<{ level: TextLevel }>`
  opacity: ${({ level }) => (level === "subtle" ? 0.8 : 1)};
  font-style: ${({ level }) => (level === "subtle" ? "italic" : "normal")};
  text-shadow: ${({ level }) =>
    level === "heading" ? "0px 5px 3px #eaeaea" : "none"};
  color: ${({ level }) => getTextColor(level)};
  font-size: ${({ level }) => getFontSize(level)};
`;

const getFontSize = (level: TextLevel) => {
  switch (level) {
    case "heading": {
      return "3rem";
    }
    case "subheading": {
      return "1.5rem";
    }
    case "subtle":
    case "normal": {
      return "1rem";
    }
  }
};

const getTextColor = (level: TextLevel): string => {
  switch (level) {
    case "heading": {
      return theme.primary;
    }
    case "subheading": {
      return theme.subtle;
    }
    case "normal": {
      return theme.fg;
    }
    case "subtle": {
      return theme.subtle;
    }
  }
};
