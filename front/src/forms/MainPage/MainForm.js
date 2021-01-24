import React, {createContext} from 'react';
import SearchAppBar from "./Header";
import TaskList from "./ListTasks";

export const AllTaskList = React.createContext({
    tasks: [],
    setTasks: () => {}
})

export const Filter = React.createContext({
    filter: "",
    setFilter: () => {}
})

export default function MainForm(){
    const [tasks, setTasks] = React.useState([]);
    const tasksValue = {tasks, setTasks};

    const [filter, setFilter] = React.useState("");
    const filterValue = {filter, setFilter};

    return (
        <div>
            <AllTaskList.Provider value={tasksValue}>
                <Filter.Provider value={filterValue}>
                    <SearchAppBar />
                    <TaskList />
                </Filter.Provider>
            </AllTaskList.Provider>
        </div>
    );
}

