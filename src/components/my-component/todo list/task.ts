export class Task {
  taskText: string;
  isChecked: boolean;

  constructor(taskText: string) {
    this.taskText = taskText;
    this.isChecked = false;
  }
}
