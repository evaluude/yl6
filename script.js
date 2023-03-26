(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = h >= 12 ? 'PM' : 'AM';

            if (h == 0) {
                h = 12;
            } else if (h > 12) {
                h = h - 12;
            }


            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + "." + m + "." + s + " " + ampm;

        };

    });

    // forms
    function validateForm() {
        let firstName = document.getElementById("fname").value;
        let lastName = document.getElementById("lname").value;
        let radioButtons = document.getElementsByName("saatmine");
        let deliverySelected = false;

        // kontrolli, et nimed pole tühjad ja ei sisalda numbreid
        if (firstName === "" || /\d/.test(firstName) || lastName === "" || /\d/.test(lastName)) {
            alert("Eesnimi ja perekonnanimi ei tohi olla tühjad ega sisaldada numbreid");
            return false;
        }

        // vähemalt üks radio nupp valitud
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                deliverySelected = true;
                break;
            }
        }


        if (!deliverySelected) {
            alert("Palun valige tarneviis");
            return false;
        }

        return true;
    }

    document.getElementById("form").addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
        else {
            estimateDelivery(event);
        }
    });
    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";


    function estimateDelivery(event) {

        event.preventDefault();

        let linn = document.getElementById("linn");
        let deliveryCost = 0;

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;

        } else {
            // Lisame tarnekulu sõltuvalt linnast
            switch (linn.value) {
                case "tln":
                    deliveryCost = 0;
                    break;
                case "trt":
                case "nrv":
                    deliveryCost = 2.5;
                    break;
                case "prn":
                    deliveryCost = 3;
                    break;
                default:
                    break;
            }

            // Lisakulud kui kingitus või kontaktivaba
            let giftCheckbox = document.getElementById("v1");
            let contactlessCheckbox = document.getElementById("v2");

            if (giftCheckbox.checked) {
                deliveryCost += 5;
            }

            if (contactlessCheckbox.checked) {
                deliveryCost += 1;
            }
            document.getElementById("delivery").innerHTML = deliveryCost.toFixed(2) + " &euro;";


        }

        console.log("Tarne hind on arvutatud");
    }


}

)();


// map
let mapAPIKey = "AsCNkYNhUmeahDkc8TOt56jJy-Dub27wmNR3hgWSA82fe6zyER_0EUj0Y0Q_mAGA";

let map;

function GetMap() {
    "use strict";

    let tartuLocation = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let tallinnLocation = new Microsoft.Maps.Location(
        59.39491,
        24.67222
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: tartuLocation,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let tartuPushpin = new Microsoft.Maps.Pushpin(tartuLocation, {
        title: 'Tartu Ülikool'
    });

    let tallinnPushpin = new Microsoft.Maps.Pushpin(tallinnLocation, {
        title: 'TalTech'
    });

    map.entities.push(tartuPushpin);
    map.entities.push(tallinnPushpin);

    let bounds = Microsoft.Maps.LocationRect.fromLocations([tartuLocation, tallinnLocation]);
    map.setView({ bounds: bounds, padding: 20 });
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

