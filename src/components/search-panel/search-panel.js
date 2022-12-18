import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

onChangeSearch = (e) => {
    this.setState({
        term: e.target.value
    });
    this.props.onUpdateSearch(e.target.value)
}

    render () {
        return (
            <input 
                type="text"
                className="form-control seach-input" 
                placeholder="Найти сотрудника"
                value={this.state.term}
                onChange={this.onChangeSearch}/>
        )
    }
}

export default SearchPanel;