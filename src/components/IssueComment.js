import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import UserWithAvatar from "./UserWithAvatar";
import { insertMentionLinks } from "../utils/stringUtils";
import { timeSince } from "../utils/stringUtils";

export default function IssueComment({ comment }) {
  return (
    <div class="display-flex mb-20">
      <div className="issue-detail__comment">
        <UserWithAvatar user={comment.user} orientation="horizontal" />
      </div>
      <div className="issue-detail__comment__body">
        <div className="comment-title">
          <span className="text-bold">{comment.user.login}</span> commented{" "}
          {timeSince(new Date(comment.created_at))} ago
        </div>
        <div className="comment-title-markdown">
          <ReactMarkdown
            className="markdown"
            source={insertMentionLinks(comment.body)}
          />
        </div>
      </div>
    </div>
  );
}

IssueComment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
    body: PropTypes.string,
  }).isRequired,
};
