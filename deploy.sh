#!/usr/bin/env sh

# abort on errors
set -e


# build
npm run build

# navigate into the build output directory
#cd docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

#git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git remote add origin https://github.com/econraddiao/econraddiao.github.io.git
#git branch -M main
#git push -u origin main
#git push -f git@github.com:econradddiao/econraddiao.github.io.git main
git push
# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -