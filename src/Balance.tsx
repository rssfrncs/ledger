import * as React from "react";
import { Text } from "./Text";
import { useTypedSelector } from "./store";
import { selectBalance } from "./state";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

export function Balance() {
  const balance = useTypedSelector(selectBalance);
  const { balanceSpring } = useSpring({
    from: {
      balanceSpring: 0
    },
    balanceSpring: balance,
    config: {
      clamp: true
    }
  });
  return (
    <Container>
      <Text level="heading">
        £
        <animated.span>
          {balanceSpring.interpolate(x => x.toFixed(0))}
        </animated.span>
      </Text>
      <Text level="subheading">
        {balance > 4000
          ? "Good job saving!"
          : balance < 0
          ? "You're using your overdraft!"
          : "Keep it up!"}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  padding-top: 20px;
`;
