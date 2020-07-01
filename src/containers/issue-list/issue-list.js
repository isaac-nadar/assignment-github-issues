import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getIssues, getRepoDetails } from "../../store/actions";

import FakeIssueList from "../../components/FakeIssueList";
import IssueList from "../../components/IssueList";
import "./issue-list.css";

function Header({ openIssuesCount, org, repo }) {
  if (openIssuesCount === -1) {
    return (
      <h1>
        Open issues for <OrgRepo org={org} repo={repo} />
      </h1>
    );
  } else {
    const pluralizedIssue = openIssuesCount === 1 ? "issue" : "issues";
    return (
      <h1>
        <span className="header__openIssues">{openIssuesCount}</span> open{" "}
        {pluralizedIssue} for <OrgRepo org={org} repo={repo} />
      </h1>
    );
  }
}

function OrgRepo({ org, repo }) {
  return (
    <span>
      <span className="header__org">{org}</span>
      {" / "}
      <span className="header__repo">{repo}</span>
    </span>
  );
}

export class IssueListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getIssues, getRepoDetails } = this.props;
    const { org, repo } = this.props.match.params;

    const currentPage = Math.max(
      1,
      parseInt(this.props.location.search, 10) || 1
    );

    getRepoDetails(org, repo);
    getIssues(org, repo, currentPage);
  }

  render() {
    const {
      org,
      repo,
      isLoading,
      issues,
      pageCount,
      openIssuesCount,
      issuesError,
      location,
    } = this.props;
    return (
      <div id="issue-list-page">
        <Header openIssuesCount={openIssuesCount} org={org} repo={repo} />
        {isLoading ? <FakeIssueList /> : <IssueList issues={issues} />}
      </div>
    );
  }
}

IssueListPage.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  openIssuesCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
};

const selectIssues = (issues) =>
  issues.currentPageIssues.map((number) => issues.issuesByNumber[number]);

const mapStateToProps = ({ issues, repo }, ownProps) => ({
  issues: selectIssues(issues),
  issuesError: issues.error,
  openIssuesCount: repo.openIssuesCount,
  isLoading: issues.isLoading,
  pageCount: issues.pageCount,
  org: ownProps.match.params.org,
  repo: ownProps.match.params.repo,
});

const mapDispatch = { getIssues, getRepoDetails };

export default connect(mapStateToProps, mapDispatch)(IssueListPage);
