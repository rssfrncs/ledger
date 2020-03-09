import * as React from "react";
import { Text } from "./Text";
import { useTypedSelector } from "./store";
import { selectOverdraft } from "./state";
import styled from "styled-components";

export function Overdraft() {
  const overdraft = useTypedSelector(selectOverdraft);

  return (
    <Container>
      <Text level="subtle">Agreed Overdaft £{overdraft}</Text>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  padding-top: 20px;
`;
