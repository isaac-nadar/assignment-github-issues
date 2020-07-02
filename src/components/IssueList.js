import React from "react";
import PropTypes from "prop-types";
import Issue from "./Issue";
import "./IssueList.css";

import { IssueOpenedIcon } from "@primer/octicons-react";

export default function IssueList({ issues, openCount }) {
  const issueList = openCount ? (
    <ul className="issues">
      {issues.map((issue) => (
        <li key={issue.id} className="issues__issue-wrapper">
          <Issue
            number={issue.number}
            user={issue.user}
            title={issue.title}
            summary={issue.body}
            labels={issue.labels}
            createdat={issue.created_at}
            comments={issue.comments}
            pull_request={issue.pull_request}
            url={issue.url}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className="issues no-issue-data">
      <IssueOpenedIcon size="medium" />
      <div class="no-issue-data-text">There aren’t any open issues.</div>
    </div>
  );

  return <div>{issueList}</div>;
}

IssueList.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
        gravatar_id: PropTypes.string,
      }).isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
      labels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          color: PropTypes.string,
        })
      ),
    })
  ),
};
