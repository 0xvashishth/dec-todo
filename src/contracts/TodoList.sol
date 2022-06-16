// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * The TodoList contract
 */
contract TodoList {

	uint public taskCount = 0;


	struct Task {
	    uint id;
	    string content;
	    bool completed;
  	}

  	mapping(uint => Task) public tasks;

    constructor() public {
    	createTask("Check out my website https://vashishth.me/");
    }

    function createTask(string memory _content) public {
	    taskCount ++;
	    tasks[taskCount] = Task(taskCount, _content, false);
	    // emit TaskCreated(taskCount, _content, false);
  	}

  	// function gettaskCount() public view returns(uint){
	  //   return taskCount;
  	// }

  	// function getTask(uint _index) public view returns(string memory text){
  	// 	Task storage todo = tasks[_index];
  	// 	return todo.content;
  	// }

}
