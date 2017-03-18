import React from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { TextField, Toggle, FlatButton, FontIcon, IconButton } from 'material-ui';


export default class ListTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: false,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 'auto',
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event) {
    this.setState({ height: event.target.value });
  };

  _linkHandler2(event) {
    alert('_linkHandler2');
  }

  _approvalIcon(isPass) {
    let color = "#757575"
    let hoverColor = "#EF5350"
    let id = (isPass ? 'thumb_up' : 'thumb_down')
    return <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>{id}</FontIcon>;
  }
  _newFontIcon(id) {
    let color = "#00838F"
    let hoverColor = "#EF5350"
    return <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>{id}</FontIcon>;
  }

  render() {
    return (
      <div className="admin-list">
        <div className="admin-list">
          <Table style={{ tableLayout: 'auto' }}
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >

              <TableRow>
                <TableHeaderColumn className='admin-list-col-160' tooltip="Sort">
                  <FlatButton icon={this._newFontIcon("arrow_downward")} label={'Word'} labelPosition="before"
                    onTouchTap={this._linkHandler2.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-40' tooltip="">Plural</TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-40' tooltip="">
                  <FlatButton label={'Sex'} labelPosition="before"
                    onTouchTap={this._linkHandler2.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn style={{ textAlign: 'center' }}>Zh</TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-40' tooltip="" >
                  <FlatButton label={'Regel'} labelPosition="before"
                    onTouchTap={this._linkHandler2.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn tooltip="">Recommend</TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-180' tooltip="">
                  <FlatButton icon={this._newFontIcon("arrow_downward")} label={'Status'} labelPosition="before"
                    onTouchTap={this._linkHandler2.bind(this)} />
                </TableHeaderColumn>



              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.props.resource.map((row, index) => (
                <TableRow key={index} selected={row.selected}>

                  <TableRowColumn className='admin-list-col-150' tooltip="dgdgfdgfdg">{row.wort}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-40'>{row.plural}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-40'>{row.wortsex}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-200'>{row.zh} - {row.en}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-40'>{row.isregel}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-25'>{row.isrecommend}</TableRowColumn>
                  <TableRowColumn className='admin-list-col-180'>
                    {row.status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <IconButton tooltip="Font Icon" onTouchTap={this._linkHandler2.bind(this)}>
                      {this._approvalIcon(true)}
                    </IconButton>

                    <IconButton tooltip="Font Icon" onTouchTap={this._linkHandler2.bind(this)}>
                      {this._approvalIcon(false)}
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton tooltip="Font Icon" onTouchTap={this._linkHandler2.bind(this)}>
                      {this._newFontIcon("edit")}
                    </IconButton>

                  </TableRowColumn >

                </TableRow>

              ))}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn>Name</TableRowColumn>
                <TableRowColumn>Status</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                  Super Footer
              </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className='admin-list-setting'>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange.bind(this)}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle.bind(this)}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle.bind(this)}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle.bind(this)}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle.bind(this)}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>
      </div>
    );
  }
}