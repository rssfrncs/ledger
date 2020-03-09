import * as React from "react";
import { Text } from "./Text";
import { Formik, Field, useField } from "formik";
import { theme } from "./theme";
import { useTypedDispatch } from "./store";
import { Transaction, transactionTypes } from "./state";
import { format, startOfDay } from "date-fns";
import { Button } from "./Button";
import { Radio } from "./Radio";
import { animated, useSpring } from "react-spring";
import { Space } from "./Layout";

const dateTimeInputFormat = "yyyy-MM-dd'T'hh:mm";
const initialValues: Omit<Transaction, "id"> = {
  type: "deposit",
  value: 0,
  date: format(startOfDay(new Date()), dateTimeInputFormat)
};

export function AddTransaction() {
  const handleHeight = 50;
  const [open, toggle] = React.useReducer(isOpen => !isOpen, false);
  const dispatch = useTypedDispatch();
  const { y } = useSpring({
    y: open ? "calc(0% - 0px)" : `calc(100% - ${handleHeight}px)`
  });
  return (
    <animated.div
      style={{
        position: "fixed",
        bottom: 0,
        flex: 0,
        width: "100%",
        justifyContent: "center",
        background: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)",
        transform: y.interpolate(y => `translateY(${y})`)
      }}
    >
      <div
        onClick={() => void toggle()}
        style={{
          background: "rgba(0,0,0,0.5)",
          width: "100%",
          height: handleHeight,
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        {open ? "Close" : "Add Transaction"}
      </div>
      <div style={{ padding: theme.gutter }}>
        <Text level="subheading">Add Transaction</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={transaction =>
            void dispatch({
              type: "add transaction form submitted",
              payload: { transaction }
            })
          }
        >
          {({ values, handleSubmit }) => (
            <div>
              <TypePicker />
              <Space />
              <DatePicker />
              <Space />
              <div style={{ alignItems: "center" }}>
                <Text level="subtle">£{values.value}</Text>
                <Field
                  style={{ flex: 1, width: "100%" }}
                  name="value"
                  type="range"
                  min={0}
                  max={10000}
                />
              </div>
              <Space />
              <Button onClick={() => void handleSubmit()}>Add</Button>
            </div>
          )}
        </Formik>
      </div>
    </animated.div>
  );
}

function DatePicker() {
  const [field, , helpers] = useField({
    name: "date"
  });
  return (
    <input
      type="datetime-local"
      value={field.value}
      max={format(new Date(), dateTimeInputFormat)}
      onChange={e => void helpers.setValue(e.target.value)}
    />
  );
}

function TypePicker() {
  const [field, , helpers] = useField({
    name: "type"
  });
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {transactionTypes.map(type => (
        <Radio
          value={type}
          label={type}
          key={type}
          checked={type === field.value}
          onClick={() => void helpers.setValue(type)}
        />
      ))}
    </div>
  );
}
