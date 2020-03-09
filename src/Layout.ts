import styled from "styled-components";
import { theme } from "./theme";

export const Max = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 100%;
`;

export const CentredMax = styled(Max)`
  align-items: center;
  justify-content: center;
`;

export const Space = styled.div`
  flex: 0 0 ${theme.gutter}px;
`;
