import React from 'react';
import { Paper, Table, TableContainer, TableFooter, TableRow, TableCell } from '@material-ui/core';

import { Column, TableHeader } from './TableHead';
import { TableContent } from './TableContent';
import { useSort } from 'custom-hooks/useSort';
import { TablePagination } from './TablePagination';
import { usePagination } from 'custom-hooks/usePagination';
import { GenericObject } from 'common/commonTypes';

export type TableProps<T> = {
  data: T[];
  column: Column<T>[];
};

export const GenericTable = <T extends GenericObject>({ data, column }: TableProps<T>): JSX.Element => {
  const { handleSort, order, orderBy, sortedData } = useSort(data);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const dataKeyList = column.map(({ dataKey, renderContent }) => (renderContent ? renderContent : dataKey));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader column={column} onRequestSort={handleSort} order={order} orderBy={orderBy} />
        <TableContent data={sortedData} dataKeyList={dataKeyList} page={page} rowsPerPage={rowsPerPage} />
        <TableFooter>
          <TableRow>
            <TableCell colSpan={column.length} align="center">
              <TablePagination
                count={data.length}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
