npm create vite@latest dummy-crm-client -- --template react-ts

  cd dummy-crm-client
  npm install
  npm run dev

npm run build
docker build -t dummy-crm-vite-app .
docker tag dummy-crm-vite-app localhost:32000/dummy-crm-vite-app:latest
docker push localhost:32000/dummy-crm-vite-app:latest
microk8s kubectl rollout restart deploy dummy-crm-vite-nginx-app -n dummy-crm-namespace
-----------------

https://erp.mydomain.com/

-----------------
npm install react-bootstrap
npm install react-icons
npm install react-query ??????
npm install dayjs
npm install bootswatch
npm install bootstrap
npm install prettier --save-dev

npm install --save react@18 react-dom@18
npm install --save react-bootstrap@2
npm install --save typescript@5
npm install --save-dev typescript-eslint
npm install --save-dev @types/react@18 @types/react-dom@18
npm install --save-dev @eslint/js eslint eslint-plugin-react-refresh
npm install --save-dev globals prettier
npm install --save react-router-dom@6
npm install --save vite@6
----------

npm outdated

npm add -D sass-embedded
