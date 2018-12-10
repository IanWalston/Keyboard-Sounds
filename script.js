const consonates = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'
const vowels = 'aeiouAEIOU'
const numbers = '0123456789'
const evens = '02468'
const odds = '13579'
const space = ' '
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"'
const alpha = consonates + vowels
const allCharacters = alpha + numbers + space + specialCharacters


const paths = {
    kick: 'sounds/808/kicks/808-Kicks01.wav',
    snare: 'sounds/808/snares/808-Snare01.wav',
    hat: 'sounds/808/hihats/808-HiHats01.wav',
    bell: 'sounds/808/percussion/808-Cowbell1.wav',
    weird: 'sounds/808/classic808/Warm808.wav',
    scifi: 'sounds/808/classic808/Sci Fi Hit.wav',
    maraca1: 'sounds/808/percussion/808-Maracas1.wav',
    maraca2: 'sounds/808/percussion/808-Maracas2.wav'
}

var soundProfile = {}

//defining constructor for the sound profile
function ProfileElement(propertyName, charSet, soundName, soundPath) {
    soundProfile[propertyName] = {
        "charSet": charSet,
        "soundName": soundName,
        "soundPath": soundPath,
    }
}

//this constructs profile elements within the sound profile
///ProfileElement(propertyName, charSet, soundName, soundPath) 
new ProfileElement("consonates", consonates, "hat", paths.hat)
new ProfileElement("vowels", vowels, "snare", paths.snare)
new ProfileElement("evens", evens, "maraca1", paths.maraca1)
new ProfileElement("odds", odds, "maraca2", paths.maraca2)
new ProfileElement("space", space, "kick", paths.kick)
new ProfileElement("specialCharacters", specialCharacters, "Bell", paths.bell)

console.log(soundProfile)

//////soundHash - this will be filled with a property:value pair for each keyboard character.
//each property is a character and each value is a path to a .wav file
//the other property will be used if a key is pressed that is not set by the profile 
let soundHash = {
    other: 'sounds/808/percussion/808-Cowbell1.wav'
}

//defining functions for adding the sound profile to the sound hash
let addStringtoSoundHash = (string, path) => {
    for (let char of string) {
        soundHash[char] = path
    }
}
let addSoundProfiletoSoundHash = () => {
    //Assigning sounds from soundProfile to the soundHash
    Object.keys(soundProfile).forEach((obj) => {
        addStringtoSoundHash(soundProfile[obj].charSet, soundProfile[obj].soundPath)
    })
}

//adding default sound profile to sound hash
addSoundProfiletoSoundHash()

//setting form value  to userInput
userInput = document.querySelector("#newCharSet")

//this function is for buttons that set sounds to keyboard keys using the user inputted string
let assignUserInputtoSoundHash = (path) => {
    addStringtoSoundHash(userInput.value, path)
}

//these buttons are for putting premade charsets into the users input form
let newCharSet = (premadeCharSet) => {
    userInput.value = premadeCharSet
}

////////////////////////////////////////////////////////////////////////////////////////////////////

//KEYPRESS EVENT
document.onkeydown = (e) => {

    if (soundHash.hasOwnProperty(e.key)) {
        let audioElement = document.createElement("audio")
        audioElement.setAttribute("src", soundHash[e.key])
        audioElement.play()
    }
    else {
        let audioElement = document.createElement("audio")
        audioElement.setAttribute("src", soundHash.other)
        audioElement.play()
    }

    if (e.key != " ") {
        document.querySelector("#charPress").innerHTML = e.key
    }
    else {
        document.querySelector("#charPress").innerHTML = '_'
    }

    document.querySelector()

}//end of keypress event