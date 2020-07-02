import React from "react";
import IssueLabels from "./IssueLabels";
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
        <div className="display-flex">
          <p className="issue__summary">&nbsp;</p>
          <IssueLabels labels={fakeLabels.slice(0, upTo4)} />
        </div>
        <p className="issue__number">&nbsp;</p>
      </div>
    </div>
  );
}
