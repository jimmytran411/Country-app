import React from 'react';
import { TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { GenericObject } from 'common/commonTypes';

export type RenderContent<T> = (content: T) => JSX.Element;

export type Column<T> = {
  dataKey: string;
  label: string;
  renderContent?: RenderContent<T>;
  isSearchable: boolean;
  isSortable: boolean;
  handleSearch?: () => void;
};

export type TableHeaderProps<T> = {
  column: Column<T>[];
  onRequestSort: (sortParam: string) => void;
  orderBy: string;
  order: 'desc' | 'asc';
};

export const TableHeader = <T extends GenericObject>({
  column,
  orderBy,
  order,
  onRequestSort,
}: TableHeaderProps<T>): JSX.Element => {
  const createSortHandler = (dataKey: string, isSortable: boolean) => () => {
    if (isSortable) {
      onRequestSort(dataKey);
    }
  };
  return (
    <TableHead>
      <TableRow>
        {column.map(({ label, isSortable, dataKey }) => (
          <TableCell key={uuidv4()}>
            {isSortable ? (
              <TableSortLabel
                active={orderBy === dataKey}
                direction={orderBy === dataKey ? order : 'asc'}
                onClick={createSortHandler(dataKey, isSortable)}
              >
                {label.toUpperCase()}
              </TableSortLabel>
            ) : (
              label.toUpperCase()
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
