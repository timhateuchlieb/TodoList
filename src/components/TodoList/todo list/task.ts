export class Task {
  taskText: string;
  isChecked: boolean;
  completedAt?: number;

  constructor(taskText: string) {
    this.taskText = taskText;
    this.isChecked = false;
    this.completedAt = undefined;
  }
}
