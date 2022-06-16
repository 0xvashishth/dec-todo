import React, { Component } from 'react'
import Web3 from 'web3'
import TodoList from '../abis/TodoList.json'
import Navbar from './Navbar'
import './App.css'
import Main from './Main.js'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    let taskList = [];
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    const networkId = await web3.eth.net.getId()
    if(TodoList.networks[networkId]){
      const todo = new web3.eth.Contract(TodoList.abi, TodoList.networks[networkId].address)   
      this.setState({todo})

      // Taking CountData
      let todocount = await todo.methods.taskCount().call()
      this.setState({ todocount: todocount.toString()})
      for(var i=1;i<=this.state.todocount;i++){
        const task = await todo.methods.tasks(i).call()
        if(task.content.toString() == ""){
          break;
        }
        else{
          // taskList[i] = task.id.toString()
          taskList[i] = task.content.toString()
          // console.log("Hello World")
          // console.log(task.id.toString())
        }
      }
      this.setState({taskList: taskList})
      // console.log(taskList)
      console.log(this.state.taskList)

    }
    else{
      window.alert('Contract Not Deployed')
    }

    // const task = await todoList.tasks(0)
    // const todoL = await TodoList.deployed()

    this.setState({ loading: false })

  }

  addTask = (tokenAmount) => {
    this.setState({ loading: true })
      this.state.todo.methods.createTask(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        window.location.reload(false);
    })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      todo: {},
      todocount: '0',
      ethBalance: '0',
      loading: true,
      taskList: []
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
        ethBalance={this.state.ethBalance}
        todocount={this.state.todocount}
        addTask={this.addTask}
        taskList={this.state.taskList}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://vasu-1.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;