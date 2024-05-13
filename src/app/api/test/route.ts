import simpleGit, { SimpleGitOptions } from 'simple-git'
export async function GET() {

    const options: Partial<SimpleGitOptions> = {
        baseDir: process.cwd(),
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
     };

    const data = await new Promise((resolve, reject) => {
        const git = simpleGit(options);
        git.listRemote( ["--get-"],(err: any, data: any) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    });
    return new Response(JSON.stringify(data))
}

