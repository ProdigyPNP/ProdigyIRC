"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const privileges = require("../../privileges.json");
const run = async (socket, _io, commands, player, args) => {
    const commandName = args[0];
    if (commandName) {
        const command = commands.find(command => command.name == commandName);
        if (!command)
            return socket.emit("ERR", `No command called ${commandName}`);
        socket.emit("SYS", `HELP - ${command.name}:\n\nDescription: ${command.props.help.description}\nUsage: ${command.props.help.usages.join(", ")}`);
    }
    else {
        socket.emit("SYS", "HELP\n\n" + commands
            .filter(command => player.privilege >= privileges[command.name])
            .map(command => `${command.name} - ${command.props.help.description}`).join("\n"));
    }
};
exports.run = run;
exports.help = {
    name: "help",
    description: "Opens help menu or gets info about a specific command.",
    usages: [
        "/help",
        "/help commandname"
    ]
};
