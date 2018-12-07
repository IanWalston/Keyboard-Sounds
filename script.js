
//strings with key types
var consonates = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'
var vowels = 'aeiouAEIOU'
var numbers = '0123456789'
var space = ' '
var specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"'

//soundHash, with an 'other' key for all keys pressed that are not assigned to a sound path
var soundHash = { other: 'sounds/808/percussion/808-Cowbell1.wav' }

//default sound
var soundProfiles = {}


//defining function that will assign each character to it's sound path in soundHash
assignSounds = (string, path) => {
    string.split('').forEach((i) => { soundHash[i] = path })
}

// setSoundProfile = (obj) => {
//     Object.keys(obj).forEach((i) => {assignSounds()})
// }

//assigning sound paths to characters
assignSounds(consonates, 'sounds/808/hihats/808-HiHats01.wav')
assignSounds(vowels, 'sounds/808/snares/808-Snare01.wav')
assignSounds(numbers, 'sounds/808/classic808/Warm808.wav')
assignSounds(space, 'sounds/808/kicks/808-Kicks01.wav')
assignSounds(specialCharacters, 'sounds/808/snares/808-Snare01.wav')

//console logging soundHash
console.log(soundHash)

//KEYPRESS EVENT
document.onkeydown = (e) => {

    if (soundHash.hasOwnProperty(e.key)) {
        var audioElement = document.createElement("audio")
        audioElement.setAttribute("src", soundHash[e.key])
        audioElement.play()
    }
    else {
        var audioElement = document.createElement("audio")
        audioElement.setAttribute("src", soundHash.other)
        audioElement.play()
    }

}//end of keypress event