class valid {

    emailRegx(){
        return [/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']
    }
}
module.exports = new valid();