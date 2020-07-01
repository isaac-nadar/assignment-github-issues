import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import IssueLabels from "./IssueLabels";
import { Tooltip } from "react-tippy";
import { timeSince, formatDate, shorten } from "../utils/stringUtils";
import {
  IssueOpenedIcon,
  CommentIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

import "./Issue.css";
import "react-tippy/dist/tippy.css";

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
  url,
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

  const titleSummary = (
    <div className="summary-tooltip">
      <div className="org-repo-tooltip">
        {`${org}/${repo}`} on {formatDate(createdat)}
      </div>
      <div className="display-flex">
        <div className="summary-tooltip-icon">
          <IssueOpenedIcon />
        </div>
        <div className="summary-tooltip-data">
          <div className="margin-btm">
            <span className="issue__title-tooltip">{title}</span>{" "}
            <span>#{number}</span>
          </div>
          <div className="margin-btm">{shorten(summary)}</div>
          <IssueLabels labels={labels} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="issue">
      <div className="issue__body">
        <div className="issue__body-icon">
          <IssueOpenedIcon />
        </div>

        <div className="issue-middle-section">
          <div className="display-flex">
            <Tooltip interactive html={titleSummary} theme="light" delay="250">
              <Link to={`/${org}/${repo}/issues/${number}`}>
                <span className="issue__title">{title}</span>
              </Link>
            </Tooltip>
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
