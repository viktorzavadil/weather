import MainContent from "./MainContent";
import Header from "./Header";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    changeLoading = (value) => {
        console.debug(`[${App.name}] set loading state`, value);
        this.setState({
            loading: value
        });
    }

    render() {
        const { loading } = this.state;
        console.log("Render App", loading)
        return (
            <div className="App">
                <Header loading={loading}></Header>
                <MainContent onLoadingChange={this.changeLoading}></MainContent>
            </div>
        );

    }
}

export default App;
