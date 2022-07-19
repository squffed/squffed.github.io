// Find out if on mobile or not (wordsearch will work differently if so)
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

// Receive random element from array
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

// Receive random property from object. Return the key and its contents as an array.
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    var random = keys.length * Math.random() << 0;
    // return name and array
    return [keys[random],obj[keys[random]]];
};

// Invert array with a 50% chance
Array.prototype.inverse = function () {
    if(getRandomInt(0,1) === 0)
    {
        return this;
    }
    else
    {
        return this.reverse();
    }
}

// Get random integer within an inclusive range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const grid = document.getElementById("grid");
const wordsRow = document.getElementById("wordsRow");
const header = document.getElementById("header");
const resetBtn = document.getElementById("resetBtn");
const instructions = document.getElementById("instructions");
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const directions = ['ROW','COLUMN','DIAGONAL LEFT','DIAGONAL RIGHT'];
const wordsAmount = 10;

if(isMobile)
{
    resetBtn.style.display = "block";
    instructions.innerHTML = "<b>Instructions:</b> Press the letters to form a word. Press the 'Reset' button to reset your selection."
}

// All words taken from https://github.com/imsky/wordlists & https://github.com/kstock/charades, filtered out spaces
const words = {
    "Computing People": ['ANDREESSEN','BABBAGE','BACKUS','BERNERS-LEE','BRIN','BROOKS','BUSH','BUSHNELL','CERF','CLARK','CODD','CUNNINGHAM','DIJKSTRA','ELLISON','ENGELBART','GROVE','HAMMING','HOPPER','KAY','KERNIGHAN','KNUTH','KURZWEIL','LICKLIDER','LISKOV','LOVELACE','MCCARTHY','MINSKY','MOORE','NOYCE','PAGE','RITCHIE','RIVEST','SHANNON','SHOCKLEY','STALLMAN','SUTHERLAND','TORVALDS','TURING','VON NEUMANN','WIRTH','WOZNIAK','ZUSE'],
    "Web Development": ['ACTION','ALERT','ALIGN','APP','AREA','BUFFER','BUG','BUTTON','CHART','CLICK','DEBUG','DOCUMENT','DOMAIN','DOWNLOAD','DYNAMIC','EMBED','ERROR','EVENT','EXCEPTION','FILTER','FIXED','FLOAT','FORK','FRAME','GALLERY','GIT','GRAPH','GRID','HOST','INLINE','INTERVAL','KEYWORD','LOAD','MIRROR','MODAL','MODULE','MONITOR','OBJECT','PAGE','POPUP','PREFIX','PROFILE','PROPERTY','QUERY','REFRESH','RELOAD','SCRIPT','SEARCH','SHIM','SOURCE','STATIC','STREAM','SYNC','TAB','TAP','TIMER','TITLE','TOUCH','TRAFFIC','TRANSFER','UPLOAD','URL','VALID','VIEW','WIRE'],
    "Superheroes": ['SUPERMAN','BATMAN','SPIDER-MAN','WOLVERINE','WONDER WOMAN','CAPTAIN AMERICA','HAL JORDAN','WALLY WEST','HULK','DAREDEVIL','DICK GRAYSON','IRON MAN','JEAN GREY','THOR','MORPHEUS','RORSCHACH','BARBARA GORDON','THING','JAMES GORDON','CATWOMAN','THE SPIRIT','PROFESSOR X','RAPHAEL','YORICK BROWN','HELLBOY','RICK GRIMES','PUNISHER','SWAMP THING','JOHN CONSTANTINE','GREEN ARROW','DEADPOOL','TIM DRAKE','NICK FURY','JESSE CUSTER','JUDGE DREDD','SPAWN','THE CROW','DOCTOR STRANGE','CYCLOPS','MR. FANTASTIC','SILVER SURFER','STORM','MARTIAN MANHUNTER','HAWKEYE','SPIDER JERUSALEM','HUMAN TORCH','KITTY PRYDE','MITCHELL HUNDRED','BARRY ALLEN','BILLY BATSON','BLACK PANTHER','AQUAMAN','BUCKY BARNES','ELIJAH SNOW','JOHN STEWART','HAWKMAN','THE TICK','BEAST','BOOSTER GOLD','FONE BONE','BLUE BEETLE','DASHIELL BAD HORSE','BLADE','RAY PALMER','GAMBIT','INVISIBLE WOMAN','HANK PYM','IRON FIST','SCOTT PILGRIM','SPECTRE','WILDCAT','LUKE CAGE','JONAH HEX','BLACK WIDOW','MARV','THE ROCKETEER','NAMOR','SGT. ROCK','CAPTAIN BRITAIN','NIGHTCRAWLER','BLACK CANARY',"ERIC O'GRADY",'SUPERBOY','KA-ZAR','BLACK LIGHTNING','MICHONNE','RENEE MONTOYA','SHE-HULK','MOON KNIGHT','GHOST RIDER','CEREBUS','USAGI YOJIMBO','DONNA TROY','SUPERGIRL','SAVAGE DRAGON','FALCON','ADAM STRANGE','NOVA','WASP','GROO'],
    "Animals": [
        "AARDVARK",
        "ALBATROSS",
        "ALLIGATOR",
        "ALPACA",
        "ANT",
        "ANTEATER",
        "ANTELOPE",
        "APE",
        "ARMADILLO",
        "DONKEY",
        "BABOON",
        "BADGER",
        "BARRACUDA",
        "BAT",
        "BEAR",
        "BEAVER",
        "BEE",
        "BISON",
        "BOAR",
        "BUFFALO",
        "BUTTERFLY",
        "CAMEL",
        "CAPYBARA",
        "CARIBOU",
        "CASSOWARY",
        "CAT",
        "CATERPILLAR",
        "CATTLE",
        "CHAMOIS",
        "CHEETAH",
        "CHICKEN",
        "CHIMPANZEE",
        "CHINCHILLA",
        "CHOUGH",
        "CLAM",
        "COBRA",
        "COCKROACH",
        "COD",
        "CORMORANT",
        "COYOTE",
        "CRAB",
        "CRANE",
        "CROCODILE",
        "CROW",
        "CURLEW",
        "DEER",
        "DINOSAUR",
        "DOG",
        "DOGFISH",
        "DOLPHIN",
        "DOTTEREL",
        "DOVE",
        "DRAGONFLY",
        "DUCK",
        "DUGONG",
        "DUNLIN",
        "EAGLE",
        "ECHIDNA",
        "EEL",
        "ELAND",
        "ELEPHANT",
        "ELK",
        "EMU",
        "FALCON",
        "FERRET",
        "FINCH",
        "FISH",
        "FLAMINGO",
        "FLY",
        "FOX",
        "FROG",
        "GAUR",
        "GAZELLE",
        "GERBIL",
        "GIRAFFE",
        "GNAT",
        "GNU",
        "GOAT",
        "GOLDFINCH",
        "GOLDFISH",
        "GOOSE",
        "GORILLA",
        "GOSHAWK",
        "GRASSHOPPER",
        "GROUSE",
        "GUANACO",
        "GULL",
        "HAMSTER",
        "HARE",
        "HAWK",
        "HEDGEHOG",
        "HERON",
        "HERRING",
        "HIPPOPOTAMUS",
        "HORNET",
        "HORSE",
        "HUMAN",
        "HUMMINGBIRD",
        "HYENA",
        "IBEX",
        "IBIS",
        "JACKAL",
        "JAGUAR",
        "JAY",
        "JELLYFISH",
        "KANGAROO",
        "KINGFISHER",
        "KOALA",
        "KOOKABURA",
        "KOUPREY",
        "KUDU",
        "LAPWING",
        "LARK",
        "LEMUR",
        "LEOPARD",
        "LION",
        "LLAMA",
        "LOBSTER",
        "LOCUST",
        "LORIS",
        "LOUSE",
        "LYREBIRD",
        "MAGPIE",
        "MALLARD",
        "MANATEE",
        "MANDRILL",
        "MANTIS",
        "MARTEN",
        "MEERKAT",
        "MINK",
        "MOLE",
        "MONGOOSE",
        "MONKEY",
        "MOOSE",
        "MOSQUITO",
        "MOUSE",
        "MULE",
        "NARWHAL",
        "NEWT",
        "NIGHTINGALE",
        "OCTOPUS",
        "OKAPI",
        "OPOSSUM",
        "ORYX",
        "OSTRICH",
        "OTTER",
        "OWL",
        "OYSTER",
        "PANTHER",
        "PARROT",
        "PARTRIDGE",
        "PEAFOWL",
        "PELICAN",
        "PENGUIN",
        "PHEASANT",
        "PIG",
        "PIGEON",
        "PONY",
        "PORCUPINE",
        "PORPOISE",
        "QUAIL",
        "QUELEA",
        "QUETZAL",
        "RABBIT",
        "RACCOON",
        "RAIL",
        "RAM",
        "RAT",
        "RAVEN",
        "RED DEER",
        "RED PANDA",
        "REINDEER",
        "RHINOCEROS",
        "ROOK",
        "SALAMANDER",
        "SALMON",
        "SAND DOLLAR",
        "SANDPIPER",
        "SARDINE",
        "SCORPION",
        "SEAHORSE",
        "SEAL",
        "SHARK",
        "SHEEP",
        "SHREW",
        "SKUNK",
        "SNAIL",
        "SNAKE",
        "SPARROW",
        "SPIDER",
        "SPOONBILL",
        "SQUID",
        "SQUIRREL",
        "STARLING",
        "STINGRAY",
        "STINKBUG",
        "STORK",
        "SWALLOW",
        "SWAN",
        "TAPIR",
        "TARSIER",
        "TERMITE",
        "TIGER",
        "TOAD",
        "TROUT",
        "TURKEY",
        "TURTLE",
        "VIPER",
        "VULTURE",
        "WALLABY",
        "WALRUS",
        "WASP",
        "WEASEL",
        "WHALE",
        "WILDCAT",
        "WOLF",
        "WOLVERINE",
        "WOMBAT",
        "WOODCOCK",
        "WOODPECKER",
        "WORM",
        "WREN",
        "YAK",
        "ZEBRA"
    ]
}

