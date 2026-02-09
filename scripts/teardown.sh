# cleanup of all images and containers

# image name is first argument or bamboo repo name
image=${1:-$bamboo_docker_image_name}
testContainer=$image-test-container
buildContainer=$image-build-container

echo "[INFO]: Removing all images"
docker rm -f $testContainer
docker rm -f $buildContainer
docker rmi -f $image
