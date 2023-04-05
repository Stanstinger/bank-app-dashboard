import React from "react";
import BarChart from "../../components/BarChart";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import "./index.css";

const Analytics = ({ account }) => {
  return (
    <div className="analytics-container">
      {/* ROW ONE */}
      <div className="header">
        <Header
          title="Analytics"
          subtitle="Track all your finances and analysis in one go."
        />
      </div>

      {/* ROW TWO*/}

      <div className="bar__chart-container">
        <div>
          <span className="sub-heading">Monthly income projections.</span>
        </div>
        <div className="bar-chart">
          <BarChart account={account} />
        </div>
      </div>
      <div className="pie__chart-container">
        <div>
          <span className="sub-heading">Account Summary.</span>
        </div>
        <div className="pie-center">
          <div className="pie-chart">
            <PieChart transactions={account.transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
