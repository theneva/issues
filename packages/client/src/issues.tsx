import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { IssueSummaryType } from './types';
import IssueSummary from './issue-summary';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  issues: IssueSummaryType[];
};

class Issues extends React.PureComponent<Props, State> {
  state: State = {
    loading: true,
    issues: [],
  };

  componentDidMount() {
    fetch('/api/issues')
      .then(res => res.json())
      .then(issues => this.setState({ loading: false, issues }));
  }

  render() {
    const { loading, issues } = this.state;

    if (loading) {
      return <div>Loading…</div>;
    }

    return (
      <>
        <h1>Issues</h1>
        <ul>
          {issues.map(issue => (
            <li key={`issue-${issue.id}`}>
              <IssueSummary {...issue} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Issues;
