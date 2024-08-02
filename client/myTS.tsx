import React, { ComponentProps } from "react";

interface TableP {
  myP: (index: number) => React.ReactNode;
}

const Table = (props: TableP) => {
  return <div>{[1, 2, 3].map(props.myP)}</div>;
};

<Table
  myP={(index) => {
    return <div key={index}>{index}</div>;
  }}
/>;

const abc = {
  primary: "a",
  second: "2",
};

type ButtomStyle = keyof typeof abc;

const presetSizes = {
  xs: "0.5rem",
  sm: "1rem",
};

type Size = keyof typeof presetSizes;

type LooseSize = Size | (string & {});

export const Icon = (props: { size: LooseSize }) => {
  return (
    <div
      style={{
        width:
          props.size in presetSizes
            ? presetSizes[props.size as Size]
            : props.size,
      }}
    />
  );
};

<>
  <Icon size="sm"></Icon>
  <Icon size="xs"></Icon>
  <Icon size="10px"></Icon>
</>;

const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
} as const;

type BackendStatus = keyof typeof BACKEND_TO_FRONTEND_STATUS_MAP;
type FrontendStatus = (typeof BACKEND_TO_FRONTEND_STATUS_MAP)[BackendStatus];

const btnPropsc = {
  type: "button",
  illegalProperty: "abc",
} satisfies ComponentProps<"button">;

<button {...btnPropsc}>click me</button>;

const type = btnPropsc.type;


type personName = "John" | "Jack" | "Justin";

type otherDetails = {
  id: number;
  age: number;
};


type personInfo = personName | otherDetails;

type Person = {
  myInfo: personInfo;
  myOtherInfo: personInfo;
};


const applicant:Person = {
  myInfo: "John",
  myOtherInfo: { id: 123, age: 22 },
}  ;

applicant.myOtherInfo = "John"