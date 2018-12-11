const charsets = {
    consonates: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ',
    vowels: 'aeiouAEIOU',
    numbers: '0123456789',
    evens: '02468',
    odds: '13579',
    space: ' ',
    specialCharacters: "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"',
    alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    allCharacters: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"'
}

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
new ProfileElement("consonates", charsets.consonates, "hat", paths.hat)
new ProfileElement("vowels", charsets.vowels, "snare", paths.snare)
new ProfileElement("evens", charsets.evens, "maraca1", paths.maraca1)
new ProfileElement("odds", charsets.odds, "maraca2", paths.maraca2)
new ProfileElement("space", charsets.space, "kick", paths.kick)
new ProfileElement("specialCharacters", charsets.specialCharacters, "Bell", paths.bell)


//////soundHash - this will be filled with a property:value pair for each keyboard character.
//each property is a character and each value is a path to a .wav file
//the other property will be used if a key is pressed that is not set by the profile 
let soundHash = {
    other: 'sounds/808/percussion/808-Cowbell1.wav'
}

//defining functions that will associate chars from a string with a sound path in the sound hash
let addStringtoSoundHash = (string, path) => {
    for (let char of string) {
        soundHash[char] = path
    }
}

//defining function that will assign sounds from sound profile to sound hash
let addSoundProfiletoSoundHash = () => {
    Object.keys(soundProfile).forEach((obj) => {
        addStringtoSoundHash(soundProfile[obj].charSet, soundProfile[obj].soundPath)
    })
}

var makeSoundPathButtons = () => {
    var div = document.querySelector("#soundPathButtonsDiv")
    var arr = []
    Object.keys(paths).forEach(key => (arr.push(key)))
    arr.forEach(path=>div.innerHTML+=`<button onclick="assignUserInputtoSoundHash(paths.${path})">${path}</button>`)
}
var makeCharsetButtons = () => {
    var div = document.querySelector("#charSetButtonsDiv")
    var arr = []
    Object.keys(charsets).forEach(key => (arr.push(key)))
    arr.forEach(charset=>{div.innerHTML+=`<button onclick="newCharSet(charsets.${charset})">${charset}</button>`})
    
}
//adding default sound profile to sound hash
addSoundProfiletoSoundHash()
makeCharsetButtons()
makeSoundPathButtons()

//setting form value  to userInput
userInput = document.querySelector("#userInput")

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
    
    document.querySelector("#charPress").innerHTML = e.key
}//end of keypress event