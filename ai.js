import random from 'random'
import f from './files.js'

export function generateName(names) {
    if (names === {})
        // return undefined
        throw new Error('Empty names JSON object')

    if (names.first_names.length === 0 || names.second_names.length === 0)
        throw new Error('JSON object is empty')

    const first_name = pickRandom(names.first_names)
    const second_name = pickRandom(names.second_names)

    const name = first_name + ' ' + second_name

    return name
}

export function generateSentence(dictionary, n) {
    if (dictionary.length === 0 || n <= 0) throw new Error('Invalid arguments')

    let sentence_array = []
    for (let i = 0; i < n; i++) {
        let random_word = pickRandom(dictionary)
        for (let j = 0; j < i; j++) {
            if (random_word === sentence_array[j])
                random_word = pickRandom(dictionary)
        }
        sentence_array.push(random_word)
    }
    const sentence = sentence_array.join(' ')
    return sentence
}

function pickRandom(arr) {
    if (arr.length === 0) return ''
    return arr[random.int(0, arr.length - 1)]
}

export function generateSentence_v3(words_v3) {
    const adjective = pickRandom(words_v3.adjectives)
    const noun = pickRandom(words_v3.nouns)
    const verb = pickRandom(words_v3.verbs)
    const preposition = pickRandom(words_v3.prepositions)
    const adjective2 = pickRandom(words_v3.adjectives)
    const noun2 = pickRandom(words_v3.nouns)

    const sentence =
        adjective +
        ' ' +
        noun +
        ' ' +
        verb +
        ' ' +
        preposition +
        ' ' +
        adjective2 +
        ' ' +
        noun2
    return sentence
}

export default {
    generateName,
    generateSentence,
    generateSentence_v3,
}
