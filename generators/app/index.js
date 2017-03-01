const Generator = require('yeoman-generator');

const BaseGenerator = require('../base.js');

const nodeConfig = require('../../package.json');

const fs = require('fs');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true, desc: 'Name of the generator' });
        this.argument('description', { type: String, required: true, desc: 'Description of the generator' });
        this.argument('organization', { type: String, required: true, desc: 'Name of the company or organization' });
        this.argument('namespace', { type: String, required: true, desc: 'Default namespace for code generation' });
        this.argument('author', { type: String, required: true, desc: 'Name and optional e-mail of the person or group to contact about the generator' });
    }

    configuring() {
        super.configuring();
    }

    writing() {

        this.logDebug('name', this.options.name);
        this.logDebug('description', this.options.description);
        this.logDebug('organization', this.options.organization);
        this.logDebug('namespace', this.options.namespace);
        this.logDebug('author', this.options.author);

        this.config.set('organization', this.options.organization);
        this.config.set('namespace', this.options.namespace);
        this.config.save();

        const name = 'generator-' + this.strings.filize(this.options.name, '.');

        nodeConfig.private = true;
        nodeConfig.license = "UNLICENSED";
        nodeConfig.name = name;
        nodeConfig.description = this.options.description;
        nodeConfig.author = this.options.author;

        const nodeJson = JSON.stringify(nodeConfig, null, 4);
        const packagePath = this.destinationPath('package.json');

        fs.writeFileSync(packagePath, nodeJson);

        this._copy('.gitignore');

        this._copy('.vscode/settings.json');
        
        this._copy('generators/base.js');
        
        this._copy('generators/StringUtility.js');
        this._copy('test/StringUtility.spec.js');

        this._copy('generators/service/index.js');
        this._generateAndCopy('test/service.spec.js', { generator: name });
        
        this._copy('generators/service/templates/.vscode/settings.json');
        this._copy('generators/service/templates/.gitignore');
        this._copy('generators/service/templates/manifest.yml');
        this._copy('generators/service/templates/gradlew');
        this._copy('generators/service/templates/gradlew.bat');
        this._copy('generators/service/templates/gradle.settings');
        this._copy('generators/service/templates/build.gradle');
        this._copy('generators/service/templates/gradle/wrapper/gradle-wrapper.jar');
        this._copy('generators/service/templates/gradle/wrapper/gradle-wrapper.properties');
        this._copy('generators/service/templates/src/integTest/java/com/example/service/BaseIntegrationTest.java');
        this._copy('generators/service/templates/src/integTest/java/com/example/service/IntegrationTest.java');
        this._copy('generators/service/templates/src/integTest/java/com/example/service/IntegrationTestCategory.java');
        this._copy('generators/service/templates/src/integTest/java/com/example/service/controllers/ExampleControllerIntegrationTests.java');
        this._copy('generators/service/templates/src/main/java/com/example/service/ExampleService.java');
        this._copy('generators/service/templates/src/main/java/com/example/service/controllers/ExampleController.java');
        this._copy('generators/service/templates/src/main/java/com/example/service/models/GreetingModel.java');
        this._copy('generators/service/templates/src/test/java/com/example/service/ExampleServiceTests.java');
        this._copy('generators/service/templates/src/test/java/com/example/service/controllers/ExampleControllerTests.java');
        this._copy('generators/service/templates/src/main/resources/application.yml');
        this._copy('generators/service/templates/src/main/resources/application-local.yml');
        this._copy('generators/service/templates/src/main/resources/application-integration.yml');
    }

    _copy(options) {

        const templatePath = typeof(options) === 'string' ? options : options.template;
        const destinationPath = typeof(options) === 'string' ? options : options.destination;

        const src = this.templatePath(templatePath);
        const tgt = this.destinationPath(destinationPath);

        this.logDebug('Copying file from source to target', src, tgt);
        this.fs.copy(src, tgt);
    }

    _generateAndCopy(options, args) {

        const templatePath = typeof(options) === 'string' ? options : options.template;
        const destinationPath = typeof(options) === 'string' ? options : options.destination;

        const src = this.templatePath(templatePath);
        const tgt = this.destinationPath(destinationPath);

        this.logDebug('Copying template from source and generating target', src, tgt);
        this.fs.copyTpl(src, tgt, args);
    }
};
