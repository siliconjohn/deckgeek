#!/bin/bash
rm db/*.sqlite3
bundle exec rake db:migrate
bundle exec rake db:test:prepare
bundle exec rake db:seed
