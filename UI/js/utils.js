//Auto collapse navbar when the screen is small enough to have a navbar
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(window).width() < 768 && $(e.target).is('a:not(.dropdown-toggle)')) {
        $(this).collapse('hide');
    }
});
$(document).on('click', 'body', function (e) {

    if ($(window).width() < 768) {
        $('.navbar-collapse.in').collapse('hide');
    }
});
var padNumber = function (taskNumber) {
    var str = "" + taskNumber;
    var pad = "0000"
    return pad.substring(0, pad.length - str.length) + str;
};

Date.prototype.toTimeOffsetString = function () {
    var date = this;
    return date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) +
        "T" +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2) +
        'Z';
};

Date.prototype.toDateString = function () {
    var date = this;
    return date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);

};

function odataToString(text, collection) {
    if (text != null && text != undefined && text != '') {
        var returnText = text.replace(' eq ', ' = ').replace(' lt ', ' < ').replace(' gt ', ' > ').replace('/', '.');
        if (collection != undefined) {
            returnText = collection + ' where ' + returnText;
        }
        return returnText;
    }
    else {
        return '';
    }
}

function odataOrClauseFromIdArray(array) {
    var tmp = '';
    for (var i = 0; i < array.length; i++) {
        tmp += ('id eq ' + array[i].id + ' or ');
    }
    if (array.length > 0) {
        tmp = tmp.substring(0, tmp.length - 4);
    }
    return tmp;
}


function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

var load = function (url, FunctionAfter) {
    var info;
    var ajaxCall = $.ajax({
        url: url,
        async: false,
        data: {},
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            info = response;
        },
        error: function (error) {
            var temp = error.error()
            if (error.statusText != 'abort') {
                console.log(error.responseText);
                info = error;
                throw error;
            }
        }
    });
    return info;
}

var fileExtension = function (fileName) {
    var a = fileName.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "none";
    }
    return a.pop().toLowerCase();
}

var authorizated = function authorizated(currentUser) {
    return !(currentUser.firstName == 'Unknown User');
}

function getNestedChildren(arr, parent) {
    var out = [];
    for (var i in arr) {
        if (arr[i].parent_Id == parent) {
            var children = getNestedChildren(arr, arr[i].id);
            if (children.length) {
                arr[i].children = children;
            }
            out.push(arr[i]);
        }
    }
    return out;
}
var regexIso8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;
    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
                try {
                    input[key] = new Date(value);
                }
                catch (e) {
                    var error = e;
                }
            }
        } else if (typeof value === "object") {
            // Recurs into object
            convertDateStringsToDates(value);
        }
    }
}

function SetCaretAtEnd(elem) {
    var elemLen = elem.value.length;
    // For IE Only
    if (document.selection) {
        // Set focus
        elem.focus();
        // Use IE Ranges
        var oSel = document.selection.createRange();
        // Reset position to 0 & then set at end
        oSel.moveStart('character', -elemLen);
        oSel.moveStart('character', elemLen);
        oSel.moveEnd('character', 0);
        oSel.select();
    }
    else if (elem.selectionStart || elem.selectionStart == '0') {
        // Firefox/Chrome
        elem.selectionStart = elemLen;
        elem.selectionEnd = elemLen;
        elem.focus();
    } // if
} // SetCaretAtEnd()

var getNumbers = (function () {
    //we create a closure so as not to expose some of our utility functions
    function isNumber(n) {
        //we check isFinite first since it will weed out most of the non-numbers
        //like mixed numbers and strings, which parseFloat happily accepts
        return isFinite(n) && !isNaN(parseFloat(n));
    }
    //let's get this one out as well
    //the simple sort() wouldn't work so instead we provide a sorter
    function sorterFunction(a, b) {
        return a - b;
    }
    //getNumbers should be this function
    return function (stringNumbers) {
        //variable declaration format is personal preference
        //but I prefer having declarations with assignments have individual vars
        //while those that have no assignments as comma separated
        var i, range, low, high, entry;
        //an added bonus, " and ' are the same in JS, but order still applies
        //I prefer to use ' since it's cleaner
        var entries = stringNumbers.split(',');
        var length = entries.length;
        var nums = [];
        for (i = 0; i < length; ++i) {
            entry = entries[i];
            if (isNumber(entry)) {
                //we check if the entry itself is a number. If it is, then we push it directly.
                //an additional advantage is that negative numbers are valid
                nums.push(+entry);
            } else {
                //if not a number, probably it had the - and not being a negative number
                //only here do we split after we determined that the entry isn't a number
                range = entry.split('-');
                //check if what we split are both numbers, else skip
                if (!isNumber(range[0]) || !isNumber(range[1])) continue;
                //force both to be numbers
                low = +range[0];
                high = +range[1];
                //since we are dealing with numbers, we could do an XOR swap
                //which is a swap that doesn't need a third variable
                //http://en.wikipedia.org/wiki/XOR_swap_algorithm
                if (high < low) {
                    low = low ^ high;
                    high = low ^ high;
                    low = low ^ high;
                }
                //from low, we push up to high
                while (low <= high) {
                    nums.push(low++);
                }
            }
        }
        return nums.sort(sorterFunction);
    }
}());

function filterItem(name, selected) {
    this.name = name;
    this.count = function () { return -1; };
    this.total = function () { return -1; };
    switch (arguments.length) {
        case 1:
            this.selected = true;
            this.value = name;
            break;
        case 2:
            this.selected = arguments[1];
            this.value = name;
            break;
        case 3:
            this.selected = arguments[1];
            this.value = arguments[2];
            break;
        case 4:
            this.selected = arguments[1];
            this.value = arguments[2];
            this.count = arguments[3];
            this.total = function () { return 222222 };
            break;
        case 5:
            this.selected = arguments[1];
            this.value = arguments[2];
            this.count = arguments[3];
            this.total = arguments[4];
            break;
    }
}