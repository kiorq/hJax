$(document).ready(function() {

    var hJax = function() {
        return "hJax (" + hJax._available.join(", ") + ")"
    }

    hJax._available = []

    hJax._update_status_element = function($hjax, new_status) {
        var status_element_selector = "[data-hjax-status=" + new_status + "]"
        $hjax.find(status_element_selector).show();
        $hjax.find("[data-hjax-status]:not(" + status_element_selector + ")").hide();

    }

    hJax.update_status = function(hjax_name, new_status) {
        $hjax = $("[data-hjax=" + hjax_name + "]")
        hJax._update_status_element($hjax, new_status)
    }



    hJax.init_hjax_status_selements = function() {
        $("[data-hjax]:not([data-hjax-initiated])").each(function(pos) {
            var $hjax = $(this)
            var initial_status = $hjax.attr("data-hjax-status-initial") || "default"
            var hjax_name = $hjax.attr("data-hjax")
            var of_many = $hjax.attr("data-hjax-of-many") == "true"

            if (hJax._available.indexOf(hjax_name) > -1 && !of_many) {
                // check for duplicates
                console.warn("[hJax] Duplicate found: " + hjax_name +"\nMay consider using the `[data-hjax-of-many=true]` attribute." )
                return null
            }

            hJax._available.push(hjax_name)
            hJax._update_status_element($hjax, initial_status)
            $hjax.attr("data-hjax-initiated", true)
        })
    }

    hJax.init_hjax_links = function() {
        $("a[data-hjax-target]").click(function(e) {
            e.preventDefault()
            var $this = $(this)
            var href = $this.attr("href")
            var target = $this.attr("data-hjax-target")

            hJax.update_status(target, "submitted")
            setTimeout(function() {
                $.ajax({
                    type: "GET",  
                    url: href,
                    success: function() {  
                        hJax.update_status(target, "done")
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        hJax.update_status(target, "failure")
                    }       
                });
            }, 500)
        })
    }

    hJax.init = function() {
        hJax.init_hjax_status_selements()
        hJax.init_hjax_links()
    }

    // set to window
    window.hJax = hJax
    // init
    window.hJax.init()
})