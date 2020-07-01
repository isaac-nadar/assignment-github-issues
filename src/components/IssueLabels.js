import React from "react";
import PropTypes from "prop-types";

import { getContrastYIQ } from "../utils/stringUtils";

const IssueLabels = ({ labels }) => (
  <div className="issue__labels">
    {labels.map((label) => (
      <span
        key={label.id}
        title={label.description}
        className="issue__label"
        style={{
          backgroundColor: `#${label.color}`,
          color: getContrastYIQ(`#${label.color}`),
        }}
      >
        {label.name}
      </span>
    ))}
  </div>
);

IssueLabels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default IssueLabels;
