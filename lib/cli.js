var cli = require('cli'),
    Agent = require('./agent');

cli.parse({
  host:    ['h', 'Redis sentinel hostname', 'string', '172.19.111.20'],
  port:    ['p', 'Redis sentinel port number', 'number', 26379],
  config:  ['f', 'Path to twemproxy config', 'path', '/etc/twemproxy/conf/22121.yml'],
  cmd_res: ['c', 'Command to restart twemproxy', 'string', '/etc/init.d/twemproxy restart'],
  cmd_not: ['n', 'Command to send notification', 'string', '/usr/bin/local/mandril $SYSADMIN_EMAIL $RT_AGENT_SUBJECT $RT_AGENT_MESSAGE'],
  log:	   ['l', 'The log file location', 'string', '/var/log/twemproxy/twemproxy_sentinel.log']
});

cli.main(function (args, options) {
  var config = { nutcracker_config_file:  options.config,
                 redis_sentinel_ip:       options.host,
                 redis_sentinel_port:     options.port,
                 restart_command:         options.cmd_res, 
                 notify_command:          options.cmd_not, 
		             log_file:                options.log };

  Agent.bootstrap(config);
});
