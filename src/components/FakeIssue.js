import React from "react";
// import UserWithAvatar from "./UserWithAvatar";
import IssueLabels from "./IssueLabels";
// import noAvatar from "../images/no-avatar.png";
import "./Issue.css";

export default function FakeIssue() {
  const fakeLabels = [
    { id: 1, name: "loading...", color: "ccc" },
    { id: 2, name: "please wait", color: "ccc" },
    { id: 3, name: "coming soon", color: "ccc" },
    { id: 4, name: "thanks", color: "ccc" },
  ];

  const upTo4 = Math.floor(Math.random() * 5);

  return (
    <div className="issue issue--loading">
      <div className="issue__body-fake">
        <p className="issue__summary">&nbsp;</p>
        <IssueLabels labels={fakeLabels.slice(0, upTo4)} />
      </div>
    </div>
  );
}
