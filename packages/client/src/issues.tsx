import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IssueSummary } from './types';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  issues: IssueSummary[];
};

class Issues extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    issues: [],
  };

  componentDidMount() {
    fetch('/api/issues')
      .then(res => res.json())
      .then(issues => this.setState({ issues }));
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
            <li key={`issue-${issue.id}`}>{JSON.stringify(issue)}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Issues;
