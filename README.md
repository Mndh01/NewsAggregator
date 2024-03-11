## There are two ways to run the project:

-- first one is to clone the project from github and run it using the link with the commands below:

git clone https://github.com/Mndh01/NewsAggregator.git

npm install

npm start

-- second one is to use the docker image of the project on docker using the following commands:

docker pull mndh01/blogly:latest

docker run -p 3000:3000 -d mndh01/blogly

Then you can access the project on "http://localhost:3000" in your browser.