import * as React from "react";
import Box from "./Box";
import Results from "./Results";
import "./search.css";

interface IProps {
    getResults: (searchTerm: string) => Promise<any>,
    placeholder: string
}

interface IState {
    results: any[]
}

interface IResults {
    data: any[]
}

export default class Search extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            results: [props.placeholder]
        }
    }

    public async handleOnChange(e: { target: { value: string }}) {
        const results: IResults = await this.props.getResults(e.target.value);
        this.setState({results: results.data || [this.props.placeholder]});
    }

    public render() {
        return <div>
            <div className="search">
                <input placeholder="search" type="text" onChange={(e) => this.handleOnChange(e)} ></input>
            </div>

            <Box>
                <Results results={this.state.results}/>
            </Box>
        </div>
    }
} 