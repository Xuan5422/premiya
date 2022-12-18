import { Component } from 'react';
import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

/* class WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: 27,
            position: ''
         }   
    }
    
    nextYear = (someText) => {
        console.log(someText)
        this.setState(state => 
            ({years: state.years +1})
            )
                    
        console.log('+++')
    }

    commitInputChanges = (e) => {
        this.setState({
            position: e.target.value

        }) 
    }

    render() {
        const {name, surname, link} = this.props;
        return (

            <div>
                <button onClick={(e) => this.nextYear("Привет,я умный")}>+++</button>
                <h1>My name is {name}, surname - {surname}, 
                    age - {this.state.years}, 
                    position = {this.state.position}
                </h1>
                <a href={link}>My porfile</a>
                <form>
                    <span>Введите должность</span>
                    <input type="text" onChange={this.commitInputChanges}/>
                </form>
            </div>
        )
    }
} */

class App extends Component {

    constructor(props) {
       
        super(props);
        this.state = {
            data: 
            [
                {name: 'John C.', salary: 800, increase: false, like: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, like: false, id: 2},
                {name: 'Karl W.', salary: 5000, increase: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 3;
        
    }

    deleteItem = (id) => {
        this.setState(state => {
            return {
                data: state.data.filter(item => item.id !== id)
            }
                
            
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: ++this.maxId
        };

        this.setState({
            data: [...this.state.data, newItem]
        })
    }

    onToggleIncrease = (id) => {
        this.setState({
            data: this.state.data.map(item => {
                if(item.id === id) {
                    return {...item, increase: !item.increase}
                } else return item
            })
        })
        
    }

    onToggleRise = (id) => {
        this.setState(state => {
            return {
                data: state.data.map(item => {
                    if(item.id === id) {
                        return {...item, like: !item.like}
                    } else return item
                })
            }
        })
    }

    searchEmp = (items, term) => {
        if(term.length === 0) return items

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({
            term: term})
/*         console.log('this.state.term: ');
        console.log(this.state.term) */
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.like);
            case '1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }   
    }

    onFilterSelect = (filter) => {
        this.setState({
            filter: filter
        })
    }

    render() {
        const totalSalay = this.state.data.reduce((sum, item) => {
            return sum += item.increase},0);
        const visibleData = this.filterPost(this.searchEmp(this.state.data, this.state.term)
                                    , this.state.filter)
        return (
            <div className="app">
                <AppInfo 
                    totalImployees={this.state.data.length}
                    getSalary={totalSalay}/>
                
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={this.state.filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                    
                <EmployeesAddForm onAdd={this.addItem}/>

 
    
            </div>
        )
    }
}

export default App;