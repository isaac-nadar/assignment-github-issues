import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getIssues, getRepoDetails } from "../../store/actions";
import Paginate from "react-paginate";

import FakeIssueList from "../../components/FakeIssueList";
import IssueList from "../../components/IssueList";
import "./issue-list.css";
import { IssueOpenedIcon } from "@primer/octicons-react";

function Header({ openIssuesCount, org, repo }) {
  const pluralizedIssue = openIssuesCount === 1 ? "issue" : "issues";
  return (
    <h1>
      Github {pluralizedIssue} of <OrgRepo org={org} repo={repo} />
    </h1>
  );
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
    this.state = {
      location: {
        search: "",
      },
    };
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

  handlePageChange = ({ selected }) => {
    const newPage = selected + 1;

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?page=${newPage}`,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getIssues, org, repo, location } = nextProps;

    // Fetch new issues whenever the page changes
    if (location.search !== prevState.location.search) {
      getIssues(org, repo, parseInt(location.search.slice(-1), 10) || 1);
      return {
        location: {
          search: location.search,
        },
      };
    }
    return null;
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

    if (issuesError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <div>{issuesError.toString()}</div>
        </div>
      );
    }

    const currentPage =
      Math.min(pageCount, Math.max(1, parseInt(location.search, 10) || 1)) - 1;

    return (
      <div id="issue-list-page">
        <Header openIssuesCount={openIssuesCount} org={org} repo={repo} />
        <div className="issues__header">
          <IssueOpenedIcon /> {openIssuesCount} Open
        </div>
        {isLoading ? <FakeIssueList /> : <IssueList issues={issues} />}
        <div className="issues__pagination">
          <Paginate
            forcePage={currentPage}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            nextLabel="&rarr;"
            previousLabel="&larr;"
          />
        </div>
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
