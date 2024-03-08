import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";

interface Task {
    title: string;
    done: boolean;
    id: number;
}

export const Tasks: React.FC = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [tasks, setTasks] = useState([] as Task[]);

    function handleSubmitAddTask(event: FormEvent) {
        event.preventDefault();

        if (taskTitle.length < 3) {
            alert('Não é possível adicionar uma tarefa com menos de 3 letras.');
            return;
        }

        setTasks([
            ...tasks,
            {id: new Date().getTime(), title: taskTitle, done: false},
        ]);
        setTaskTitle('');
    }

    return (
        <section className={styles.container}>
            <form
                onSubmit={handleSubmitAddTask}
            >
                <div>
                    <label htmlFor="task-title">Adicionar Tarefa</label>
                    <input 
                     type="text"
                     value={taskTitle}
                     onChange={(event) => setTaskTitle(event.target.value)}
                     id="task-title" 
                     name="task-title" 
                     placeholder="Título da Tarefa"/>
                </div>
                <button type="submit">Adicionar tarefa</button>
            </form>
            <ul>
                {tasks.map(task => {
                    return(
                        <li key={task.id}>
                            <input type="checkbox" name="task" id={`task-${task.id}`}/>
                            <label htmlFor={`task-${task.id}`}>{task.title}</label>
                        </li>
                    );
                })}    
            </ul>
        </section>
    );
}