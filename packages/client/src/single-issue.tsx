import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Issue } from './types';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  issue: Issue | null;
};

class SingleIssue extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    issue: null,
  };

  render() {
    return <div>Issue</div>;
  }
}

export default SingleIssue;
