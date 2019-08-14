function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Header = () => React.createElement("h1", { className: "pt-5 mt-5" }, "Pomodoro Clock");

const SetTimer = ({ type, value, handleClick }) =>
React.createElement("div", { id: `${type}-div` },
React.createElement("div", { id: `${type}-label` }, `${type === "session" ? "Session" : "Break"} Length`),
React.createElement("div", null,
React.createElement("a", { href: "#", id: `${type}-decrement`, className: "btn mx-1 btn-info btn-sm", role: "button", onClick: () => handleClick(false, `${type}Value`) }, React.createElement("i", { class: "fa fa-minus" })),
React.createElement("span", { id: `${type}-length` }, value),
React.createElement("a", { href: "#", id: `${type}-increment`, className: "btn mx-1 btn-info btn-sm", role: "button", onClick: () => handleClick(true, `${type}Value`) }, React.createElement("i", { class: "fa fa-plus" }))));




const Timer = ({ mode, time }) =>
React.createElement("div", { id: "timer", className: "d-flex flex-column mb-2 justify-content-center align-items-center rounded-circle" },
React.createElement("span", { id: "timer-label" }, mode === "session" ? "Session" : "Break"),
React.createElement("h2", { id: "time-left" }, time));



const Controls = ({ active, handleReset, handlePlayPause }) =>
React.createElement("div", { id: "controls", className: "d-flex justify-content-center" },
React.createElement("a", { href: "#", className: "btn btn-info btn-lg", id: "start_stop", onClick: handlePlayPause }, active ? React.createElement("i", { className: "fas fa-pause" }) : React.createElement("i", { className: "fas fa-play" })),
React.createElement("a", { href: "#", className: "btn btn-info btn-lg", role: "button", id: "reset", onClick: handleReset }, React.createElement("i", { className: "fas fa-history" })));



class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleSetTimers",





















    (inc, type) => {
      if (this.state[type] === 60 && inc) return;
      if (this.state[type] === 1 && !inc) return;
      this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({ breakValue: 5, sessionValue: 25, time: 25 * 60 * 1000, mode: "session", touched: false, active: false });
      clearInterval(this.pomodoro);
      this.audio.pause();
      this.audio.currentTime = 0;
    });_defineProperty(this, "handlePlayPause",

    () => {
      if (this.state.active) {
        this.setState({ active: false }, () => clearInterval(this.pomodoro));
      } else
      {
        if (!this.state.touched) {
          this.setState({ time: this.state.sessionValue * 60 * 1000, active: true, touched: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000));
        } else {
          this.setState({ active: true, touched: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000));
        }
      }
    });this.state = { breakValue: 5, sessionValue: 25, mode: "session", time: 25 * 60 * 1000, active: false, touched: false };}componentDidUpdate(prevProps, prevState) {if (prevState.time === 0 && prevState.mode === "session") {this.setState({ time: this.state.breakValue * 60 * 1000, mode: "break" });this.audio.play();}if (prevState.time === 0 && prevState.mode === "break") {this.setState({ time: this.state.sessionValue * 60 * 1000, mode: "session" });this.audio.play();}}

  render() {
    return (
      React.createElement("div", { className: "text-center container" },
      React.createElement(Header, null),
      React.createElement(SetTimer, { type: "session", value: this.state.sessionValue, handleClick: this.handleSetTimers }),
      React.createElement("div", { id: "timer-div", className: "d-flex flex-column align-items-center my-5" },
      React.createElement(Timer, { mode: this.state.mode, time: moment.utc(this.state.time).format("mm:ss") }),
      React.createElement(Controls, { active: this.state.active, handleReset: this.handleReset, handlePlayPause: this.handlePlayPause })),

      React.createElement(SetTimer, { type: "break", value: this.state.breakValue, handleClick: this.handleSetTimers }),
      React.createElement("audio", { id: "beep", src: "https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3", ref: el => this.audio = el })));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));