/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec, ExecOptions } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

// Result type for command execution
interface CommandResult {
  stdout: string;
  stderr: string;
}

// Proper typing for options
interface CommandOptions extends ExecOptions {
  quiet?: boolean;
  noThrow?: boolean;
}

// API interface with Promise compatibility
interface CommandAPI extends Promise<CommandResult> {
  cwd(path: string): CommandAPI;
  env(vars: Record<string, string>): CommandAPI;
  quiet(): CommandAPI;
  noThrow(): CommandAPI;
  callback(callback: (stdout: string, stderr: string) => void): CommandAPI;
}

// Command builder with template literals
function $(strings: TemplateStringsArray, ...values: any[]): CommandAPI {
  // Combine template literal parts
  const command = strings.reduce((acc, str, i) => 
    acc + str + (values[i] || ""), "");
  
  // Configuration state
  const state = {
    cwdPath: undefined as string | undefined,
    envVars: undefined as Record<string, string> | undefined,
    options: {} as CommandOptions
  };
  // Execute function that runs when awaited
  async function execute(): Promise<CommandResult> {
    try {
      const execOptions: ExecOptions = {
        cwd: state.cwdPath,
        env: state.envVars ? { ...process.env, ...state.envVars } : undefined,
        ...state.options
      };
      
      const { stdout, stderr } = await execPromise(command, execOptions);
      
      // Handle output based on options
      if (!state.options.quiet && stdout) {
        console.log(stdout);
      }
      
      if (stderr && !state.options.quiet) {
        console.error(stderr);
      }
      
      if (stderr && !state.options.noThrow) {
        throw new Error(stderr);
      }
      
      return { stdout, stderr };
    } catch (error) {
      if (!state.options.noThrow) {
        throw error;
      }
      
      console.error("Command execution failed with noThrow enabled:", error);
      return { stdout: "", stderr: error as string };
    }
  }
  
  // Create base API object
  const api = {
    cwd(path: string) {
      state.cwdPath = path;
      return proxyApi;
    },
    
    env(vars: Record<string, string>) {
      state.envVars = vars;
      return proxyApi;
    },
    
    quiet() {
      state.options.quiet = true;
      return proxyApi;
    },
    
    noThrow() {
      state.options.noThrow = true;
      return proxyApi;
    },
    
    execute
  };
  
  // Create proxy with Promise compatibility
  const proxyApi = new Proxy(api, {
    get(target, prop) {
      // Handle Promise methods
      if (prop === 'then') {
        const promiseResult = execute();
        return promiseResult.then.bind(promiseResult);
      }
      if (prop === 'catch') {
        const promiseResult = execute();
        return promiseResult.catch.bind(promiseResult);
      }
      if (prop === 'finally') {
        const promiseResult = execute();
        return promiseResult.finally.bind(promiseResult);
      }
      
      return Reflect.get(target, prop);
    }
  }) as unknown as CommandAPI;
  
  return proxyApi;
}

export { $ }