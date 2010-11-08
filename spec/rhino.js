
load('/usr/local/Cellar/ruby/1.9.2-p0/lib/ruby/gems/1.9.1/gems/jspec-4.3.3/lib/jspec.js')
load('/usr/local/Cellar/ruby/1.9.2-p0/lib/ruby/gems/1.9.1/gems/jspec-4.3.3/lib/jspec.xhr.js')
load('lib/bejumble-core.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()