import fs from 'fs/promises'

async function readLines(file_name) {
    try {
        const data = await fs.readFile(file_name, 'utf8')
        return data
    } catch (err) {
        console.log(err)
    }
}

export default {
    readLines
}
