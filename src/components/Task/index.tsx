import { Check, Trash } from "@phosphor-icons/react";

import { TaskType } from "../../interface/TaskType";

import style from "./Task.module.css";

interface TaskProps {
  task: TaskType;
  onDeleteTask: (description: string) => void;
  onChangeTaskStatus: (description: string) => void;
}

export function Task({ task, onDeleteTask, onChangeTaskStatus }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.description);
  }

  function handleChangeTaskStatus() {
    onChangeTaskStatus(task.description);
  }

  return (
    <div className={style.task}>
      <button className={style.checkbox} onClick={handleChangeTaskStatus}>
        {task.isDone ? (
          <div className={style.checkContainerIsDone}>
            <Check />
          </div>
        ) : (
          <div className={style.checkContainerIsProgress} />
        )}
      </button>

      <span className={task.isDone ? style.taskDone : style.taskInProgress}>
        {task.description}
      </span>
      <button onClick={handleDeleteTask}>
        <Trash size={24} className={style.deleteIcon} />
      </button>
    </div>
  );
}
