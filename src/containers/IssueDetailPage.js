import React, { Component } from "react";
import PropTypes from "prop-types";
import { getIssue, getComments } from "../store/actions";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { insertMentionLinks } from "../utils/stringUtils";
import UserWithAvatar from "../components/UserWithAvatar";
import IssueComments from "../components/IssueComments";
import "./IssueDetailPage.css";
import { timeSince } from "../utils/stringUtils";
import { IssueOpenedIcon } from "@primer/octicons-react";

const IssueState = ({ issue: { state } }) => (
  <span className={`issue-detail__state issue-detail__state--${state}`}>
    <IssueOpenedIcon />
    <span class="margin-left">{state}</span>
  </span>
);

const IssueNumber = ({ issue }) => (
  <span className="issue-detail__number">#{issue.number}</span>
);

export class IssueDetailPage extends Component {
  state = {
    issue: "",
  };

  componentDidMount() {
    if (!this.props.issue) {
      this.props.getIssue();
    } else {
      this.props.getComments(this.props.issue);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.issue !== prevState.issue) {
      nextProps.getComments(nextProps.issue);
      return {
        issue: nextProps.issue,
      };
    }
    return null;
  }

  renderComments() {
    const { issue, comments, commentsError } = this.props;

    if (commentsError) {
      return (
        <div className="issue-detail--comments-error">
          There was a problem fetching the comments.
        </div>
      );
    }

    if (issue.comments === 0) {
      return <div className="issue-detail--no-comments">No comments</div>;
    }

    if (!comments || comments.length === 0) {
      return (
        <div className="issue-detail--comments-loading">
          Comments loading...
        </div>
      );
    }

    return <IssueComments comments={comments} />;
  }

  renderContent() {
    const { issue } = this.props;

    return (
      <div className="issue-detail">
        <h1 className="issue-detail__title">
          {issue.title} <IssueNumber issue={issue} />
        </h1>
        <div className="issue-detail__meta">
          <IssueState issue={issue} />
          <span class="detail-issue-user">{issue.user.login} </span>
          <span>
            opened this issue {timeSince(new Date(issue.created_at))} ago
          </span>
        </div>

        <hr className="divider--short mb-20" />

        <div class="display-flex mb-20">
          <div className="issue-detail__comment">
            <UserWithAvatar user={issue.user} orientation="horizontal" />
          </div>
          <div className="issue-detail__comment__body">
            <div className="comment-title">
              <span className="text-bold">{issue.user.login}</span> commented{" "}
              {timeSince(new Date(issue.created_at))} ago
            </div>
            <div className="comment-title-markdown">
              <ReactMarkdown
                className="markdown"
                source={insertMentionLinks(issue.body)}
              />
            </div>
          </div>
        </div>
        {this.renderComments()}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="issue-detail--loading">
        <p>Loading issue #{this.props.match.params.issueId}...</p>
      </div>
    );
  }

  render() {
    const { issue, issueError, match } = this.props;

    if (issueError) {
      return (
        <div className="issue-detail--error">
          <h1>There was a problem loading issue #{match.params.issueId}</h1>
          <p>{issueError.toString()}</p>
        </div>
      );
    }

    return (
      <div>
        {issue && this.renderContent()}
        {!issue && this.renderLoading()}
      </div>
    );
  }
}

IssueDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
  issue: PropTypes.object,
  issueError: PropTypes.object,
  comments: PropTypes.array,
  commentsError: PropTypes.object,
  getIssue: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
};

const mapState = ({ issues, commentsByIssue }, ownProps) => {
  const issueNum = ownProps.match.params.issueId;
  return {
    issue: issues.issuesByNumber[issueNum],
    issueError: issues.error,
    comments: commentsByIssue[issueNum],
    commentsError: commentsByIssue["error"],
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const { org, repo, issueId } = ownProps.match.params;
  return {
    getIssue: () => dispatch(getIssue(org, repo, issueId)),
    getComments: (issue) => {
      return dispatch(getComments(issue));
    },
  };
};

export default connect(mapState, mapDispatch)(IssueDetailPage);
