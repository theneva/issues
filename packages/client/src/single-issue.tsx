import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { IssueType } from './types';
import CharacterSummary from './character-summary';

type RouteParams = { id: string };
type Props = RouteComponentProps<RouteParams>;
type State = {
  loading: boolean;
  issue: IssueType | null;
};

class SingleIssue extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    issue: null,
  };

  componentDidMount() {
    fetch(`/api/issues/${this.props.id}`)
      .then(res => res.json())
      .then(issue => this.setState({ loading: false, issue }));
  }

  render() {
    const { loading, issue } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    if (issue == null) {
      return <div>Something went wrong</div>;
    }

    return (
      <>
        <h1>{issue.name}</h1>
        {issue.summary}
        <h2>Characters in this issue</h2>
        <ul>
          {issue.characters.map(character => (
            <li key={`issue-character-${character.id}`}>
              <CharacterSummary {...character} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default SingleIssue;
