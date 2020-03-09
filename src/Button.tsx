import styled from "styled-components";
import { theme } from "./theme";

export const Button = styled.button`
  background: linear-gradient(15deg, ${theme.primary}, ${theme.secondary});
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  color: white;
`;
