import React from "react";
import Box from "../components/Box";
import Search from "../components/Search";
import Title from "../components/Title";
import { searchTimezones } from "../services/search";

export default class TimezoneSearch extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.getResults.bind(this);
    }

    public async getResults(searchTerm: string): Promise<any> {
        return await searchTimezones(searchTerm);
    }

    public render() {
        console.log(this.getResults);
        return <div className="timezone-search">
            <Title text="Timezone Search"></Title>
            <Box>
                <Search getResults={this.getResults} placeholder="Start by searching in the search bar above!"/>
            </Box>
        </div>
    }
} 