import { put, takeLatest, select, call } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { Action, selectBalance, Transaction, selectOverdraft } from "./state";

export function* rootSaga() {
  yield takeLatest<Action>("add transaction form submitted", handleTransaction);
}

function* handleTransaction({ payload }: any) {
  const balance = yield select(selectBalance);
  const overdraft = yield select(selectOverdraft);
  const { transaction }: { transaction: Transaction } = payload;
  if (
    transaction.type === "withdrawal" &&
    balance - transaction.value < -overdraft
  ) {
    yield put<Action>({
      type: "transaction rejected (saga)",
      payload: {
        reason: "Overdraft exceeded."
      }
    });
    yield call(alert, "Transaction failed. Overdraft would be exceeded!");
  } else {
    yield put<Action>({
      type: "transaction confirmed (saga)",
      payload: {
        transaction: { ...transaction, id: uuid() }
      }
    });
  }
}