var size = 15; //Size of wordsearch
var chosenWords = []; //Words chosen randomly (see chooseWords function)
var input = []; //Track user input (through CTRL clicks) and store objects
var inputString = ""; //Track user input via string
var wordsFound = 0;

// Selection via click event while holding CTRL
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        // Grey represents found word, yellow represents selection
        if(target.style.backgroundColor !== "grey" && target.style.backgroundColor !== "yellow" && target.tagName === "TD" && !chosenWords.includes(target.id) && e.ctrlKey && adjacent(target))
        {
            target.style.backgroundColor = "yellow";
            input.push(target);
            inputString += text;
            checkInputString();
        }
        else if (target.style.backgroundColor !== "grey" && target.style.backgroundColor !== "yellow" && target.tagName === "TD" && !chosenWords.includes(target.id) && isMobile && adjacent(target))
        {
            target.style.backgroundColor = "yellow";
            input.push(target);
            inputString += text;
            checkInputString();
        }
}, false);

// Reset selection upon releasing the CTRL key
document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;
    if(name === "Control")
    {
        reset();
    }
}, false);

// Calculate if the tile selected is adjacent to the ones before (and in the same direction)
function adjacent(target)
{
    if(input.length >= 2)
    {
        var targetSplit = target.id.split(',');
        var firstSplit = input[0].id.split(',');
        var secondSplit = input[1].id.split(',');
        var lastSplit = input[input.length - 1].id.split(',');
        if(firstSplit[1] == secondSplit[1]) //same y, so x axis
        {
            //if right or left and y is the same
            if((targetSplit[0] - lastSplit[0] == 1 || targetSplit[0] - lastSplit[0] == -1) && targetSplit[1] == lastSplit[1])
            {
                return true;
            }
        }
        else if(firstSplit[0] == secondSplit[0]) //same x, so y axis
        {
            //if down or up and x is the same
            if((targetSplit[1] - lastSplit[1] == 1 || targetSplit[1] - lastSplit[1] == -1) && targetSplit[0] == lastSplit[0])
            {
                return true;
            }
        }
        else //is diagonal
        {
            if(firstSplit[1] - secondSplit[1] == 1 && firstSplit[0] - secondSplit[0] == 1) //top left
            {
                if(targetSplit[1] - lastSplit[1] == -1 && targetSplit[0] - lastSplit[0] == -1)
                {
                    return true;
                }
            }
            else if(firstSplit[1] - secondSplit[1] == 1 && firstSplit[0] - secondSplit[0] == -1) //top right
            {
                if(targetSplit[1] - lastSplit[1] == -1 && targetSplit[0] - lastSplit[0] == 1)
                {
                    return true;
                }
            }
            else if(firstSplit[1] - secondSplit[1] == -1 && firstSplit[0] - secondSplit[0] == 1) //bottom left
            {
                if(targetSplit[1] - lastSplit[1] == 1 && targetSplit[0] - lastSplit[0] == -1)
                {
                    return true;
                }
            }
            else if(firstSplit[1] - secondSplit[1] == -1 && firstSplit[0] - secondSplit[0] == -1) //bottom right
            {
                if(targetSplit[1] - lastSplit[1] == 1 && targetSplit[0] - lastSplit[0] == 1)
                {
                    return true;
                }
            }
        }
    }
    else
    {
        if(input.length == 0)
        {
            return true;
        }
        else
        {
            var targetSplit = target.id.split(',');
            var firstSplit = input[0].id.split(',');
            if(targetSplit[0] - firstSplit[0] > 1 || targetSplit[0] - firstSplit[0] < -1 || targetSplit[1] - firstSplit[1] > 1 || targetSplit[1] - firstSplit[1] < -1) // If out of range
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}

// Reset selection
function reset()
{
    input = [];
    inputString = "";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            var element = document.getElementById(`${i},${j}`)
            if(element.style.backgroundColor === "yellow")
            {
                element.style.backgroundColor = "";
            }
        }
    }
}

