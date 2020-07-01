import React from "react";
import PropTypes from "prop-types";
import UserWithAvatar from "./UserWithAvatar";
import { insertMentionLinks } from "../utils/stringUtils";
import ReactMarkdown from "react-markdown";

export default function IssueComment({ comment }) {
  return (
    <div className="issue-detail__comment">
      <UserWithAvatar user={comment.user} orientation="horizontal" />

      <div className="issue-detail__comment__body">
        <ReactMarkdown
          className="markdown"
          source={insertMentionLinks(comment.body)}
        />
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
