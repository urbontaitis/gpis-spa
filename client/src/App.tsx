import * as React from "react";

import { AlertObj } from "./components/alerts/Alert";
import Alerts from "./components/alerts/Alerts";
import api from "./api";

const logo = require("./logo.svg");

export interface AppProps {}

export interface AppState {
  alerts?: AlertObj[];
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    alerts: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    api.alerts
      .fetchAll("en")
      .then(response =>
        this.setState({
          alerts: response.data.alerts,
          isLoading: false
        })
      )
      .catch(err => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, alerts } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">GPIS - unofficial</h1>
        </header>
        <div className="app-intro">
          <Alerts isLoading={isLoading} alerts={alerts} />
        </div>
      </div>
    );
  }
}
export default App;
