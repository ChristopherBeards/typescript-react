import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Confrim from './Confirm';

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends Component<{}, IState> {
  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log('getDerivedStateFromProps', props, state);
    return null;
  }

  private timer: number = 0;
  private renderCount = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: 'Please hit the confirm button',
      confirmVisible: true,
      countDown: 10,
    };
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log('getSnapshoptBeforeUpdate', prevProps, prevState, {
      renderCount: this.renderCount,
    });
    return this.renderCount;
  }

  public componentDidUpdate(
    prevProps: {},
    prevState: IState,
    snapshot: number
  ) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot, {
      renderCount: this.renderCount,
    });
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  // * =========================================
  // *                  RENDER
  // * =========================================
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>Confirm</button>
        )}
        {this.state.countDown > 0 && (
          <Confrim
            open={this.state.confirmOpen}
            title="React and TypeScript with Redux"
            content="lorem ipsum dolar"
            acceptOption="Yass"
            exitOption="Overriding Props"
            onAcceptClick={this.handleAcceptClick}
            onExitClick={this.handleExitClick}
          />
        )}
      </div>
    );
  }

  // * Private Functions
  private handleConfirmClick = () => {
    this.setState({
      confirmOpen: true,
      confirmMessage: 'Very well, carry on...',
    });
    clearInterval(this.timer);
  };

  private handleAcceptClick = () => {
    this.setState({ confirmOpen: false });
    clearInterval(this.timer);
  };

  private handleExitClick = () => {
    this.setState({ confirmOpen: false, confirmMessage: 'Take a break...' });
    clearInterval(this.timer);
  };

  private handleTimerTick = () => {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button: ${
          this.state.countDown
        } secs to go`,
        countDown: this.state.countDown - 1,
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: 'Too late to confirm!',
            confirmVisible: false,
          });
        }
      }
    );
  };
}

export default App;
