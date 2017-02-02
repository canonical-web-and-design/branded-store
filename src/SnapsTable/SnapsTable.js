import React, { PureComponent } from 'react'

import './SnapsTable.css'

class SnapsTableRow extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.id)
  }
  render() {
    const { icon, name, author, category } = this.props
    return (
      <tr
        key={`row-${name}`}
        className='SnapsTable-table-row'
        onClick={this.handleClick}
      >
        <td className='SnapsTable-name'>
          <img alt='' src={icon} width='41' />
          {' ' + name}
        </td>
        <td  className='SnapsTable-author'>By {author}</td>
        <td className='SnapsTable-category'>{category}</td>
      </tr>
    )
  }
}

class SnapsTable extends PureComponent {
  render() {
    const { snaps, title, onOpenSnap } = this.props
    return (
      <div className='SnapsTable'>
        {title && <h1 className='SnapsTable-header'>{title}</h1>}
        <table className='SnapsTable-table'>
          <thead>
            <tr className='SnapsTable-table-header'>
              <th>Name</th>
              <th>Publisher</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {snaps.map(({ id, icon, name, author, category })  => (
              <SnapsTableRow
                key={id}
                id={id}
                icon={icon}
                name={name}
                author={author}
                category={category}
                onClick={onOpenSnap}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SnapsTable
