# Decentralize ToDo List

### Project Setup

- Create folder.
- Fire `truffle init` to initialize truffle project.
- Initialize git repository with `git init`.
- Add `package.json` file to this project and add below content.
	```json
	{
	    "name": "dec-todo",
	    "version": "1.0.0",
	    "description": "Blockchain Todo List Powered By Ethereum",
	    "main": "truffle-config.js",
	    "directories": {
	        "test": "test"
	    },
	    "scripts": {
	        "dev": "lite-server",
	        "test": "echo \"Error: no test specified\" && sexit 1"
	    },
	    "author": "gregory@dappuniversity.com",
	    "license": "ISC",
	    "devDependencies": {
	        "bootstrap": "4.1.3",
	        "chai": "^4.1.2",
	        "chai-as-promised": "^7.1.1",
	        "chai-bignumber": "^2.0.2",
	        "lite-server": "^2.3.0",
	        "nodemon": "^1.17.3",
	        "truffle": "5.0.5",
	        "web3": "^1.0.0-beta.55",
	        "truffle-contract": "3.0.6"
	    }
	}
	```
- Add `.gitignore` and add below content.
	```ActionScript
	# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
	# dependencies
	/node_modules
	/.pnp
	.pnp.js

	# testing
	/coverage

	# production
	/build

	# misc
	.DS_Store
	.env
	.env.local
	.env.development.local
	.env.test.local
	.env.production.local

	npm-debug.log*
	yarn-debug.log*
	yarn-error.log*
	```
- `npm install` to install dependencies.
- Add this snippet to solidity file.
	```solidity
	// SPDX-License-Identifier: MIT
	pragma solidity >=0.4.22 <0.9.0;
	```
- Add below snippet in `truffle-config.js`.
	```js
	module.exports = {
	  networks: {
	    development: {
	      host: "127.0.0.1",
	      port: 7545,
	      network_id: "*" // Match any network id
	    },
	  },
	  contracts_directory: './src/contracts/',
	  contracts_build_directory: './src/abis/',
	  compilers: {
	    solc: {
	      optimizer: {
	        enabled: true,
	        runs: 200
	      },
	      evmVersion: "petersburg"
	    }
	  }
	}
	```
- After adding .sol files.
- we need to do migrations in order to deploy on blockchain