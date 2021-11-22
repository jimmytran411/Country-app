import React, { useState } from 'react';
import { makeStyles, Typography, Grid, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    paddingBottom: 18,
  },
}));

export type ExpandableContentProps = {
  contentTitle: string;
  content?: string;
  Component?: React.ComponentType<any>;
};

export const ExpandableContent: React.FC<ExpandableContentProps> = ({ contentTitle, content, Component }) => {
  const [expanded, setExpanded] = useState(false);

  const { expand, expandOpen, title } = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContent>
      <Grid container>
        <Grid className={title} item xs={4} onClick={handleExpandClick}>
          <Typography variant="body2" color="textSecondary" component="p">
            {contentTitle}
          </Typography>
        </Grid>
        <Grid item xs={7} onClick={handleExpandClick} />
        <Grid item xs={1} onClick={handleExpandClick}>
          <ExpandMoreIcon className={expanded ? expand : expandOpen} aria-expanded={expanded} aria-label="show more" />
        </Grid>
        <Grid item xs>
          {expanded && content}
          {expanded && Component && <Component />}
        </Grid>
      </Grid>
    </CardContent>
  );
};
