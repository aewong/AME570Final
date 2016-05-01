function getXMLHTTPRequest() {
    var request;
    
    try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (ex1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (ex2) {
            request = null;
        }
    }
    if (!request && typeof XMLHttpRequest != "undefined") {
        request = new XMLHttpRequest();
    }
    
    return request;
}

function loadURL(filename, callback) {
    var aXMLHttpRequest = getXMLHTTPRequest();
    var allData;
    
    if (aXMLHttpRequest) {
        aXMLHttpRequest.open("GET", filename, true);
        
        aXMLHttpRequest.onreadystatechange = function (aEvt) {
            if (aXMLHttpRequest.readyState == 4) {
                allData = aXMLHttpRequest.responseText;
                callback(allData);
            }
        };
        
        aXMLHttpRequest.send(null);
    }
    else {
        alert("A problem occurred instantiating the XMLHttpRequest object.");
    }
}

