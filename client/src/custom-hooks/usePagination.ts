import { useHandleUrl } from 'context/HandleUrlContext';
import React, { ChangeEvent, useEffect, useState } from 'react';

export interface UsePagination {
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
}

export const usePagination = (): UsePagination => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { handlePagination, paramsFromUrl } = useHandleUrl();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    handlePagination({ page: newPage, rowsPerPage });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
    handlePagination({ page, rowsPerPage: Number(event.target.value) });
  };

  useEffect(() => {
    const { pagination } = paramsFromUrl;
    setPage(pagination.page);
    setRowsPerPage(pagination.rowsPerPage);
  }, [paramsFromUrl]);

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};
