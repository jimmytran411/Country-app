import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { CssTextField } from './SearchField';
import { useHandleUrl } from 'context/HandleUrlContext';

const useStyles = makeStyles(() => ({
  select: {
    width: '90%',
    height: '100%',
    backgroundColor: 'inherit',
    color: 'inherit',
  },
}));

export type FilterInput = {
  population: number;
  populationOperator: 'Greater' | 'Less';
  language: string;
};

export const FilterForm: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm<FilterInput>();
  const { select } = useStyles();
  const history = useHistory();
  const { handleFilter, paramsFromUrl } = useHandleUrl();

  const onSubmit: SubmitHandler<FilterInput> = ({ population, populationOperator: operator, language }) => {
    handleFilter({ population, language, populationOperator: operator ? operator : 'Greater' });
  };

  const clearFilter = () => {
    setValue('population', 0);
    setValue('language', '');
    setValue('populationOperator', 'Greater');
    handleFilter({ population: 0, language: '', populationOperator: 'Greater' });
    history.push('/');
  };

  React.useEffect(() => {
    const { filterInput } = paramsFromUrl;
    const { population, language, populationOperator } = filterInput;
    setValue('population', population);
    setValue('language', language);
    setValue('populationOperator', populationOperator);
  }, [setValue, paramsFromUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs>
          <Grid container justifyContent="center">
            <Grid item xs={4}>
              <Controller
                name="populationOperator"
                control={control}
                render={({ field }) => (
                  <select className={select} {...field}>
                    <option value="Greater">Greater Than</option>
                    <option value="Less">Less than</option>
                  </select>
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="population"
                control={control}
                defaultValue={0}
                render={({ field }) => <CssTextField label="Population" variant="outlined" fullWidth {...field} />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Controller
            name="language"
            control={control}
            defaultValue=""
            render={({ field }) => <CssTextField label="Languages" variant="outlined" fullWidth {...field} />}
          />
        </Grid>
        <Grid item xs>
          <Grid container justifyContent="space-between">
            <Grid item xs>
              <Button type="submit" variant="outlined">
                Filter
              </Button>
            </Grid>
            <Grid item xs>
              <Button onClick={clearFilter} variant="outlined" color="secondary">
                Clear Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
