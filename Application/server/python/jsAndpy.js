const {PythonShell} = require('python-shell');

/*Python Script Path*/

var myPythonScript = "D:\\MIU\\Graduation Project\\ProjectFIN\\BreastCancerDetectionUsingPathology\\Application\\server\\python\\test.py";

/* path of the python executable, if python is available as environment variable then you can use only "python"*/

var pythonExecutable = "C:\\Users\\DELL\\AppData\\Local\\Programs\\Python\\Python38\\python.exe";

const { spawn } = require('child_process')

const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)

function run() {
  return new Promise((resolve, reject) => {
    const process = spawn(pythonExecutable, [myPythonScript, 'D:\\MIU\\Graduation Project\\TestX.jpg']);
    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );

    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      if (code !== 0) {
        reject(new Error(err.join('\n')))
        return
      }
      try {
        resolve(JSON.parse(out[0]));
      } catch(e) {
        reject(e);
      }
    });
  });
}
(async () => {
    try {
      const output = await run()
      logOutput('main')(output.message)
      process.exit(0)
    } catch (e) {
      console.error('Error during script execution ', e.stack);
      process.exit(1);
    }
  })();
  