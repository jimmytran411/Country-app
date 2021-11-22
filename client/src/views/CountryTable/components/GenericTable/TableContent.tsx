import React from 'react';
import { TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { RenderContent } from './TableHead';
import { GenericObject } from 'common/commonTypes';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:hover': {
      background: theme.palette.text.secondary,
    },
  },
}))(TableRow);

export type TableContentProps<T> = {
  data: T[];
  dataKeyList: (string | RenderContent<T>)[];
  page: number;
  rowsPerPage: number;
};

export const TableContent = <T extends GenericObject>({
  data,
  dataKeyList,
  page,
  rowsPerPage,
}: TableContentProps<T>): JSX.Element => {
  return (
    <TableBody>
      {!data.length && (
        <StyledTableRow>
          <TableCell align="center" colSpan={dataKeyList.length + 1}>
            {'No Country Found'}
          </TableCell>
        </StyledTableRow>
      )}
      {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(
        (element: any) => {
          return (
            <StyledTableRow key={uuidv4()}>
              {dataKeyList.map((dataKey) => (
                <TableCell key={uuidv4()}>
                  {typeof dataKey === 'string' ? element[dataKey].toLocaleString() : dataKey(element)}
                </TableCell>
              ))}
            </StyledTableRow>
          );
        }
      )}
    </TableBody>
  );
};
