const streamFetch = async ({ url, body, onTextLog }: { url: string, body: any, onTextLog: (text: string) => void }) => {
    onTextLog("loading ...\n")
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(body) })
    const reader: any = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader?.read();
        if (done) break;
        // setTextLog(prev => prev + decoder.decode(value))
        onTextLog(decoder.decode(value))
    }
}

export default streamFetch