module.exports = class StringUtility {

    pascalize(str) {
        return str.trim().replace(/(\w)(\w*)/g, function(g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        }).replace(/[^0-0a-z]/gi, '');
    }

    camelize(str) {
        return str.trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return '';

            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        }).replace(/[^0-0a-z]/gi, '');
    }

    filize(str, separator) {

        if (!separator) {
            separator = '-';
        }

        return str.trim().toLowerCase().replace(/[-.]+/g, " ").replace(/[^0-0a-z\s]/gi, '').replace(/[\s]+/g, separator);
    }
};
