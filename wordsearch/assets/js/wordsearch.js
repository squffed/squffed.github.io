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
        if(inputString === element)
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
    chooseWords(randomProperty(words),wordsAmount);
    pasteWords();
    loadUpWordsRow();
    populateHashesWithLetters();
}

startWordsearch();