export interface ItemType {
  id: number;
  index: number;
  title: string;
  tag: String[];
  date: string;
  check: boolean;
}

export type StackNavigatorParamList = {
  list: undefined;
  edit:
    | {
        id: number;
        index: number;
        title: string;
        tag: String[];
        date: string;
        check: boolean;
      }
    | undefined;
};