// Check if word is found
function checkInputString()
{
    for (let i = 0; i < chosenWords.length; i++) {
        const element = chosenWords[i];
        const elementWithoutStuff = chosenWords[i].replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "").replaceAll(".", "");
        if(inputString === elementWithoutStuff)
        {
            document.getElementById(element).style.textDecoration = "line-through";
            for (let j = 0; j < input.length; j++) {
                const element = input[j];
                element.style.backgroundColor = "grey";
            }
            wordsFound++;
            input = [];
            inputString = "";
            break;
        }
    }
    if(wordsFound == wordsAmount)
    {
        location.reload();
    }
}

// Generate the grid used for the wordsearch inside the grid element
function createGrid()
{
    for(var i = 0; i < size; i++)
    {
        var tableRow = document.createElement("tr");
        for(var j = 0; j < size; j++)
        {
            var tableData = document.createElement("td");
            tableData.id = `${j},${i}`;
            tableData.textContent = "#";
            tableRow.appendChild(tableData);
        }
        grid.appendChild(tableRow);
    }
}

// Choose words randomly given an array and an amount (of words)
function chooseWords(array, amount)
{
    chosenWords = [];
    header.textContent = `Wordsearch: ${array[0]}`;
    for (let i = 0; i < amount; i++) {
        var chosenWord = array[1].random();
        while(chosenWords.includes(chosenWord) || chosenWord.length > size - 2)
        {
            chosenWord = array[1].random();
        }
        chosenWords.push(chosenWord);
    }
}

