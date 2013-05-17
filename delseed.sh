#!/bin/bash
rm db/*.sqlite3
rake db:migrate
rake db:seed
