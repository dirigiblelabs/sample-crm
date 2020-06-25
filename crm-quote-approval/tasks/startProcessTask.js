var process = require("bpm/v4/process");
var execution = process.getExecutionContext();

console.warn("Start Process Task>>>");
var quote = JSON.parse(process.getVariable(execution.getId(), "entity"));

console.warn("Start Process Task Quote: " + JSON.stringify(quote));

process.setVariable(execution.getId(), "amount", quote.Ammount);
