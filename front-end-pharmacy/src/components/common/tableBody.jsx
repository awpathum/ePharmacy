import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) {
            return column.content(item);
        }
        console.log(_.get(item,column.path))
        return _.get(item, column.path)
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }
    render() {
        const { data, columns } = this.props;
        console.log(data)
        return (
            <tbody>
                {data.map(item =>
                    <tr key={item.id}>
                        {columns.map(column => <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>)}
                    </tr>)}
            </tbody>
        );
    }
}

export default TableBody;