const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const _ = require('lodash');

function variablesWithPrefix(prefix, properties) {
    return _.map(properties, function(prop) {
        var to_ret_prop = prefix + prop.name + ': ' + (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value) + ';';

        if (prop.comment) to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
        return to_ret_prop;
    })
        .filter(function(strVal) {
        return !!strVal
    })
        .join('\n');
}

function fileHeader(options) {
    var to_ret = '';
    // for backward compatibility we need to have the user explicitly hide them
    var showFileHeader = (options) ? options.showFileHeader : true;
    if (showFileHeader) {
        to_ret += '/**\n';
        to_ret += ' * Do not edit directly\n';
        to_ret += ' * Generated on ' + new Date().toUTCString() + '\n';
        to_ret += ' */\n\n';
    }

    return to_ret;
}

StyleDictionary.registerFormat({
  name: 'custom/css/variables',
  formatter: function(dictionary, platform) {
    return fileHeader(this.options) + ':host {\n' + variablesWithPrefix(' --', dictionary.allProperties) + '\n}\n';
  }
});

console.log('')
console.log('Build started...');

// FINALLY, BUILD ALL THE PLATFORMS
const componentConfig = StyleDictionary.extend('./scripts/componentConfigDist.json');

componentConfig.buildAllPlatforms();
