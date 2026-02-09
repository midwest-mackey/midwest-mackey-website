# build.sh

# image name is first argument or bamboo repo name
image=${1:-$bamboo_docker_image_name}
testContainer=$image-test-container
buildContainer=$image-build-container

echo "[INFO]: Removing old images, Creating new images"
docker rmi -f $image
docker rm -f $testContainer
docker rm -f $buildContainer
docker build -t $image .
