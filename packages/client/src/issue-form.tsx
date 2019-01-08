import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IssueType, IssueSummaryType } from './types';
import { format } from 'path';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Props = RouteComponentProps;
type State = {
  loadingIssues: boolean;
  issues: IssueType[];
  form: Omit<IssueType, 'id' | 'characters' | 'nextIssueId'>;
};

class IssueForm extends React.PureComponent<Props, State> {
  state: State = {
    loadingIssues: true,
    issues: [],

    form: {
      name: '',
      released: '',
      summary: '',
      previousIssueId: -1,
    },
  };

  componentDidMount() {
    fetch('/api/issues')
      .then(res => res.json())
      .then(issues => this.setState({ loadingIssues: false, issues }));
  }

  render() {
    const { loadingIssues, issues, form } = this.state;
    const { name, released, summary, previousIssueId } = form;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log({ form: this.state.form });
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={e =>
              this.setState({ form: { ...form, name: e.target.value } })
            }
          />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={e =>
              this.setState({ form: { ...form, summary: e.target.value } })
            }
          />
        </div>
        <div>
          <label htmlFor="released">Released</label>
          <input
            id="released"
            type="date"
            value={released}
            onChange={e =>
              this.setState({ form: { ...form, released: e.target.value } })
            }
          />
        </div>
        <div>
          <label htmlFor="previous-issue-id">Previous issue</label>
          <select
            value={previousIssueId}
            onChange={e =>
              this.setState({
                form: { ...form, previousIssueId: Number(e.target.value) },
              })
            }
          >
            {loadingIssues ? (
              <option disabled value="-1">
                Loading
              </option>
            ) : (
              issues.map(issue => (
                <option key={`issue-${issue.id}`} value={issue.id}>
                  {issue.name} ({issue.released})
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default IssueForm;
