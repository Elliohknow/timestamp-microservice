var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 3000;

// const publicPath = path.join(__dirname, '../public');
// app.use(express.static(publicPath));

// create instance of express, instantiate body-parser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
// GET call returning JSON date with natural and unix format
app.get('/dateValues/:dateValue', function (req, res, next) {
  // gets the requested date data
  var dateValue = req.params.dateValue;
  // formatting options for date
  var formatOptions = {
    year:'numeric',
    month:'long',
    day:'numeric'
  };

  if(isNaN(dateValue)){
    let naturalDate = new Date(dateValue);
    naturalDate = naturalDate.toLocaleDateString("en-us", formatOptions);
    let unixDate = new Date(dateValue).getTime()/1000;
  } else {
    var unixDate = dateValue;
    var naturalDate = new Date(dateValue*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", formatOptions);
  }

  res.json({unix: unixDate, natural: naturalDate});
});

app.listen(port, (req, res) => {
  console.log(`Server is up and running on port ${port}`);
});
