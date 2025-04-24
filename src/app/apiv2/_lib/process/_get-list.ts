import { spawn } from "child_process";
import { PROCESS } from "@/types/process";

export default async function _processGetList(): Promise<{ data: PROCESS[] }> {
  return new Promise((resolve, reject) => {
    // Spawn PM2 process to get JSON list
    const child = spawn("pm2", ["jlist"], { stdio: "pipe" });
    let stdout = "";
    let stderr = "";

    // Collect stdout data
    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    // Collect stderr data
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Handle process exit
    child.on("close", (code) => {
      if (code !== 0) {
        console.error(`PM2 process exited with code ${code}:`, stderr);
        return reject(new Error(`Process exited with code ${code}`));
      }

      try {
        // Parse the output into a valid JSON array
        const parsedData = parsePm2Output(stdout);

        // Return the parsed data
        resolve({ data: parsedData });
      } catch (error) {
        reject(error);
      }
    });

    // Handle process errors
    child.on("error", (err) => {
      reject(err);
    });

    // Add a timeout to prevent hanging
    setTimeout(() => {
      child.kill(); // Gracefully kill the child process if it takes too long
      reject(new Error("Process timed out"));
    }, 10000); // Timeout after 10 seconds
  });
}

/**
 * Helper function to parse PM2 output into a valid array of PROCESS objects.
 * @param rawOutput - Raw output from PM2 jlist command.
 * @returns An array of PROCESS objects.
 */
function parsePm2Output(rawOutput: string): PROCESS[] {
  // Add "[END]" to ensure regex can match properly
  const fullOutput = rawOutput + "[END]";

  // Use regex to extract JSON content between [ and ][END]
  const match = fullOutput.match(/\[([\s\S]*?)\]\[END\]/);

  if (!match) {
    // If no match is found, return an empty array
    return [];
  }

  try {
    // Wrap the extracted JSON in [] to make it a valid JSON array
    const jsonArray = JSON.parse(`[${match[1]}]`);

    // Ensure the parsed data matches the PROCESS type
    return jsonArray as PROCESS[];
  } catch (error) {
    throw new Error(`Failed to parse PM2 output: ${(error as Error).message}`);
  }
}
