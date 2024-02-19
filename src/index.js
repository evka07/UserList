var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inquirer = require('inquirer');
var consola = require('consola');
var Action;
(function (Action) {
    Action["List"] = "list";
    Action["Add"] = "add";
    Action["Remove"] = "remove";
    Action["Edit"] = "edit";
    Action["Quit"] = "quit";
})(Action || (Action = {}));
var MessageVariant;
(function (MessageVariant) {
    MessageVariant["Success"] = "success";
    MessageVariant["Error"] = "error";
    MessageVariant["Info"] = "info";
})(MessageVariant || (MessageVariant = {}));
var Message = /** @class */ (function () {
    function Message(content) {
        this.content = content;
    }
    Message.prototype.show = function () {
        console.log(this.content);
    };
    Message.prototype.capitalize = function () {
        this.content =
            this.content.charAt(0).toUpperCase() +
                this.content.slice(1).toLocaleLowerCase();
    };
    Message.prototype.toUpperCase = function () {
        this.content = this.content.toUpperCase();
    };
    Message.prototype.toLowerCase = function () {
        this.content = this.content.toLowerCase();
    };
    Message.showColorized = function (option, content) {
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
                consola.warn("Unknown message variant: ".concat(option));
        }
    };
    return Message;
}());
var UsersData = /** @class */ (function () {
    function UsersData() {
        this.data = [];
    }
    UsersData.prototype.isValidAge = function (age) {
        return typeof age === 'number' && age > 0 && age < 121;
    };
    UsersData.prototype.isValidName = function (name) {
        return typeof name === 'string' && name.length > 0;
    };
    UsersData.prototype.showAll = function () {
        Message.showColorized(MessageVariant.Info, 'Users data');
        if (this.data.length === 0) {
            console.log('The database is feeling empty. No users to show!');
        }
        else {
            console.table(this.data);
        }
    };
    UsersData.prototype.add = function (user) {
        var age = user.age, name = user.name;
        if (this.isValidAge(age) && this.isValidName(name)) {
            this.data.push(user);
            Message.showColorized(MessageVariant.Success, 'User has been successfully added!');
        }
        else {
            Message.showColorized(MessageVariant.Error, 'Invalid user data. Please check and try again!');
        }
    };
    UsersData.prototype.remove = function (userName) {
        var userIndex = this.data.findIndex(function (user) { return user.name === userName; });
        if (userIndex === -1) {
            Message.showColorized(MessageVariant.Error, "Sorry, couldn't find the user. No changes made.");
        }
        else {
            this.data.splice(userIndex, 1);
            Message.showColorized(MessageVariant.Success, 'User deleted. Farewell!');
        }
    };
    UsersData.prototype.edit = function (userName, newUser) {
        var userIndex = this.data.findIndex(function (user) { return user.name === userName; });
        var age = newUser.age, name = newUser.name;
        if (userIndex === -1) {
            Message.showColorized(MessageVariant.Error, "Sorry, couldn't find the user. No changes made.");
        }
        else {
            if (this.isValidAge(age) && this.isValidName(name)) {
                this.data[userIndex].name = name;
                this.data[userIndex].age = age;
                Message.showColorized(MessageVariant.Success, 'User information updated!');
            }
            else {
                Message.showColorized(MessageVariant.Error, 'Invalid user data. Please check and try again!');
            }
        }
    };
    return UsersData;
}());
var users = new UsersData();
console.log("\n");
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
function startApp() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, _a, user, name_1, userName, newUser, availableCommands, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                name: 'action',
                                type: 'input',
                                message: 'Hello! How can I assist you today?',
                            },
                        ])];
                case 1:
                    answers = _b.sent();
                    _a = answers.action;
                    switch (_a) {
                        case Action.List: return [3 /*break*/, 2];
                        case Action.Add: return [3 /*break*/, 3];
                        case Action.Remove: return [3 /*break*/, 5];
                        case Action.Edit: return [3 /*break*/, 7];
                        case Action.Quit: return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 11];
                case 2:
                    users.showAll();
                    return [3 /*break*/, 12];
                case 3: return [4 /*yield*/, inquirer.prompt([
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
                    ])];
                case 4:
                    user = _b.sent();
                    users.add(user);
                    return [3 /*break*/, 12];
                case 5: return [4 /*yield*/, inquirer.prompt([
                        {
                            name: 'name',
                            type: 'input',
                            message: 'Sure thing! Please, enter the name of the user to remove:',
                        },
                    ])];
                case 6:
                    name_1 = _b.sent();
                    users.remove(name_1.name);
                    return [3 /*break*/, 12];
                case 7: return [4 /*yield*/, inquirer.prompt([
                        {
                            name: 'name',
                            type: 'input',
                            message: 'Alright! Please, enter the name of the user to edit:',
                        },
                    ])];
                case 8:
                    userName = _b.sent();
                    return [4 /*yield*/, inquirer.prompt([
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
                        ])];
                case 9:
                    newUser = _b.sent();
                    users.edit(userName.name, newUser);
                    return [3 /*break*/, 12];
                case 10:
                    Message.showColorized(MessageVariant.Info, 'Goodbye! Take care!');
                    return [2 /*return*/];
                case 11:
                    availableCommands = Object.values(Action).join(', ');
                    Message.showColorized(MessageVariant.Error, "Hmm, I didn't catch that. Available commands: ".concat(availableCommands));
                    return [3 /*break*/, 12];
                case 12:
                    startApp();
                    return [3 /*break*/, 14];
                case 13:
                    error_1 = _b.sent();
                    consola.error('An error occurred:', error_1.message);
                    startApp();
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
startApp();
