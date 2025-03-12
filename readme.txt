npm create vite@latest dummy-corp-erp-client -- --template react-ts

  cd dummy-corp-erp-client
  npm install
  npm run dev

npm run build
docker build -t vite-nginx-app .
docker tag vite-nginx-app localhost:32000/dummy-corp-erp-vite-app:latest
docker push localhost:32000/dummy-corp-erp-vite-app:latest
microk8s kubectl rollout restart deploy dummy-corp-erp-vite-nginx-app -n dummy-corp-erp-namespace
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
