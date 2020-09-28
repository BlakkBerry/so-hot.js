# so-hot.js  🔥

Easy-to-use visual jQuery plugin, which can show weather wherever you live.

## Connect to HTML
1.  Open your HTML-page file.
2.  Connect so-hot.js before your main script but after jQuery.
        
        <script src="scripts/so_hot.js"></script>
3.  Add following tag down below:

        <button id="weatherButton" mode="default"></button>
        
4. You can also set amount of weather-info using *mode* attribute
    - "default"
    - "lite"
    - "extended"

## Connect to JS
1.  Open your main script file.
2.  Initialize your weather button block, which you made earlier

        $("#weatherButton").weatherInfo()

![Alt Text](https://github.com/BlakkBerry/so-hot.js/blob/media/so_hot.gif)
