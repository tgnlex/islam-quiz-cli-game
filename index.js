#!/usr/bin/env node  
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Welcome to my JS Islam Quiz! \n`
  );

  await sleep();
  rainbowTitle.stop();

  console.log(  
    `${chalk.bgBlue('INSTRUCTIONS')}\n
    Welcome to my Islam Quiz Console Game.\n
    The concept is pretty straightforward. \n
    You will receive questions about Islam \n
    In multiple choice format. \n\n

    In this Game we follow the GetItRight \n 
    protocol (G.I.R). G.I.R is based on one \n
    fundamental equation:\n 
    ${chalk.bgRed('wrong answer = DEATH')} \n
    So don't be wrong if you want to succeed. \n
    May Allah (s.w.t) have mercy, we'll need it. \n
    
`);
}
async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Correct, ${playerName}. You may proceed`})
  } else {
    spinner.error({ text: `Wrong, better luck next time ${playerName}!`})
    process.exit(1);
  }
}
async function getname() {
  const answers = await inquirer.prompt({
    name: 'player',
    type: 'input',
    message: 'Enter your name.',
    default() {
      return 'Anon';
    }
  });

  playerName = answers.player;
}

async function level_1() {
  const answers = await inquirer.prompt({
    name: 'Q1',
    type: 'list',
    message: 'What does a muslim say after mentioning one of the prophets?',
    choices: [
        'Amin',
        'Allahu Akbar',
        'Peace be upon him',
        'Mashallah',
    ],
  });

  return handleAnswer(answers.Q1 === 'Peace be upon him');
}

async function level_2() {
  const answers = await inquirer.prompt({
    name: 'Q2',
    type: 'list',
    message: 'How many prayers a day are required in Islam?',
    choices: [
        '6',
        '4',
        '3',
        '5',
    ],
  });
  return handleAnswer(answers.Q2 == '5');
}
async function level_3() {
  const answers = await inquirer.prompt({
    name: 'Q3',
    type: 'list',
    message: 'What is the name of the second Surah in the Quran?',
    choices: [
        'Al-Fatiha',
        'Al-Baqarah',
        'Ma-Idah',
        'Isha',
    ],
  });
  return handleAnswer(answers.Q3 === 'Al-Baqarah');
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}, you've passed the Quiz!`
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  });
}
console.clear();
await welcome();
await getname();
await level_1();
await level_2();
await level_3();
winner();