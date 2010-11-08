
require.paths.unshift('spec', '/usr/local/Cellar/ruby/1.9.2-p0/lib/ruby/gems/1.9.1/gems/jspec-4.3.3/lib', 'lib')
require('jspec')
require('unit/spec.helper')
require('bejumble-core.js')

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
