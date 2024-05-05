#!/usr/bin/env node

import chalkAnimation from 'chalk-animation'
import { input } from '@inquirer/prompts'
import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import boxen from 'boxen'
import Write_dependencies from './file'

const AppConfig = {
	name: 'NodeDevTable',
	doneMsg: '🎉 Your readme.md file in table added!',
}

const runApp = async () => {
	const mybox = boxen('👋 Hello, Dev Welcome to ' + AppConfig.name, {
		padding: 1,
	})
	chalkAnimation.karaoke(mybox, 1)

	// await new Promise((resolve) => setTimeout(resolve, 2000))

	const answer = await input({ message: 'Add a line number to the table ?' })
	const getLinenumber = Number(answer)

	if (getLinenumber) {
		try {
			const spinner = createSpinner('Collecting dependencies...').start()
			await new Promise((resolve) => setTimeout(resolve, 5000))
			await Write_dependencies(getLinenumber)
			const c_text = chalk.green(AppConfig.doneMsg)
			spinner.success({
				text: c_text,
			})
			process.exit(0)
		} catch (error: any) {
			console.log(chalk.red('😒Error:- ', error.message))
			process.exit(0)
		}
	} else {
		console.log(chalk.red('😒Error:- Please enter a valid number'))
	}
}

runApp()
