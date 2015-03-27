var http = require('http')
var strftime = require('strftime')

var server = http.createServer(function(req, res) {
    if (req.method != 'GET')
        return res.end('I need GET\n')

    res.writeHead(200, { 'Content-Type': 'application/json' })
    var parsedUrl = require('url').parse(req.url, true)
    var date = new Date(parsedUrl.query.iso)

    if (parsedUrl.pathname == '/api/parsetime') {
        var hourMinuteSecond = {
            'hour': date.getHours(),
            'minute': date.getMinutes(),
            'second': date.getSeconds()
        }
        return res.end(JSON.stringify(hourMinuteSecond))
    }

    if (parsedUrl.pathname == '/api/unixtime') {
        return res.end(JSON.stringify({'unixtime': +date}))
    }

    return res.end('problem')

})
server.listen(process.argv[2])
