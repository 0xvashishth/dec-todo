import React, { Component } from 'react'
import './App.css'

class Main extends Component {
  


  render() {
  	var items = this.props.taskList
  	var elements = []
  	for(var i =1;;i++){
  		if(!items[i]){
          break;
        }
        else{
          elements[i] =React.createElement('tr', {},[ React.createElement('td', {}, items[i])] )
        }
  	}
  	// console.log(items)1
  	let etherAmount = this.props.ethBalance;
  	etherAmount = window.web3.utils.fromWei(etherAmount, 'Ether')
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
    			<td>

    			{elements}
    			</td>
    			</tbody>
    		</table>

    		<form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let task_content
                task_content = this.input.value
                // console.log(task_content)
                this.props.addTask(task_content)
            }}>
            <br/>
            <br/>
            Enter New To do Item :
    		<input ref={(input) => { this.input = input }}
                        className="form-control form-control-lg" name="task" />
                        <br/>
    		<button type="submit" className="btn btn-primary btn-lg">Submit</button>
    		</form>
    	</div>

    );
  }
}

export default Main;