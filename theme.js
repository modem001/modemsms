/*
========================================================
MODEM TECHNOLOGIES
GLOBAL THEME SYSTEM
========================================================

Use this file on every Modem page.

Dark / Light mode is saved in localStorage.

Any page can use:

ModemTheme.get()

ModemTheme.set("dark")

ModemTheme.set("light")

ModemTheme.toggle()

The current theme is available through:

document.documentElement.dataset.theme

Example:

html[data-theme="dark"]
html[data-theme="light"]

========================================================
*/

(function(){

    "use strict";


    const STORAGE_KEY =
        "modem_theme";


    const DARK =
        "dark";

    const LIGHT =
        "light";


    function getSavedTheme(){

        try{

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if(
                saved === DARK ||
                saved === LIGHT
            ){

                return saved;

            }

        }catch(error){

            console.warn(
                "Theme storage unavailable.",
                error
            );

        }


        /*
        Default theme.

        Modem Technologies starts
        with Dark Mode.
        */

        return DARK;

    }


    function apply(theme){

        if(
            theme !== DARK &&
            theme !== LIGHT
        ){

            theme = DARK;

        }


        document
            .documentElement
            .setAttribute(
                "data-theme",
                theme
            );


        document
            .documentElement
            .classList
            .remove(
                DARK,
                LIGHT
            );


        document
            .documentElement
            .classList
            .add(
                theme
            );


        try{

            localStorage.setItem(
                STORAGE_KEY,
                theme
            );

        }catch(error){

            console.warn(
                "Could not save theme.",
                error
            );

        }


        updateThemeButtons(
            theme
        );


        window.dispatchEvent(
            new CustomEvent(
                "modem-theme-change",
                {
                    detail:{
                        theme:theme
                    }
                }
            )
        );

    }


    function updateThemeButtons(theme){

        const buttons =
            document.querySelectorAll(
                "[data-theme-toggle]"
            );


        buttons.forEach(
            function(button){

                if(theme === DARK){

                    button.innerHTML =
                        "☀";

                    button.setAttribute(
                        "aria-label",
                        "Switch to light mode"
                    );

                }else{

                    button.innerHTML =
                        "◐";

                    button.setAttribute(
                        "aria-label",
                        "Switch to dark mode"
                    );

                }

            }
        );

    }


    function get(){

        return (
            document
                .documentElement
                .getAttribute(
                    "data-theme"
                )
            || getSavedTheme()
        );

    }


    function set(theme){

        apply(theme);

    }


    function toggle(){

        const current =
            get();

        apply(
            current === DARK
            ? LIGHT
            : DARK
        );

    }


    /*
    Apply theme immediately.
    */

    apply(
        getSavedTheme()
    );


    /*
    Public API.
    */

    window.ModemTheme = {

        get:get,

        set:set,

        toggle:toggle,

        dark:DARK,

        light:LIGHT

    };


    /*
    Automatically connect buttons
    that use:

    data-theme-toggle
    */

    document.addEventListener(
        "click",
        function(event){

            const button =
                event.target.closest(
                    "[data-theme-toggle]"
                );


            if(!button){

                return;

            }


            toggle();

        }
    );


})();
