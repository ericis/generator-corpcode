
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const StringUtility = require('../generators/StringUtility');

describe('StringUtility', () => {

    const strings = new StringUtility();

    describe('pascal', () => {

        it('spaces', () => {
            assert.equal('MyName', strings.pascalize('  My Name      '));
        });

        it('hyphenated', () => {
            assert.equal('MyName', strings.pascalize('my-name'));
        });

        it('dotted', () => {
            assert.equal('MyName', strings.pascalize('my.name'));
        });

        it('special chars', () => {
            assert.equal('MyName', strings.pascalize('my`~!@#$%^&*()-_=+"\';:/?.>,<NAME'));
        });
    });

    describe('camel', () => {

        it('spaces', () => {
            assert.equal('myName', strings.camelize('   My Name      '));
        });
        
        it('hyphenated', () => {
            assert.equal('myName', strings.camelize('My-name'));
        });

        it('dotted', () => {
            assert.equal('myName', strings.camelize('My.name'));
        });

        it('special chars', () => {
            assert.equal('myName', strings.camelize('My`~!@#$%^&*()-_=+"\';:/?.>,< Name'));
        });
    });

    describe('file', () => {

        it('spaces', () => {
            assert.equal('my-name', strings.filize('   My Name      '));
        });
        
        it('hyphenated', () => {
            assert.equal('my-name', strings.filize('My-name'));
        });

        it('dotted', () => {
            assert.equal('my-name', strings.filize('My.name'));
        });

        it('special chars', () => {
            assert.equal('my-name', strings.filize('My`~!@#$%^&*()-_=+"\';:/?.>,< Name'));
        });
    });
});
