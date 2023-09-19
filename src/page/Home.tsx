import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";

import { TaskType } from "../interface/TaskType";
import { Header } from "../components/Header";
import { Task } from "../components/Task";

import Clipboard from "../assets/clipboard.svg";

import style from "./Home.module.css";

export function Home() {
  const [tasks, setTask] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const [doneTask, setDoneTask] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTask([
      ...tasks,
      {
        description: newTaskText,
        isDone: false,
      },
    ]);

    setTotalTask((state) => {
      return state + 1;
    });

    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function handleChangeTaskStatus(description: string) {
    const taskHaveBeenDone = tasks.map((task) =>
      task.description === description
        ? { ...task, isDone: !task.isDone }
        : task
    );

    calculationTaskIsDone(taskHaveBeenDone);
    setTask(taskHaveBeenDone);
  }

  function calculationTaskIsDone(newArrayTask: TaskType[]) {
    const newCount = newArrayTask.reduce(
      (count, task) => (task.isDone ? count + 1 : count),
      0
    );

    setDoneTask(newCount);
  }

  function handleDeleteTask(description: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task.description !== description;
    });

    setTotalTask((state) => {
      return state - 1;
    });

    calculationTaskIsDone(taskWithoutDeletedOne)
    setTask(taskWithoutDeletedOne);
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <>
      <Header />

      <div className={style.wrapper}>
        <form onSubmit={handleCreateNewTask} className={style.createTaskForm}>
          <input
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit" disabled={isNewTaskEmpty}>
            <strong>Criar</strong>
            <PlusCircle size={16} />
          </button>
        </form>

        <div className={style.content}>
          <div className={style.info}>
            <div>
              <strong className={style.createdTask}>Tarefas Criadas</strong>
              <div className={style.count}>
                <strong>{totalTask}</strong>
              </div>
            </div>

            <div>
              <strong className={style.doneTask}>Tarefas Concluídas</strong>
              <div className={style.count}>
                <strong>
                  {doneTask} de {totalTask}
                </strong>
              </div>
            </div>
          </div>

          {tasks.length !== 0 ? (
            tasks.map((task) => (
              <div key={task.description} className={style.list}>
                <Task
                  task={task}
                  onDeleteTask={handleDeleteTask}
                  onChangeTaskStatus={handleChangeTaskStatus}
                />
              </div>
            ))
          ) : (
            <div className={style.empty}>
              <img src={Clipboard} />

              <div className={style.description}>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
