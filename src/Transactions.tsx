import React from "react";
import { useTypedSelector, useTypedDispatch } from "./store";
import { selectTransactionsLatestToOldest, transactionFilters } from "./state";
import useMeasure from "react-use-measure";
import { FixedSizeList } from "react-window";
import { Radio } from "./Radio";
import { theme } from "./theme";
import { CentredMax, Space } from "./Layout";
import { TransactionDisplay } from "./Transaction";
import { Text } from "./Text";

type Props = {
  transactionClicked: (item: any) => void;
};

export function Transactions({ transactionClicked }: Props) {
  const [ref, { width, height }] = useMeasure({
    polyfill: ResizeObserver
  });
  const itemHeight = 100;
  const transactions = useTypedSelector(selectTransactionsLatestToOldest);
  return (
    <CentredMax>
      <TransactionsFilter />
      <Space />
      <CentredMax
        ref={ref}
        style={{ flex: 1, height: "100%", width: "100%", overflow: "hidden" }}
      >
        {transactions.length ? (
          <FixedSizeList
            itemCount={transactions.length}
            itemSize={itemHeight}
            width={width}
            height={height}
          >
            {({ style, index }) => (
              <div
                key={transactions[index].id}
                style={{
                  ...style,
                  width: "100%",
                  borderBottomColor: theme.primary,
                  borderBottomWidth: 5
                }}
              >
                <TransactionDisplay
                  onClick={() => void transactionClicked(transactions[index])}
                  transaction={transactions[index]}
                />
              </div>
            )}
          </FixedSizeList>
        ) : (
          <Text level="subtle">No Transactions.</Text>
        )}
      </CentredMax>
    </CentredMax>
  );
}

function TransactionsFilter() {
  const dispatch = useTypedDispatch();
  const activeFilter = useTypedSelector(state => state.transactionFilter);
  return (
    <div style={{ flexDirection: "row", justifyContent: "center" }}>
      {transactionFilters.map(filter => (
        <Radio
          key={filter}
          value={filter}
          label={filter}
          checked={activeFilter === filter}
          onClick={() =>
            void dispatch({
              type: "transaction filter changed",
              payload: filter
            })
          }
        />
      ))}
    </div>
  );
}
