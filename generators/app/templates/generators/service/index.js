const Generator = require('yeoman-generator');

const BaseGenerator = require('../base.js');

const GeneratorConfig = require('../../.yo-rc.json');

module.exports = class extends BaseGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true, desc: 'Name of the service' });
        this.argument('namespace', { type: String, required: false, default: GeneratorConfig.namespace + '.service', desc: 'Code package namespace' });
        this.argument('gradle-proxy', { type: String, required: false, default: '', desc: 'Gradle proxy for the service' });
        
        this.option('security', { type: Boolean, default: true, desc: 'Use this flag to exclude Spring Security' });

        this.option('cf', { type: Boolean, default: false, desc: 'Generate a Cloud Foundry deployment file' });
        this.argument('cf-domain', { type: String, required: false, default: 'mybluemix.net', desc: 'Cloud Foundry deployment name' });
        this.argument('cf-buildpack', { type: String, required: false, default: 'liberty-for-java', desc: 'Cloud Foundry deployment buildpack name' });
    }

    configuring() {
        super.configuring();
    }

    writing() {

        let serviceName = this.options.name;

        if (!(/service$/i.test(serviceName))) {
            serviceName += '-service';
        }

        const namespaceName = this.strings.filize(this.options.namespace, '.').replace('.service', '') + '.service';
        const packageName = namespaceName + '.' + this.strings.filize(serviceName, '.').replace('.service', '');
        const pascal = this.strings.pascalize(serviceName);
        const camel = this.strings.camelize(serviceName);

        const args = {
            names: {
                original: this.options.name,
                pascal: pascal,
                camel: camel,
                fs: this.strings.filize(serviceName)
            },
            namespace: namespaceName,
            package: packageName
        };

        this.logDebug(args);

        // gradle

        this._copy('gradlew');
        this._copy('gradlew.bat');
        this._copy('gradle/wrapper/gradle-wrapper.jar');
        this._copy('gradle/wrapper/gradle-wrapper.properties');

        this._generateAndCopy('build.gradle', {
            name: this.strings.filize(this.options.namespace, '.').replace('.service', '') + args.names.fs,
            security: this.options.security
        });

        if (this.options['gradle-proxy']) {
            this._generateAndCopy('gradle.settings', { proxy: this.options['gradle-proxy'] });
        }

        // editors
        this._copy('.vscode/settings.json');

        // java source files

        const javaFiles = [
            { template: '/ExampleService.java', destination: '/' + args.names.pascal + '.java' }, 
            '/controllers/ExampleController.java', 
            '/models/GreetingModel.java'];

        javaFiles.forEach(javaFile => {

            this.logDebug('javaFile', javaFile);
            
            const template = typeof(javaFile) === 'string' ? javaFile : javaFile.template;
            const destination = typeof(javaFile) === 'string' ? javaFile : javaFile.destination;
            
            const templatePath = 'src/main/java/com/example/service' + template;
            const packageFilePath = args.package.replace(/[.]/gi, '/');
            const javaFilePath = 'src/main/java/' + packageFilePath;
            const destinationPath = javaFilePath + destination;

            this.logDebug('templatePath', templatePath);
            this.logDebug('packageFilePath', packageFilePath);
            this.logDebug('javaFilePath', javaFilePath);
            this.logDebug('destinationPath', destinationPath);

            // java
            this._generateAndCopy({ template: templatePath, destination: destinationPath }, {
                package: args.package,
                name: args.names.pascal
            });
        });

        const unitTestFiles = [
            { template: '/ExampleServiceTests.java', destination: '/' + args.names.pascal + 'Tests.java' },
            '/controllers/ExampleControllerTests.java'];

        unitTestFiles.forEach(unitTestFile => {

            this.logDebug('unitTestFile', unitTestFile);
            
            const template = typeof(unitTestFile) === 'string' ? unitTestFile : unitTestFile.template;
            const destination = typeof(unitTestFile) === 'string' ? unitTestFile : unitTestFile.destination;
            
            const templatePath = 'src/test/java/com/example/service' + template;
            const packageFilePath = args.package.replace(/[.]/gi, '/');
            const unitTestFilePath = 'src/test/java/' + packageFilePath;
            const destinationPath = unitTestFilePath + destination;

            this.logDebug('templatePath', templatePath);
            this.logDebug('packageFilePath', packageFilePath);
            this.logDebug('unitTestFilePath', unitTestFilePath);
            this.logDebug('destinationPath', destinationPath);

            // java
            this._generateAndCopy({ template: templatePath, destination: destinationPath }, {
                package: args.package,
                name: args.names.pascal
            });
        });

        const integrationTestFiles = [
            '/BaseIntegrationTest.java',
            '/IntegrationTest.java',
            '/IntegrationTestCategory.java',
            '/controllers/ExampleControllerIntegrationTests.java'];

        integrationTestFiles.forEach(integrationTestFile => {

            this.logDebug('integrationTestFile', integrationTestFile);
            
            const template = typeof(integrationTestFile) === 'string' ? integrationTestFile : integrationTestFile.template;
            const destination = typeof(integrationTestFile) === 'string' ? integrationTestFile : integrationTestFile.destination;
            
            const templatePath = 'src/integTest/java/com/example/service' + template;
            const packageFilePath = args.package.replace(/[.]/gi, '/');
            const integrationTestFilePath = 'src/integTest/java/' + packageFilePath;
            const destinationPath = integrationTestFilePath + destination;

            this.logDebug('templatePath', templatePath);
            this.logDebug('packageFilePath', packageFilePath);
            this.logDebug('integrationTestFilePath', integrationTestFilePath);
            this.logDebug('destinationPath', destinationPath);

            // java
            this._generateAndCopy({ template: templatePath, destination: destinationPath }, {
                package: args.package,
                name: args.names.pascal
            });
        });

        const resourceFiles = [
            '/application-integration.yml',
            '/application-local.yml',
            '/application.yml'];

        resourceFiles.forEach(resourceFile => {

            this.logDebug('resourceFile', resourceFile);
            
            const filePath = 'src/main/resources' + resourceFile;

            this.logDebug('filePath', filePath);
            
            this._generateAndCopy(filePath, {
                name: args.names.fs
            });
        });
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
