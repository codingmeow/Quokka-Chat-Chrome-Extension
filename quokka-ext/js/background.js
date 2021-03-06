function returnMessage(msg, cmd) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {
            message: msg,
            command: cmd
        })
    });
};

chrome.runtime.onMessage.addListener(function(req, sender) {
    if (req.command === 'get') {
        $.ajax({
            type: 'GET',
            url: 'http://www.quokka.chat/api/video/embedid/' + req.embedId,
            success: function(response) {
                returnMessage(response, 'get');
            }
        })
    }
    if (req.command === 'send') {
        $.ajax({
            type: 'POST',
            url: 'http://www.quokka.chat/api/video/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            },
            data: req.data,
            success: function(response) {
                returnMessage(response, 'send');
            }
        })
    }
})