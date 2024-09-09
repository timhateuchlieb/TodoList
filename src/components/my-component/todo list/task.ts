export class Task {
  taskText: string;
  isChecked: boolean;
  test: number;

  constructor(taskText: string) {
    this.test = Math.random();
    this.taskText = taskText;
    this.isChecked = false;
  }
}
