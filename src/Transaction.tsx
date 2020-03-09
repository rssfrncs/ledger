import * as React from "react";
import { Text } from "./Text";
import { Transaction } from "./state";
import { CentredMax, Space } from "./Layout";
import { formatDistanceToNow } from "date-fns";
import { theme } from "./theme";
import styled from "styled-components";

export function TransactionDisplay({
  transaction,
  onClick
}: {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}) {
  return (
    <Container onClick={() => void onClick(transaction)}>
      <TransactionDate level="subtle">
        {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
      </TransactionDate>
      <div style={{ flexDirection: "row" }}>
        <Text level="normal">£{transaction.value.toFixed(2)}</Text>
        <Space />
        <Text level="normal">{transaction.type}</Text>
      </div>
    </Container>
  );
}

const Container = styled(CentredMax)`
  align-items: flex-start;
  padding: ${theme.gutter}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const TransactionDate = styled(Text)`
  align-self: flex-end;
`;
