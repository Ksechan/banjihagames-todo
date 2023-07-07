export interface ItemType {
  id: number;
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
        title: string;
        tag: String[];
        date: string;
        check: boolean;
      }
    | undefined;
};
