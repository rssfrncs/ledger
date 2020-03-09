import React from "react";
import { Chart } from "./Chart";
import { selectBalancesByTime } from "./state";
import { useTypedSelector } from "./store";
import { CentredMax } from "./Layout";
import { Text } from "./Text";

export function BalanceChart() {
  const data = useTypedSelector(state =>
    selectBalancesByTime(state).map(({ total }, i) => ({
      step: i,
      value: total
    }))
  );
  return (
    <CentredMax>
      <Chart data={data} />
      <Text level="subtle">14 day history</Text>
    </CentredMax>
  );
}
