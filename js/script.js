var myArray = {};

function fieldInsert(){
// deze functie genereerd het ID van het veld afhankelijk van in welke kolom de speler zijn zet geplaatst heeft.

    //id van aangeklikte kolom op vragen
    var insertId = event.srcElement.id;

    //checken vanaf onderste rij van de kolom of er nog geen player gelinkt aan het veld is
    for(var row=5; row > -1; row--){
        var newId = row + insertId;
        if (newId in myArray){
            continue;
        }
        else{
            fieldSelector(newId)
            break;
        }
    }
}

function fieldSelector(id){
// deze functie past het speelbord aan afhankelijk waar de speler zijn punt heeft geplaatst

    // player opvragen
    var player = document.getElementById("player").innerText;

    // aangeklikte veld (bijv. "05", oftewel het vakje linksonderin, "00" is dan weer linksbovenin)
    var fieldId = id;

    // veld id linken aan speler in array
    myArray[fieldId] = player;


    // veld kleur geven van player (geel is player1 of rood is player2)
    // wisselen van speler
    if (player == "Player1"){
        document.getElementById(fieldId).style.backgroundColor = "yellow";
        document.getElementById("player").innerHTML = "Player2";
        document.getElementById("player").style.backgroundColor = "red";
    } else {
        document.getElementById(fieldId).style.backgroundColor = "red";
        document.getElementById("player").innerHTML = "Player1";
        document.getElementById("player").style.backgroundColor = "yellow";
    }

    // checken of er 4 op een rij is bij deze beurt.
    checkUitslag(id, player);

    //checken of het hele veld vol is en dan game restarten:
    if(Object.keys(myArray).length == 42){
        alert("Game Over, both players lose!");
        restart();
    }

}

function checkUitslag(field, player){
//    Checked of er 4 op een rij liggen afhankelijk van het veld en speler
    
    var Vteller = verticaalCheck(field, player); // verticaal
    var Hteller = horizontaalCheck(field, player); // horizontaal
    
    var Dteller1 = diagonaalCheck(11, field, player); // diagonaal linksboven naar rechtsonder
    var Dteller2 = diagonaalCheck(9, field, player); // diagonaal linksonder naar rechtsboven

    
    //checken welke lijn 4 op een rij heeft, anders doorgaan met spel
    if(Vteller >= 4){
        alert(player + " heeft gewonnen! 4 op een rij verticaal.")
        disableButtons();
    }
    else if(Hteller >= 4) {
        alert(player + " heeft gewonnen! 4 op een rij horizontaal.")
        disableButtons();
    }
    else if (Dteller1 >= 4 || Dteller2 >= 4){
        alert(player + " heeft gewonnen! 4 op een rij diagonaal.")
        disableButtons();
    }
    else{
        console.log("Geen winlijn.")
    }
    

}

function horizontaalCheck(field, player){
    //bijv als player1 50,51,52,53 in bezit heeft is er een horizontale vier op een rij
    //checken op horizontale lijnen:
    var hCteller = 0;
    var voorsteGetal = field.charAt(0); // nummer van de rij waar in gekeken moet worden

    for(var kolom=0; kolom < 7; kolom++){
        var veldId = voorsteGetal + kolom;
        if (myArray[veldId] == player){
            hCteller +=1;
            continue;
        }
        else{
            if (hCteller == 4){
                break; // ga for loop uit als er 4 op een rij gevonden is.
            }else {
                hCteller = 0;
            }
        
        }
    }
    return hCteller;
}

function verticaalCheck(field, player){
// checked voor verticale 4 op een rij
    //bijv als player1 50,40,30,20 in bezit heeft is er dus een verticale vier op een rij
    //checken op verticale lijnen:
    var vCteller = 0;
    var laatsteGetal = field[field.length -1]; // dit geeft het getal van de kolom
    
    for(var rij=5; rij > -1; rij--){
        var veldId = rij+laatsteGetal; // maakt combinatie van rij en kolom zodat we het id hebben van het veld
        if(myArray[veldId] == player){
            vCteller+=1;
            continue;
        }
        else{
            break;
        }    
    }
    return vCteller;
}

function sorteren(myArguments)
{ 
  return myArguments.sort(function(a,b)
  { 
    return a - b; 
  }); 
}

function diagonaalCheck(stap, field, player){
// checked voor diagonale 4 op een rij
    //bijv als player1 50,41,32,23 in bezit heeft is er een diagonale vier op een rij
    //checken op diagonale lijnen:
    // -11 en + 11
    // of -9 en + 9
    // limits 0 - 60

    var Dteller = 0
    var opslaglijst = []

    for(var start=+field; start < 61; start+=stap){
        opslaglijst.push(start)
    }
    for(var start=+field; start > -1; start-=stap){
        opslaglijst.push(start)
    }
    
    opslaglijst = sorteren(opslaglijst);
    opslaglijst = new Set(opslaglijst);

    for (var element of opslaglijst){
        if (element.toString().length == 1){
            element  = "0" + element;
        }
        if (myArray[element] == player){
            Dteller += 1
            continue;
        }
        else{
            if (Dteller == 4){
                break; // ga for loop uit als er 4 op een rij gevonden is.
            }else {
                Dteller = 0;
            }
        }
    }
    return Dteller;
}

function restart(){
// Refreshed het hele spel
    Object.keys(myArray).forEach((key, value) => {
        document.getElementById(key).style.backgroundColor = "";
    })
    myArray = {};
    document.getElementById("player").innerHTML = "Player1";
    document.getElementById("player").style.backgroundColor = "yellow";

    for(x=0; x<7; x++){
        document.getElementById(x).disabled = false;
    }
}

function disableButtons(){
// zet de invoer buttons uit
    for(x=0; x<7; x++){
        document.getElementById(x).disabled = true;
    }
}