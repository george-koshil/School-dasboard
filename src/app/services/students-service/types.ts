export type StudentType = {
  Id: number;
  FirstName: string;
  SecondName: string;
  LastName: string;
};

export type RateItemType = {
  Id: number;
  Title: string;
  SchoolboyId: number;
  ColumnId: string;
};

export type FetchStudentsResponseType = {
  Items: StudentType[];
  Quantity: number;
};

export type FetchRateStudentsResponseType = {
  Items: RateItemType[];
  Quantity: number;
};

export type PinAsMissedParamsType = {
  SchoolboyId: number;
  ColumnId: number;
  Title?: string;
};

export type UnpinAsMissedParamsType = {
  SchoolboyId: number;
  ColumnId: number;
};
