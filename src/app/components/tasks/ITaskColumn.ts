import {ITaskItem} from "./ITaskItem";

export interface ITaskColumn {
  name: string ;
  status?:any ;
  list: Array<ITaskItem>;
}
