import * as React from "react";
import { List } from "semantic-ui-react";
import Alert, { AlertObj } from "./Alert";

export interface AlertsProps {
  isLoading: boolean;
  alerts?: AlertObj[];
}

const Alerts: React.SFC<AlertsProps> = ({ isLoading, alerts }) => (
  <List verticalAlign="middle">
    {isLoading
      ? "Loading"
      : alerts !== undefined
        ? alerts.map((alert: AlertObj) => (
            <List.Item>
              <List.Content verticalAlign="middle">
                <Alert key={alert.id} alert={alert} />
              </List.Content>
            </List.Item>
          ))
        : "No alerts"}
  </List>
);

export default Alerts;
