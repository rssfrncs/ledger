import * as React from "react";
import { Transactions } from "./Transactions";
import { useTypedDispatch } from "./store";
import { Balance } from "./Balance";
import { Overdraft } from "./Overdraft";
import { BalanceChart } from "./BalanceChart";
import { AddTransaction } from "./AddTransaction";
import { Max } from "./Layout";

export function Account() {
  const dispatch = useTypedDispatch();
  return (
    <Max>
      <Overdraft />
      <Balance />
      <div style={{ width: "100%", flex: "0 0 10%" }}>
        <BalanceChart />
      </div>
      <Transactions
        transactionClicked={transaction => {
          dispatch({
            type: "transaction clicked in list",
            payload: {
              transaction
            }
          });
        }}
      />
      <AddTransaction />
    </Max>
  );
}
