(function ($) {
    $.fn.weatherInfo = function (options) {
        var config = $.extend({}, {
            mode: 'default'
        }, options);

        function main(e) {
            // Add a "popup" div
            e.html('<div id="jquery.so_hot.weatherPopup"></div>')
            var weatherPopup = e.children();

            // Add styles to button and "popup div"
            stylizeElements(e, weatherPopup);

            // Increase opacity of the button on mouse hover
            e.mouseenter(function () {
                $(this).css({
                    'transition': 'all ease-in-out 0.3s',
                    'opacity': '1'
                })
            })

            // Decrease opacity of the button on mouse leave
            e.mouseleave(function () {
                $(this).css({
                    'transition': 'all ease-in-out 0.3s',
                    'opacity': '.75'
                })
            })

            // Check is the mode is given in function parameters
            var mode = e.data('mode');
            if (!mode) {
                mode = config.mode
            }

            // Check is the mode is given in the attributes
            if (e.attr("mode")) {
                mode = e.attr("mode")
            }

            if (mode === 'extended') {
                weatherPopup.css({'height': '500px'})
            } else if (mode == 'lite') {
                weatherPopup.css({'height': '200px'})
            }

            // On click event
            e.click(function () {

                // Show the "popup"
                weatherPopup.show(500)
                weatherPopup.css({'display': 'grid'})

                // Request weatherapi.com with AJAX
                $.ajax({
                    url: "http://api.weatherapi.com/v1/current.json?key=8dd0bd40d7e24ebca1b135330202709&q=Lviv",
                }).done(function (data) {
                    if (data.current.is_day === 0) {weatherPopup.css({'background-image': 'url("https://media1.tenor.com/images/8eef14e2ddc2b67af55e07961e570c7e/tenor.gif?itemid=9058998")'})}

                    // Check the mode and provide right function to get the information
                    if (mode === 'lite') {
                        weatherPopup.html(getLiteInfo(data));
                    }
                    else if (mode === 'extended') {
                        weatherPopup.html(getExtendedInfo(data))
                    }
                    else {
                        weatherPopup.html(getDefaultInfo(data));
                    }
                });
            })


            e.mouseleave(function () {
                weatherPopup.hide(500)
            })


        }


        function getDefaultInfo(data) {
            let html = "";
            var time = new Date(data.location.localtime)

            html += `<div><h2>Lviv <span>${(time.getHours() < 10 ? "0" + time.getHours() : time.getHours())
            + ":"
            + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes())}</span></h2></div>
                                        <div><img src="http://cdn.weatherapi.com/weather/64x64/day/356.png" alt=""></div>`

            html += `<div>Temperature (C°)</div><div>${data.current.temp_c + "°"}</div>`

            html += `<div>Temperature (F)</div><div>${data.current.feelslike_f + "F"}</div>`

            html += `<div>Humidity (%)</div><div>${data.current.humidity + "%"}</div>`

            html += `<div>Wind direction</div><div>${data.current.wind_dir}</div>`

            html += `<div>Wind speed</div><div>${data.current.wind_kph + "kph"}</div>`

            html += `<div>Clouds (%)</div><div>${data.current.cloud + "%"}</div>`

            return html
        }

        function getLiteInfo(data) {
            let html = "";
            var time = new Date(data.location.localtime)

            html += `<div><h2>Lviv <span>${(time.getHours() < 10 ? "0" + time.getHours() : time.getHours())
            + ":"
            + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes())}</span></h2></div>
                                        <div><img src="http://cdn.weatherapi.com/weather/64x64/day/356.png" alt=""></div>`

            html += `<div>Temperature (C°)</div><div>${data.current.temp_c + "°"}</div>`

            html += `<div>Humidity (%)</div><div>${data.current.humidity + "%"}</div>`

            html += `<div>Clouds (%)</div><div>${data.current.cloud + "%"}</div>`

            return html
        }

        function getExtendedInfo(data) {
            let html = "";
            var time = new Date(data.location.localtime)

            html += `<div><h2>Lviv <span>${(time.getHours() < 10 ? "0" + time.getHours() : time.getHours())
            + ":"
            + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes())}</span></h2></div>
                                        <div><img src="http://cdn.weatherapi.com/weather/64x64/day/356.png" alt=""></div>`

            html += `<div>Temperature (C°)</div><div>${data.current.temp_c + "°"}</div>`

            html += `<div>Feels like (C°)</div><div>${data.current.feelslike_c + "°"}</div>`

            html += `<div>Temperature (F)</div><div>${data.current.temp_f + "F"}</div>`

            html += `<div>Feels like (F)</div><div>${data.current.feelslike_f + "F"}</div>`

            html += `<div>Humidity (%)</div><div>${data.current.humidity + "%"}</div>`

            html += `<div>Wind direction</div><div>${data.current.wind_dir}</div>`

            html += `<div>Wind degree</div><div>${data.current.wind_degree + "°"}</div>`

            html += `<div>Wind speed</div><div>${data.current.wind_kph + "kph"}</div>`

            html += `<div>Clouds (%)</div><div>${data.current.cloud + "%"}</div>`

            html += `<div>Atm. pressure</div><div>${data.current.pressure_in + "inc"}</div>`

            html += `<div>Precipitation</div><div>${data.current.precip_mm + "mm"}</div>`

            return html
        }


        function stylizeElements(button, popUp) {
            button.css({
                'position': 'fixed',
                'width': '75px',
                'height': '75px',
                'bottom': '20px',
                'right': '30px',
                'z-index': '99',
                'border': 'none',
                'outline': 'none',
                'background-color': 'deepskyblue',
                'color': 'white',
                'cursor': 'pointer',
                'padding': '15px',
                'border-radius': '50%',
                'font-size': '18px',
                'background-image': 'url("https://cdn.iconscout.com/icon/free/png-512/weather-191-461610.png")',
                'background-size': 'cover',
                'opacity': '.75',
            })

            popUp.css({
                'display': 'none',
                'position': 'fixed',
                'width': '400px',
                'height': `400px`,
                'bottom': '120px',
                'right': '50px',
                'z-index': '99',
                'border': 'none',
                'outline': 'none',
                'background-color': 'deepskyblue',
                'color': 'white',
                'cursor': 'pointer',
                'padding': '15px',
                'opacity': '1',
                'border-radius': '15px',
                'font-size': '20px',
                'font-family': '"Epilogue", sans-serif',
                'text-align': 'center',
                'align-items': 'center',
                'background': 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url("https://i.pinimg.com/originals/dd/74/eb/dd74eb9aa00d78db0e02d9beb06e6de0.gif")',
                'background-size': 'cover',

                'grid-template-columns': '1fr 1fr'
            })
        }

        this.each(function () {
            main($(this));
        });
        return this;
    };
})(jQuery);