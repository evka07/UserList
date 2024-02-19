const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Edit = 'edit',
  Quit = 'quit',
}

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

type InquirerAnswers = {
  action: Action;
};

interface User {
  name: string;
  age: number;
}

class Message {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public show(): void {
    console.log(this.content);
  }

  public capitalize(): void {
    this.content =
      this.content.charAt(0).toUpperCase() +
      this.content.slice(1).toLocaleLowerCase();
  }

  public toUpperCase(): void {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase(): void {
    this.content = this.content.toLowerCase();
  }

  static showColorized(option: MessageVariant, content: string): void {
    switch (option) {
      case MessageVariant.Success:
        consola.success(content);
        break;
      case MessageVariant.Error:
        consola.error(content);
        break;
      case MessageVariant.Info:
        consola.info(content);
        break;
      default:
        consola.warn(`Unknown message variant: ${option}`);
    }
  }
}

class UsersData {
  private data: User[] = [];

  private isValidAge(age: number): boolean {
    return typeof age === 'number' && age > 0 && age < 121;
  }

  private isValidName(name: string): boolean {
    return typeof name === 'string' && name.length > 0;
  }

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');

    if (this.data.length === 0) {
      console.log('The database is feeling empty. No users to show!');
    } else {
      console.table(this.data);
    }
  }

  public add(user: User): void {
    const { age, name } = user;

    if (this.isValidAge(age) && this.isValidName(name)) {
      this.data.push(user);
      Message.showColorized(
        MessageVariant.Success,
        'User has been successfully added!'
      );
    } else {
      Message.showColorized(
        MessageVariant.Error,
        'Invalid user data. Please check and try again!'
      );
    }
  }

  public remove(userName: string): void {
    const userIndex: number = this.data.findIndex(
      user => user.name === userName
    );

    if (userIndex === -1) {
      Message.showColorized(
        MessageVariant.Error,
        "Sorry, couldn't find the user. No changes made."
      );
    } else {
      this.data.splice(userIndex, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted. Farewell!');
    }
  }

  public edit(userName: string, newUser: User): void {
    const userIndex: number = this.data.findIndex(
      user => user.name === userName
    );
    const { age, name } = newUser;

    if (userIndex === -1) {
      Message.showColorized(
        MessageVariant.Error,
        "Sorry, couldn't find the user. No changes made."
      );
    } else {
      if (this.isValidAge(age) && this.isValidName(name)) {
        this.data[userIndex].name = name;
        this.data[userIndex].age = age;
        Message.showColorized(
          MessageVariant.Success,
          'User information updated!'
        );
      } else {
        Message.showColorized(
          MessageVariant.Error,
          'Invalid user data. Please check and try again!'
        );
      }
    }
  }
}

const users = new UsersData();

console.log(`\n`);
console.info('???? Welcome to the UsersApp!');
console.log('====================================');
Message.showColorized(MessageVariant.Info, 'Available actions');
console.log('\n');
console.log('list – show all users');
console.log('add – add new user to the list');
console.log('remove – remove user from the list');
console.log('edit - edit user in the list');
console.log('quit – quit the app');
console.log('\n');

async function startApp() {
  try {
    const answers: InquirerAnswers = await inquirer.prompt([
      {
        name: 'action',
        type: 'input',
        message: 'Hello! How can I assist you today?',
      },
    ]);
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: "Great! Please, enter the user's name:",
          },
          {
            name: 'age',
            type: 'number',
            message: 'And the age, please:',
          },
        ]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message:
              'Sure thing! Please, enter the name of the user to remove:',
          },
        ]);
        users.remove(name.name);
        break;
      case Action.Edit:
        const userName = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: 'Alright! Please, enter the name of the user to edit:',
          },
        ]);
        const newUser = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: "What's the new name?",
          },
          {
            name: 'age',
            type: 'number',
            message: 'And the new age, please:',
          },
        ]);
        users.edit(userName.name, newUser);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, 'Goodbye! Take care!');
        return;
      default:
        const availableCommands = Object.values(Action).join(', ');
        Message.showColorized(
          MessageVariant.Error,
          `Hmm, I didn't catch that. Available commands: ${availableCommands}`
        );
        break;
    }

    startApp();
  } catch (error) {
    consola.error('An error occurred:', error.message);
    startApp();
  }
}

startApp();
