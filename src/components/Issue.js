import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

// import UserWithAvatar from "./UserWithAvatar";
import IssueLabels from "./IssueLabels";
import { timeSince } from "../utils/stringUtils";
import {
  IssueOpenedIcon,
  CommentIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

import "./Issue.css";

const Issue = ({
  number,
  title,
  labels,
  user,
  summary,
  match,
  createdat,
  comments,
  pull_request,
}) => {
  const { org, repo } = match.params;
  const commentIcon = comments ? (
    <Link to={`/${org}/${repo}/issues/${number}`} className="comment-section">
      <CommentIcon /> {comments}
    </Link>
  ) : null;

  const pullRequestIcon = pull_request ? (
    <div className="tooltip">
      <GitPullRequestIcon /> 1
      <span className="tooltiptext">1 linked pull request</span>
    </div>
  ) : null;

  return (
    <div className="issue">
      <div className="issue__body">
        <div className="issue__body-icon">
          <IssueOpenedIcon />
        </div>

        <div className="issue-middle-section">
          <div className="display-flex">
            <Link to={`/${org}/${repo}/issues/${number}`}>
              <span className="issue__title">{title}</span>
            </Link>
            <IssueLabels labels={labels} />
          </div>

          <div className="issue__number">
            <span>#{number}</span>
            <span>{timeSince(new Date(createdat))} ago</span>
            <span>by {user.login}</span>
          </div>
        </div>

        <div className="issue__icon-group">
          <div>{pullRequestIcon}</div>
          <div>{commentIcon}</div>
        </div>
      </div>
    </div>
  );
};

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string,
  }).isRequired,
  summary: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Issue);
