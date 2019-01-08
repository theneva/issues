import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { IssueSummaryType } from './types';
import IssueSummaryList from './issue-summary-list';

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
        <IssueSummaryList issues={issues} />
      </>
    );
  }
}

export default Issues;
