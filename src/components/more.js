import React from 'react';
// import { Link } from 'react-router';
// import Paper from 'material-ui/Paper';

import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
// import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';



class More extends React.Component {


    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.handleBgroup=this.handleBgroup.bind(this);
        this.state = {
            donors: [],
            Blood: [],
            blood:'',
            value:1
        };

    }
    componentDidMount() {
           
        var O ='O-';
        // var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('Bloodgroup/'+this.state.blood).on('value', (data) => {
            var obj = data.val();
   console.log(this.state.array)
            console.log(obj)//every thing is ok till this line data is retrieve
            let dbarray = [];
            for (var prop in obj)

                dbarray.push(obj[prop])
            console.log(dbarray);
            this.setState({
                donors: dbarray
            })
        })
    }

  handleBgroup(e, key) {
    e.preventDefault();
    this.setState({
      value: key + 1,
      blood: e.target.childNodes[0].nodeValue
      
    })
    console.log(this.state.blood)
    // console.log(this.state.blood)

  }


    logout(ev) {
        ev.preventDefault();
        firebase.auth().signOut().then(function () {
            console.log('Sign-out successful.')

            browserHistory.push('/app')
        }, function (error) {
            // An error happened.
        })


    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Blood Bank"

                        // iconClassNameRight="muidocs-icon-navigation-expand-more"
                        iconElementRight={<FlatButton onClick={this.logout} label="Logout" />}
                    />
                    <DropDownMenu value={this.state.value} onChange={this.handleBgroup.bind(this)} ref="blood" style={{ width: 200 }} required="required">
                        <MenuItem value={1} primaryText="Blood Group" disabled />
                        <MenuItem value={2} primaryText="A+" />
                        <MenuItem value={3} primaryText="B+" />
                        <MenuItem value={4} primaryText="AB+" />
                        <MenuItem value={5} primaryText="O+" />
                        <MenuItem value={6} primaryText="O-" />
                        <MenuItem value={7} primaryText="AB-" />
                        <MenuItem value={8} primaryText="B-" />
                        <MenuItem value={9} primaryText="A-" />
                    </DropDownMenu>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>country</TableHeaderColumn>
                                <TableHeaderColumn>city</TableHeaderColumn>
                                <TableHeaderColumn>Area</TableHeaderColumn>
                                <TableHeaderColumn>Gender</TableHeaderColumn>
                                <TableHeaderColumn>Mobile#</TableHeaderColumn>
                                <TableHeaderColumn>Weight</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {this.state.donors.map((val, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableRowColumn key={i}>{i + 1}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.Country}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.city}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.area}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.gender}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.mobilenum}</TableRowColumn>
                                        <TableRowColumn key={i}>{val.weight}</TableRowColumn>

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>

        )
    }

}
export default More;