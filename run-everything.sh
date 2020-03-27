docker-compose -f db-stack.yml up -d
sleep 30s
cd timezone-search-api
npm install
nohup npm start &
cd ..
cd timezone-search-ui
npm install
npm start
