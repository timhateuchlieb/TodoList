import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'list-item',
  styleUrl: 'list-item.css',
  shadow: true
})
export class ListItem {
  @Prop() task: string;

  render() {
    return (
      <div>
        <input type="checkbox"/><p>{this.task}</p> {}
      </div>
    );
  }
}
