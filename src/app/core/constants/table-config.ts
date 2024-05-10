import { Column } from '@core/enums/columnType';
import { IColumnConfig } from '@core/interfaces/table.interface';

export const HEADING = {
  recent: `Today's TODOS`,
  all: 'My Todo List',
};

export const COLUMNS_ALL: IColumnConfig[] = [
  {
    key: 'title',
    name: '',
    hasCheckbox: true,
    type: Column.TEXT,
  },
  {
    key: 'createdAt',
    name: 'Created At',
    type: Column.DATE,
  },
  {
    key: 'expireDate',
    name: 'Expire Date',
    type: Column.DATE,
  },
  {
    key: 'favorite',
    name: '',
    type: Column.FAVORITE,
  },
  {
    key: 'remove',
    name: '',
    type: Column.REMOVE,
  },
];

export const COLUMNS_TODAY: IColumnConfig[] = [
  {
    key: 'title',
    name: '',
    hasCheckbox: true,
    type: Column.TEXT,
  },
  {
    key: 'createdAt',
    name: 'Created At',
    type: Column.DATE,
  },
  {
    key: 'expireDate',
    name: 'Time left',
    type: Column.DATE,
    showLeftTime: true,
  },
  {
    key: 'favorite',
    name: '',
    type: Column.FAVORITE,
  },
  {
    key: 'remove',
    name: '',
    type: Column.REMOVE,
  },
];
