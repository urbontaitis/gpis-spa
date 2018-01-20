import * as React from "react";
import { Card } from "semantic-ui-react";

export interface AlertObj {
  id: string;
  title: string;
  date: string;
  description: string;
  url: string;
}

export interface Alerts {
  alerts?: AlertObj[];
}

export interface AlertProps {
  alert: AlertObj;
}

const Alert: React.SFC<AlertProps> = ({ alert }) => (
  <Card fluid={true}>
    <Card.Content>
      <Card.Header>{alert.title}</Card.Header>
      <Card.Meta>
        <span className="date">{alert.date}</span>
      </Card.Meta>
      <Card.Description>{alert.description}</Card.Description>
    </Card.Content>
  </Card>
);

export default Alert;
