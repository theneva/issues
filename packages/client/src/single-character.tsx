import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { CharacterType, IssueSummaryType } from './types';
import IssueSummary from './issue-summary';

type RouteParams = { id: string };
type Props = RouteComponentProps<RouteParams>;

type Order = 'release' | 'story';
type State = {
  loading: boolean;
  character: CharacterType | null;
  order: Order;
};

function byRelease(left: IssueSummaryType, right: IssueSummaryType): number {
  return new Date(left.released).getTime() - new Date(right.released).getTime();
}

function byStory(left: IssueSummaryType, right: IssueSummaryType): number {
  return new Date(right.released).getTime() - new Date(left.released).getTime();
}

class SingleCharacter extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    character: null,
    order: 'release',
  };

  componentDidMount() {
    fetch(`/api/characters/${this.props.id}`)
      .then(res => res.json())
      .then(character => this.setState({ loading: false, character }));
  }

  render() {
    const { loading, character } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    if (character === null) {
      return <div>Something went wrong</div>;
    }

    const { order } = this.state;

    const compareIssues = order === 'release' ? byRelease : byStory;

    return (
      <>
        <h1>{character.name}</h1>
        <dl>
          <dt>Alias</dt>
          <dd>{character.alias}</dd>
          <dt>Description</dt>
          <dd>{character.description}</dd>
        </dl>
        <h2>Appears in issues</h2>
        <div>
          Order
          <div>
            <input
              id="order-release"
              type="radio"
              name="order"
              value="release"
              onChange={e => this.setState({ order: e.target.value as Order })}
              checked={order === 'release'}
            />
            <label htmlFor="order-release">Release</label>
          </div>
          <div>
            <input
              id="order-story"
              type="radio"
              name="order"
              value="story"
              onChange={e => this.setState({ order: e.target.value as Order })}
              checked={order === 'story'}
            />
            <label htmlFor="order-story">
              Story (actually just reverse order for now)
            </label>
          </div>
        </div>
        <ul>
          {character.issues.sort(compareIssues).map(issue => (
            <li key={`character-issue-${issue.id}`}>
              <IssueSummary {...issue} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default SingleCharacter;
