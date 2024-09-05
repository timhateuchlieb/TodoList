import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'list-item',
  styleUrl: 'list-item.css',
  shadow: true,
})
export class ListItem {
  @Prop() task: string;
  @State() isChecked: boolean = false;

  handleCheckboxChange = () => {
    this.isChecked = !this.isChecked;
  };

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.isChecked}
          onChange={this.handleCheckboxChange}
        />
        <p class={this.isChecked ? 'completed' : ''}>{this.task}</p>
      </div>
    );
  }
}
