import produce from "immer";
import { createSelector } from "reselect";
import { subDays, format } from "date-fns";

export type Action =
  | {
      type: "transaction clicked in list";
      payload: {
        transaction: Transaction;
      };
    }
  | {
      type: "transaction filter changed";
      payload: TransactionView;
    }
  | {
      type: "add transaction form submitted";
      payload: { transaction: Omit<Transaction, "id"> };
    }
  | {
      type: "transaction confirmed (saga)";
      payload: { transaction: Transaction };
    }
  | {
      type: "transaction rejected (saga)";
      payload: {
        reason: string;
      };
    };

export const transactionTypes = ["deposit", "withdrawal"] as const;
type TransactionType = typeof transactionTypes[number];
export type Transaction = {
  id: string;
  date: string;
  value: number;
  type: TransactionType;
};
export const transactionFilters = ["all", "deposit", "withdrawal"] as const;
export type TransactionView = typeof transactionFilters[number];

export type State = {
  overdraft: number;
  transactions: { [id: string]: Transaction };
  transactionFilter: TransactionView;
};

const initialState = (): State => ({
  overdraft: 250,
  transactions: {},
  transactionFilter: "all"
});

export const reducer = (state: State = initialState(), action: Action): State =>
  produce(state, next => {
    switch (action.type) {
      case "transaction clicked in list": {
        delete next.transactions[action.payload.transaction.id];
        break;
      }
      case "transaction filter changed": {
        next.transactionFilter = action.payload;
        break;
      }
      case "transaction confirmed (saga)": {
        next.transactions[action.payload.transaction.id] =
          action.payload.transaction;
        break;
      }
    }
  });

export const selectTransactionsLatestToOldest = createSelector(
  [(s: State) => s.transactions],
  transactions => {
    return Object.values(transactions).sort((a, b) =>
      a.date > b.date ? -1 : 1
    );
  }
);

export const selectFilteredTransactions = createSelector(
  [selectTransactionsLatestToOldest, (s: State) => s.transactionFilter],
  (transactions, filter) => {
    return filter === "all"
      ? transactions
      : transactions.filter(transaction => transaction.type === filter);
  }
);

export const selectBalance = createSelector(
  [selectTransactionsLatestToOldest],
  transactions =>
    transactions.reduce(
      (balance, transaction) =>
        balance +
        (transaction.type === "withdrawal"
          ? -transaction.value
          : transaction.value),
      0
    )
);

export const selectOverdraft = createSelector(
  [(state: State) => state.overdraft],
  overdraft => overdraft
);

export const selectBalancesByTime = createSelector(
  [selectFilteredTransactions],
  transactions => {
    const keyFormat = "yyyy MM dd";
    const daysToDisplay = 14;
    return new Array(daysToDisplay)
      .fill(null)
      .map((_, i) => {
        const group = format(
          i === 0 ? new Date() : subDays(new Date(), i),
          keyFormat
        );
        return {
          group,
          total: transactions
            .filter(({ date }) => format(new Date(date), keyFormat) === group)
            .reduce(
              (total, { value, type }) =>
                total + (type === "withdrawal" ? -value : value),
              0
            )
        };
      })
      .reverse();
  }
);
