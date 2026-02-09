
# image name is first argument or bamboo repo name
image=${1:-$bamboo_docker_image_name}
testContainer=$image-test-container

echo "[INFO]: Create Test Container"
docker rm -f $testContainer

# execute unit tests and linting
echo "[INFO]: Testing and Linting"
docker run --name $testContainer $image ash -c 'npm test && npm run lint; exit $?'

echo "[INFO]: Copy test coverage to host"
# for linux host
docker cp $testContainer:/data/coverage $(pwd)
