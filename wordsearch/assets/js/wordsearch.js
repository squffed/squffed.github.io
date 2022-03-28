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
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const directions = ['ROW','COLUMN','DIAGONAL LEFT','DIAGONAL RIGHT'];

// All words taken from https://github.com/imsky/wordlists, filtered out spaces
const words = {
    Plants: ['ACORN','ALFALFA','BAMBOO','BARK','BEAN','BERRY','BLADE','BRUSH','BUD','BULB','BUSH','CACTUS','CLOVER','CORK','COROLLA','FERN','FLORA','FLOWER','FOREST','FRUIT','GARDEN','GRAIN','GRASS','GROVE','HERB','IVY','JUNGLE','JUNIPER','KELP','KUDZU','LEAF','LILY','MOSS','NECTAR','NUT','PALM','PETAL','POLLEN','RESIN','ROOT','SAGE','SAP','SEED','SHOOT','SHRUB','SPORE','STALK','SPINE','SPROUT','STEM','THORN','TREE','TRUNK','TWIG','VEIN','VINE','WEED','WOOD'],
    Food: ['AROMA','BAGEL','BATTER','BEANS','BEER','BISCUIT','BREAD','BROTH','BURGER','BURRITO','BUTTER','CAKE','CANDY','CARAMEL','CAVIAR','CHEESE','CHILI','CHIMICHANGA','CHOCOLATE','CIDER','COBBLER','COCOA','COFFEE','COOKIE','CREAM','CROISSANT','CRUMBLE','CUISINE','CURD','DESSERT','DISH','DRINK','EGGS','EMPANADA','ENCHILADA','ENTREE','FILET','FISH','FLOUR','FOIEGRAS','FOOD','GLAZE','GRILL','HAMBURGER','ICE','JUICE','KETCHUP','KITCHEN','LARD','LIQUOR','MARGARINE','MARINADE','MAYO','MAYONNAISE','MEAT','MILK','MOUSSE','MUFFIN','MUSHROOM','NOODLE','NUT','OIL','OLIVE','OMELETTE','PAN','PASTA','PASTE','PASTRY','PIE','PIZZA','PLATE','POT','POUTINE','PUDDING','QUESO','RACLETTE','RECIPE','RICE','SALAD','SALSA','SANDWICH','SAUCE','SEASONING','SKILLET','SODA','SOPAPILLAS','SOUP','SOY','SPICE','STEAK','STEW','SYRUP','TACO','TAQUITO','TARTAR','TASTE','TEA','TOAST','TOSTADA','VINEGAR','WAFFLE','WATER','WHEAT','WINE','WOK','YEAST','YOGURT'],
    Fruit: ['APPLE','APRICOT','AVOCADO','BANANA','BERRY','CANTALOUPE','CHERRY','CITRON','CITRUS','COCONUT','DATE','FIG','GRAPE','GUAVA','KIWI','LEMON','LIME','MANGO','MELON','MULBERRY','NECTARINE','ORANGE','PAPAYA','PEACH','PEAR','PINEAPPLE','PLUM','PRUNE','RAISIN','RASPBERRY','TANGERINE'],
    "Computing People": ['ANDREESSEN','BABBAGE','BACKUS','BERNERSLEE','BRIN','BROOKS','BUSH','BUSHNELL','CERF','CLARK','CODD','CUNNINGHAM','DIJKSTRA','ELLISON','ENGELBART','GROVE','HAMMING','HOPPER','KAY','KERNIGHAN','KNUTH','KURZWEIL','LICKLIDER','LISKOV','LOVELACE','MCCARTHY','MINSKY','MOORE','NOYCE','PAGE','RITCHIE','RIVEST','SHANNON','SHOCKLEY','STALLMAN','SUTHERLAND','TORVALDS','TURING','VONNEUMANN','WIRTH','WOZNIAK','ZUSE'],
    Buildings: ['ABBEY','AIRPORT','ARCH','ARENA','ARMORY','BAKERY','BANK','BARN','BARRACKS','BRIDGE','BUNKER','CABANA','CAFE','CAPITOL','CATHEDRAL','CHALET','CHAPEL','CHATEAU','CHURCH','CINEMA','COTTAGE','CRYPT','DEPOT','DOME','DORMITORY','DUPLEX','EMBASSY','FACTORY','FORT','FORTRESS','FOUNDRY','GALLERY','GARAGE','GAZEBO','HALL','HANGAR','HOSPITAL','HOSTEL','HOTEL','JAIL','KIOSK','LABORATORY','LIBRARY','LIGHTHOUSE','LODGE','MALL','MANOR','MARINA','MARKET','MILL','MONASTERY','MONUMENT','MOSQUE','MOTEL','MUSEUM','OBSERVATORY','PAGODA','PALACE','PAVILION','PLANT','PRISON','RECTORY','REFINERY','RESTAURANT','SCHOOL','SHED','SHRINE','SILO','SKYSCRAPER','SPIRE','STABLE','STADIUM','STATION','STORE','TEMPLE','TERMINAL','THEATER','TOWER','TRIPLEX','UNIVERSITY','VAULT'],
    Gaming: ['ACTION','ADVENTURE','ANIMATION','BIND','BOT','BURST','CAMP','CLAN','CLASS','COCKPIT','COMBAT','FLAG','FLIGHT','GAME','GEOMETRY','GRENADE','GUN','HORROR','HUD','LAG','LEVEL','MAP','MODEL','ORDER','PARTICLE','PLASMA','PLATFORM','PLAYER','POINTS','POLYGON','RAIL','REWARD','ROCKET','SCENE','SCORE','SKILL','SPAM','SPORT','SQUAD','STRATEGY','TACTICS','TEAM','TEXTURE','TRIGGER','TWITCH','VEHICLE','WEAPON']
}

var size = 15; //Size of wordsearch
var chosenWords = []; //Words chosen randomly (see chooseWords function)
var input = []; //Track user input (through CTRL clicks) and store objects
var inputString = ""; //Track user input via string

// Selection via click event while holding CTRL
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        // Grey represents found word, yellow represents selection
        if(target.style.backgroundColor !== "grey" && target.style.backgroundColor !== "yellow" && target.tagName === "TD" && !chosenWords.includes(target.id) && e.ctrlKey && adjacent(target))
        {
            target.style.backgroundColor = "yellow";;
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
        if(inputString === element)
        {
            document.getElementById(element).style.textDecoration = "line-through";
            for (let j = 0; j < input.length; j++) {
                const element = input[j];
                element.style.backgroundColor = "grey";
            }
            input = [];
            inputString = "";
            break;
        }
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
        const word = chosenWords[i];
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
    chooseWords(randomProperty(words),10);
    pasteWords();
    loadUpWordsRow();
    populateHashesWithLetters();
}

startWordsearch();