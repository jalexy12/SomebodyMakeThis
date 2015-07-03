my_sprockets_env = Sprockets::Environment.new
Firehose::Assets::Sprockets.configure my_sprockets_env
$firehose = Firehose::Client::Producer::Http.new('//127.0.0.1:7474')
