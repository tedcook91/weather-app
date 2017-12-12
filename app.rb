require 'sinatra'


set :bind, '0.0.0.0'

get '/' do
  File.read('public/index.html')
end