// Place words inside wordsearch, catches if word goes out of bounds or goes over a currently existing word
function pasteWords()
{
    for (let i = 0; i < chosenWords.length; i++) {
        const word = chosenWords[i].replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "").replaceAll(".", "");
        var elementsChanged = [];
        var letters = word.split('').inverse();
        var direction = getRandomDirection();
        var position = getRandomUnusedPosition();
        try {
            if(direction === "ROW")
            {
                for(let x = 0; x < word.length; x++)
                {
                    var element = document.getElementById(`${position.split(",")[0]*1+x},${position.split(",")[1]*1}`)
                    if(element.textContent !== "#")
                    {
                        throw 'Occupied';
                    }
                    elementsChanged.push(element);
                    element.textContent = letters[x];
                }
            }
            else if(direction === "COLUMN")
            {
                for(let y = 0; y < word.length; y++)
                {
                    var element = document.getElementById(`${position.split(",")[0]*1},${position.split(",")[1]*1-y}`)
                    if(element.textContent !== "#")
                    {
                        throw 'Occupied';
                    }
                    elementsChanged.push(element);
                    element.textContent = letters[y];
                }
            }
            else if(direction === "DIAGONAL RIGHT")
            {
                for(let y = 0; y < word.length; y++)
                {
                    var element = document.getElementById(`${position.split(",")[0]*1-y},${position.split(",")[1]*1-y}`)
                    if(element.textContent !== "#")
                    {
                        throw 'Occupied';
                    }
                    elementsChanged.push(element);
                    element.textContent = letters[y];
                }
            }
            else if(direction === "DIAGONAL LEFT")
            {
                for(let y = 0; y < word.length; y++)
                {
                    var element = document.getElementById(`${position.split(",")[0]*1-y},${position.split(",")[1]*1+y}`)
                    if(element.textContent !== "#")
                    {
                        throw 'Occupied';
                    }
                    elementsChanged.push(element);
                    element.textContent = letters[y];
                }
            }
        } catch (error) {
            elementsChanged.forEach(element => {
                element.textContent = "#";
            });
            i--;
            continue;
        }
    }
}

// Populate the words row with the chosen words
function loadUpWordsRow()
{
    for (let i = 0; i < chosenWords.length; i++) {
        const element = chosenWords[i];
        var tableData = document.createElement("td");
        tableData.textContent = element;
        tableData.id = element;
        wordsRow.appendChild(tableData);
    }
}

// Get a position not yet used
function getRandomUnusedPosition()
{
    var position = `${getRandomInt(0,size-1)},${getRandomInt(0,size-1)}`;
    while(document.getElementById(position).textContent !== "#")
    {
        position = `${getRandomInt(0,size-1)},${getRandomInt(0,size-1)}`;
    }
    return position;
}

// Get a direction randomly
function getRandomDirection()
{
    return directions.random();
}

// Populate generated grid with hashes (hashes are replaced down the line)
function populateHashesWithLetters()
{
    for(var i = 0; i < size; i++)
    {
        for(var j = 0; j < size; j++)
        {
            var element = document.getElementById(`${j},${i}`);
            if(element.textContent === "#")
            {
                element.textContent = alphabet.random();
            }
        }
    }
}

function startWordsearch()
{
    createGrid();
    chooseWords(randomProperty(words),wordsAmount);
    pasteWords();
    loadUpWordsRow();
    populateHashesWithLetters();
}

startWordsearch();