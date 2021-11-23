import React, {Component} from 'react';

class StopWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            isStarted: false
        }
        this.timeoutId = null;
    }

    tick = () => {
        this.setState({count: this.state.count + 1})
        if (this.state.isStarted) {
            this.stop()
            this.start()
        }
    }

    start = () => {
        this.setState({isStarted: true})
        if (this.timeoutId === null) {
            this.timeoutId = setTimeout(this.tick, 1000);
        }
    }

    stop = () => {
        this.setState({isStarted: false})
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }

    reset = () => {
        this.stop();
        this.setState({count: 0})
    }

    componentDidMount() {
        this.start()
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        const {count} = this.state;
        return (
            <article>
                <h2>{count}</h2>
                <button onClick={this.start}>start</button>
                <button onClick={this.stop}>stop</button>
                <button onClick={this.reset}>reset</button>
            </article>
        );
    }
}

export default StopWatch;
