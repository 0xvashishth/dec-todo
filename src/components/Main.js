import React, { Component } from "react";
import "./App.css";

import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demoModal: false,
            edittext: ""
        };
        this.toggle = this.toggle.bind(this);
        // this.myfun = this.myfun.bind(this);
    };
    toggle(val) {
      var items = this.props.taskList;  
      this.state.edittext = items[val.target.value]
      this.setState({demoModal: !this.state.demoModal});
    }

  render() {
    // function myfun(val){
    //   console.log("hii")
    //   // var e = this.toggle
    //   this.setState({demoModal: !this.state.demoModal});
    // }

    var items = this.props.taskList;
    var elements = [];
    for (var i = 1; i<= this.props.todocount ; i++) {
      if (!items[i]) {
        break;
      } else {
        elements[i] = React.createElement("tr", {}, [
          React.createElement("td", {}, items[i]),React.createElement("button", { class: "btn btn-danger", value: i , onClick: this.toggle.bind(this)  }, 'edit')
        ]);
      }
    }
    // console.log(items)1
    let etherAmount = this.props.ethBalance;
    etherAmount = window.web3.utils.fromWei(etherAmount, "Ether");
    // console.log(this.props.taskList)
    return (
      <div>
        <h2>Eth Balance : {etherAmount}</h2>
        <h3>Todo Count : {this.props.todocount}</h3>
        {/*<h4>a{this.props.taskList}</h4>*/}

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>List Iteams</th>
            </tr>
            <td>{elements}</td>
          </tbody>
        </table>

        <form
          className="mb-3"
          onSubmit={(event) => {
            event.preventDefault();
            let task_content;
            task_content = this.input.value;
            // console.log(task_content)
            this.props.addTask(task_content);
          }}
        >
          <br />
          <br />
          Enter New To do Item :
          <input
            ref={(input) => {
              this.input = input;
            }}
            className="form-control form-control-lg"
            name="task"
          />
          <br />
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
        <div>
        <button className="btn btn-primary btn-lg" onClick={ this.toggle}>Modal</button>
        <Modal scrollable={true} show={this.state.demoModal} fade={false} style={{ display: "block"}}>
                    <ModalHeader toggle={this.toggle}>
                        Edit ToDo Task
                    </ModalHeader>
                    <ModalBody>
                        <label>Edit Task Below</label><br/>
                        <input type="text" value={this.state.edittext} name="edittask" className="input form-input " />
                    </ModalBody>
                    <ModalFooter>
                      <button className="btn btn-primary">Submit</button>
                        <Button className="btn btn-secondary" onClick={ this.toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>    
        </div>
      </div>
    );
  }
}

export default Main;
