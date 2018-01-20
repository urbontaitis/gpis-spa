import * as React from "react";
import { Header, Image, Container } from "semantic-ui-react";
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
      <div>
        <Header as="h1" image={true}>
          <Image src={logo} />
          <Header.Content>GPIS - unofficial</Header.Content>
        </Header>
        <Container>
          <Alerts isLoading={isLoading} alerts={alerts} />
        </Container>
      </div>
    );
  }
}
export default App;
