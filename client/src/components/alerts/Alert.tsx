import * as React from "react";

export interface AlertObj {
  title: string;
  date: string;
  description: string;
}

export interface Alerts {
  alerts?: AlertObj[];
}

export interface AlertProps {
  alert: AlertObj;
}

const Alert: React.SFC<AlertProps> = ({ alert }) => (
  <div className="row">
    <div className="alert">
      <div className="col-xs-8 alert__date--box">
        <span className="alert__date">{alert.date}</span>
      </div>
      <div className="col-xs-4">
        <h1 className="alert__title">{alert.title}</h1>
        <p className="alert__description">{alert.description}</p>
      </div>
    </div>
  </div>
);

export default Alert;
