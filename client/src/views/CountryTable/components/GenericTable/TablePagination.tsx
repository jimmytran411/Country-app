import React from 'react';
import { createStyles, IconButton, makeStyles, Theme, Typography, useTheme, Grid } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';

import { UsePagination } from 'custom-hooks/usePagination';
import { useHandleUrl } from 'context/HandleUrlContext';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationProps extends UsePagination {
  count: number;
}

export const TablePagination = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationProps): JSX.Element => {
  const classes = useStyles1();
  const theme = useTheme();
  const { paramsFromUrl } = useHandleUrl();

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs>
        <Typography variant="subtitle1">Rows per Page: </Typography>
        <select
          onChange={(event) => handleChangeRowsPerPage(event)}
          defaultValue={paramsFromUrl.pagination.rowsPerPage}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </Grid>
      <Grid item xs>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        {`${rowsPerPage * (page + 1) > count ? count : rowsPerPage * (page + 1)} of ${count}`}
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
};
