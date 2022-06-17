import React, { Component } from "react";
import "./App.css";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModal: false,
      edittext: "",
      editid: "0",
    };
    this.toggle = this.toggle.bind(this);
    this.addToggle = this.addToggle.bind(this);
  }
  toggle(val) {
    var items = this.props.taskList;
    this.state.edittext = items[val.target.value];
    this.setState({ demoModal: !this.state.demoModal });
    this.setState({ editid: val.target.value });
  }

  addToggle(event) {
    event.preventDefault();
    let task_id;
    task_id = event.target.value;
    this.props.addToggle(task_id);
  }

  render() {
    var items = this.props.taskList;
    var completeditems = this.props.completedList;
    console.log(completeditems);
    var elements = [];
    var elementscompleted = [];

    for (var i = 1; i <= this.props.todocount; i++) {
      if (!items[i]) {
      } else {
        elements[i] = React.createElement("tr", {}, [
          React.createElement("td", {}, items[i]),
          React.createElement(
            "button",
            {
              class: "btn btn-primary btnedit",
              value: i,
              onClick: this.toggle.bind(this),
            },
            "edit"
          ),
          React.createElement(
            "button",
            {
              class: "btn btn-danger btnedit",
              value: i,
              onClick: this.addToggle.bind(this),
            },
            "Done"
          ),
        ]);
      }
    }
    for (var i = 1; i <= this.props.todocount; i++) {
      if (!completeditems[i]) {
      } else {
        elementscompleted[i] = React.createElement("tr", {}, [
          React.createElement("td", {}, completeditems[i]),
          React.createElement(
            "button",
            {
              class: "btn btn-danger btnedit",
              value: i,
              onClick: this.addToggle.bind(this),
            },
            "unDone"
          ),
        ]);
      }
    }
    let etherAmount = this.props.ethBalance;
    etherAmount = window.web3.utils.fromWei(etherAmount, "Ether");
    return (
      <div>
        <h4>Eth Balance : {etherAmount}</h4>
        <h4>Todo Count : {this.props.todocount}</h4>

        <form
          className="mb-3"
          onSubmit={(event) => {
            event.preventDefault();
            let task_content;
            task_content = this.input.value;
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
          <button type="submit" className="btn btn-primary btn-lg btnsubmit">
            Submit
          </button>
        </form>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Todo Iteams</th>
            </tr>
            <td>{elements}</td>
          </tbody>
        </table>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Completed Iteams</th>
            </tr>
            <td>{elementscompleted}</td>
          </tbody>
        </table>
        <div>
          <Modal
            scrollable={true}
            show={this.state.demoModal}
            fade={false}
            style={{ display: "block" }}
          >
            <ModalHeader toggle={this.toggle}>Edit ToDo Task</ModalHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                let new_task_content;
                new_task_content = this.input.value;
                let id = this.state.editid;
                // console.log(this.state.editid)
                // console.log(new_task_content)
                this.props.editTask(id, new_task_content);
              }}
            >
              <ModalBody>
                <label>Edit Task Below</label>
                <br />
                <input
                  type="text"
                  placeholder={this.state.edittext}
                  ref={(input) => {
                    this.input = input;
                  }}
                  name="edittask"
                  className="form-control"
                />
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <Button className="btn btn-secondary" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Main;
