import { Component } from "react";

import Button from "../../components/button/Button";
import Page from "../../components/page/Page";

interface HomePageProps {}

interface HomePageState {
  counter: number;
}

class HomePage extends Component<HomePageProps, HomePageState> {
  readonly state: HomePageState = { counter: 0 };

  setCounterValue = (increase: boolean) => {
    this.setState(({ counter }) => {
      const newValue = increase ? counter + 1 : counter - 1;
      return { counter: newValue };
    });
  };

  clearValue = () => {
    this.setState({ counter: 0 });
  };

  render() {
    return (
      <Page title="Home" noCard>
        <div className="container d-flex justify-content-center">
          <div className="card my-4  p-4 bg-white shadow text-center">
            <h5>Counter: {this.state.counter}</h5>
            <div className="d-flex justify-content-center flex-wrap gap-2">
              <Button onClick={() => this.setCounterValue(true)}>
                Increase +
              </Button>

              <Button
                color="secondary"
                onClick={() => this.setCounterValue(false)}
              >
                Decrease -
              </Button>

              <Button color="danger" onClick={this.clearValue}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default HomePage;
