import React, {useEffect} from 'react';
import SearchAppBar from "./Header";
import TaskList from "./ListTasks";
import {GetRequest} from "../../api/requests";

export const AllTaskList = React.createContext({
    tasks: [],
    setTasks: () => {}
})

export const Filter = React.createContext({
    filter: "",
    setFilter: () => {},
})

export const FilterChecked = React.createContext({
    checked: 0,
    setChecked: () => {},
})


export default function MainForm(){

    const [filter, setFilter] = React.useState("");
    const filterValue = {filter, setFilter};
    const [checked, setChecked] = React.useState(0);
    const checkedValue = {checked, setChecked};
    const [login, setLogin] = React.useState("");
    const [tasks, setTasks] = React.useState([]);
    const tasksValue = {tasks, setTasks};

    useEffect(() => {
        const GetUserTasks = (result) => {
            if (result.status === 200){
                let requestResult = JSON.parse(result.result);
                setTasks(requestResult);
            }
        }
        GetRequest(GetUserTasks, "issues/GetIssues", true);

        const GetLogin = (result) => {
            if (result.status === 200){
                setLogin(result.result);
            }
        }
        GetRequest(GetLogin, "auth/GetUserLogin", true);
    }, [])


    return (
        <div>
            <AllTaskList.Provider value={tasksValue}>
                <Filter.Provider value={filterValue}>
                    <FilterChecked.Provider value={checkedValue}>
                        <SearchAppBar login={login}/>
                        <TaskList username={login}/>
                    </FilterChecked.Provider>
                </Filter.Provider>
            </AllTaskList.Provider>
        </div>
    );
}

