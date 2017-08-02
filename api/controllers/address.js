var Correios = require('node-correios'),
    correios = new Correios();

module.exports.loadAddressInfo = function(req, res) {

    if (req.query.cep == null || req.query.cep == "") {

        res
        .status(400)
        .json({"error": "no zip paramater was given"});

    }

    correios.consultaCEP({ cep: req.query.cep }, function(err, result) {

        if (err) {

            res
            .status(500)
            .json({"error": err});
            console.log(err);

        } else {

            res.json(result);

        }

    });

}