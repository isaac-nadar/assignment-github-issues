import React from "react";
import PropTypes from "prop-types";
import FakeIssue from "./FakeIssue";
import "./IssueList.css";

export default function FakeIssueList({ number = 25 }) {
  return (
    <ul className="issues">
      {Array.from(Array(number)).map((issue, i) => (
        <li key={i} className="issues__issue-wrapper">
          <FakeIssue />
        </li>
      ))}
    </ul>
  );
}

FakeIssueList.propTypes = {
  number: PropTypes.number,
};
