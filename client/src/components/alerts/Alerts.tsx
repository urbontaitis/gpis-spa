import * as React from "react";

import Alert, { AlertObj } from "./Alert";

export interface AlertsProps {
  isLoading: boolean;
  alerts?: AlertObj[];
}

const Alerts: React.SFC<AlertsProps> = ({ isLoading, alerts }) => (
  <div className="alerts--fluid">
    <h2 className="alerts__header">Alerts</h2>
    <div className="alerts__content container-fluid">
      {isLoading
        ? "Loading"
        : alerts !== undefined
          ? alerts.map((alert: AlertObj) => (
              <Alert key={alert.title} alert={alert} />
            ))
          : "No alerts"}
    </div>
  </div>
);

export default Alerts;
