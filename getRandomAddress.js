console.log("Loading Variables");
var snippetHTTP = new XMLHttpRequest();
var snippetRANDOMURLBASE = "https://www.bestrandoms.com/random-";
var snippetUSStates = {
    "nation": "United States of America",
    "nation-abbreviation": "USA",
    "state": [
       {
          "name": "Alabama",
          "abbreviation": "AL"
       },
       {
          "name": "Alaska",
          "abbreviation": "AK"
       },
       {
          "name": "Arizona",
          "abbreviation": "AZ"
       },
       {
          "name": "Arkansas",
          "abbreviation": "AR"
       },
       {
          "name": "California",
          "abbreviation": "CA"
       },
       {
          "name": "Colorado",
          "abbreviation": "CO"
       },
       {
          "name": "Connecticut",
          "abbreviation": "CT"
       },
       {
          "name": "Delaware",
          "abbreviation": "DE"
       },
       {
          "name": "Florida",
          "abbreviation": "FL"
       },
       {
          "name": "Georgia",
          "abbreviation": "GA"
       },
       {
          "name": "Hawaii",
          "abbreviation": "HI"
       },
       {
          "name": "Idaho",
          "abbreviation": "ID"
       },
       {
          "name": "Illinois",
          "abbreviation": "IL"
       },
       {
          "name": "Indiana",
          "abbreviation": "IN"
       },
       {
          "name": "Iowa",
          "abbreviation": "IA"
       },
       {
          "name": "Kansas",
          "abbreviation": "KS"
       },
       {
          "name": "Kentucky",
          "abbreviation": "KY"
       },
       {
          "name": "Louisiana",
          "abbreviation": "LA"
       },
       {
          "name": "Maine",
          "abbreviation": "ME"
       },
       {
          "name": "Maryland",
          "abbreviation": "MD"
       },
       {
          "name": "Massachusetts",
          "abbreviation": "MA"
       },
       {
          "name": "Michigan",
          "abbreviation": "MI"
       },
       {
          "name": "Minnesota",
          "abbreviation": "MN"
       },
       {
          "name": "Mississippi",
          "abbreviation": "MS"
       },
       {
          "name": "Missouri",
          "abbreviation": "MO"
       },
       {
          "name": "Montana",
          "abbreviation": "MT"
       },
       {
          "name": "Nebraska",
          "abbreviation": "NE"
       },
       {
          "name": "Nevada",
          "abbreviation": "NV"
       },
       {
          "name": "New Hampshire",
          "abbreviation": "NH"
       },
       {
          "name": "New Jersey",
          "abbreviation": "NJ"
       },
       {
          "name": "New Mexico",
          "abbreviation": "NM"
       },
       {
          "name": "New York",
          "abbreviation": "NY"
       },
       {
          "name": "North Carolina",
          "abbreviation": "NC"
       },
       {
          "name": "North Dakota",
          "abbreviation": "ND"
       },
       {
          "name": "Ohio",
          "abbreviation": "OH"
       },
       {
          "name": "Oklahoma",
          "abbreviation": "OK"
       },
       {
          "name": "Oregon",
          "abbreviation": "OR"
       },
       {
          "name": "Pennsylvania",
          "abbreviation": "PA"
       },
       {
          "name": "Rhode Island",
          "abbreviation": "RI"
       },
       {
          "name": "South Carolina",
          "abbreviation": "SC"
       },
       {
          "name": "South Dakota",
          "abbreviation": "SD"
       },
       {
          "name": "Tennessee",
          "abbreviation": "TN"
       },
       {
          "name": "Texas",
          "abbreviation": "TX"
       },
       {
          "name": "Utah",
          "abbreviation": "UT"
       },
       {
          "name": "Vermont",
          "abbreviation": "VT"
       },
       {
          "name": "Virginia",
          "abbreviation": "VA"
       },
       {
          "name": "Washington",
          "abbreviation": "WA"
       },
       {
          "name": "West Virginia",
          "abbreviation": "WV"
       },
       {
          "name": "Wisconsin",
          "abbreviation": "WI"
       },
       {
          "name": "Wyoming",
          "abbreviation": "WY"
       }
    ]
 };

var currentState = "";

console.log("Variables Loaded");

console.log("Loading functions");

function getInput() {

}

function abbrev2Name(abbr) {
    for (var i=0; i< snippetUSStates.state.length; i++) {
        if (snippetUSStates.state[i].abbreviation == abbr) return snippetUSStates.state[i].name;
    }
}

function htmlReadyText(plainText) {
    return plainText.replace(" ","%20");
}

function getRandomAddress(stateName){
    var url = snippetRANDOMURLBASE+htmlReadyText(stateName)+"-address";
    var response = ""
    console.log(url)
    //HTTP.responseType = "document";
    snippetHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            response = this.response;
        }
    }
    snippetHTTP.open("GET",url,false);
    snippetHTTP.send();
    //HTTP.close();
    extractData(response);
}

function extractData(response){
    var responseDoc = new DOMParser().parseFromString(response,"text/html");
    console.log(responseDoc);
    content = responseDoc.getElementsByClassName("content")[0];
    listElements = content.getElementsByTagName("li");
    //alert(listElements[0].innerHTML);
    var addressElements = listElements[0].getElementsByTagName("span");
    var phone = addressElements[0].innerHTML.replace("(","").replace(") ","-");
    var streetAddr = addressElements[1].innerHTML;
    var city = addressElements[2].innerHTML;
    var state = addressElements[3].innerHTML.split("(")[0];
    var zipCode = addressElements[4].innerHTML;
    alert(phone+"---"+streetAddr+"---"+city+"---"+state+"---"+zipCode)
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-CreateAccountContactInputSet-Phone-GlobalPhoneInputSet-NationalSubscriberNumber")[0].value = phone;
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-Address_ExtInputSet-globalAddressContainer-GlobalAddressInputSet-AddressLine1")[0].value = streetAddr;
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-Address_ExtInputSet-globalAddressContainer-GlobalAddressInputSet-City")[0].value = city;
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-Address_ExtInputSet-globalAddressContainer-GlobalAddressInputSet-State")[0].value = currentState;
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-Address_ExtInputSet-globalAddressContainer-GlobalAddressInputSet-PostalCode")[0].value = zipCode;
    document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-OfficialIDInputSet-OfficialIDDV_Input")[0].value = "55-5"+Math.floor(Math.random() * 1000000);
}

function retrieveData(){
   alert("I'm Here!")
    var companyName = document.getElementsByName("CreateAccount-CreateAccountScreen-CreateAccountDV-CreateAccountContactInputSet-GlobalContactNameInputSet-Name")[0].value
    var abbr = companyName.split("_")[0];
    var stateName = abbrev2Name(abbr);
    currentState = abbr;
    var addressHTML = getRandomAddress(stateName);
}

console.log("Functions Loaded");