let languages = ["en", "es"];
let current = 0;

function translatePage(stringsObj) {
    Object.keys(stringsObj).forEach((key) => {
        document.getElementById(key).textContent = stringsObj[key];
    });
}

function setLanguage(langID) {
    if (typeof langID != "number") {
        return;
    }
    if (langID >= languages.length) {
        return;
    }

    current = langID;
    const filename = `strings.${languages.at(langID)}.json`;
    const documentName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    const url = window.location.href.replace(documentName, "");
    
    fetch(`${url}lang/${filename}`)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw `Couldn't fetch. Server returned ${response.status} (${response.statusText})`;
        })
        .then((json)=>{
            translatePage(json);
        })
        .catch((error)=>{
            console.error(`ERROR during fetch: ${error}`);
        })
}

// Set a default language
setLanguage(0);

// Add behavior to button
document.getElementById("lang-change").onclick = ()=>{
    // We can't change language if there are no languages or if
    // there's only one
    if (languages.length < 2) {
        return;
    }
    
    current++;
    if (current >= languages.length) {
        current = 0;
    }
    setLanguage(current);
}