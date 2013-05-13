#!/bin/bash
rm *.sqlite3
rake db:migrate
rake db:seed
