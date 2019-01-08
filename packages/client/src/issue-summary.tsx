import * as React from 'react';
import { Link } from '@reach/router';

import { IssueSummaryType } from './types';
import './issue-summary.css';

type Props = IssueSummaryType;

const IssueSummary: React.FunctionComponent<Props> = ({
  id,
  name,
  released,
  summary,
}) => {
  const releaseDate = new Date(released);
  return (
    <div className="issue-summary">
      <h1 className="issue-summary__name">
        <Link to={`/issues/${id}`}>{name}</Link>
      </h1>
      <div>
        <time>
          {releaseDate.getFullYear()}-{releaseDate.getMonth()}-
          {releaseDate.getDate()}
        </time>
      </div>
      <p>{summary}</p>
    </div>
  );
};

export default IssueSummary;
