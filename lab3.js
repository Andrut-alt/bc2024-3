const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>, the path of the json file for reading')
  .option('-o, --output <path>, the path of file with output')
  .option("-d, --display, show the result ")


program.parse(process.argv);
const options = program.opts();

if (!options.input){
  console.error("Please specify input file")
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf8')
const parsed_data = JSON.parse(data);


const formatted_result = parsed_data.map(item => {
  return `${item.exchangedate}:${item.rate}`;
}).join('\n'); 

if (options.display) {
  console.log(formatted_result);
}

if (options.output){
  fs.writeFileSync(options.output, formatted_result, 'utf8' )
  console.log(`Results are saved into ${options.output}`);
}

if (!options.output && !options.display) {
  process.exit(0);
}