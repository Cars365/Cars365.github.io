$(document).ready(function(){
    $.typeahead({
        input: '.js-typeahead-car_v1',
        order: "asc",
        source: {
            data: [
                "Abarth Punto EVO 1.4 T-Jet",
                "Abarth Punto EVO",
                "Audi A3 40 TFSI Premium",
                "Audi A3 35 TDI Premium",
                "Audi A3 35 TDI Premium Plus",
                "Audi A3 35 TDI Technology",
                "Audi A3 35 TDI Attraction",
                "Audi A3 1.8 TFSI Premium Plus",
                "Audi A3 40 TFSI Premium Plus",
                "Audi A4 2008-2014 2.0 TFSI"
            ]
        },
        callback: {
            onInit: function (node) {
                console.log('Typeahead Initiated on ' + node.selector);
            }
        }
    });
});