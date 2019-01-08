import * as React from 'react';
import { IssueSummaryType } from './types';
import IssueSummary from './issue-summary';

type Props = {
  issues: IssueSummaryType[];
};

type Order = 'release' | 'story';
type State = {
  order: Order;
};

function byRelease(left: IssueSummaryType, right: IssueSummaryType): number {
  return new Date(left.released).getTime() - new Date(right.released).getTime();
}

function sortByStory(issues: IssueSummaryType[]): IssueSummaryType[] {
  const firstIssue = issues.find(issue => issue.previousIssueId === null);

  if (firstIssue == null) {
    throw new Error('There is no first issue!');
  }

  const sorted: IssueSummaryType[] = [firstIssue];

  let currentIssue: IssueSummaryType = firstIssue;
  while (true) {
    const nextIssue = issues[currentIssue.nextIssueId - 1];

    if (nextIssue == null) {
      break;
    }

    sorted.push(nextIssue);
    currentIssue = nextIssue;
  }

  return sorted;
}

class IssueSummaryList extends React.PureComponent<Props, State> {
  state: State = {
    order: 'release',
  };

  render() {
    const { issues } = this.props;
    const { order } = this.state;

    const sortedIssues =
      order === 'release' ? issues.sort(byRelease) : sortByStory(issues);

    return (
      <div>
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
          {sortedIssues.map(issue => (
            <li key={`character-issue-${issue.id}`}>
              <IssueSummary {...issue} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default IssueSummaryList;
