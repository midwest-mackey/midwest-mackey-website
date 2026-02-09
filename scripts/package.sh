# image name is first argument or bamboo repo name
image=${1:-$bamboo_docker_image_name}
testContainer=$image-test-container
buildContainer=$image-build-container

# get exitcode from tests container
exitcode=$(docker inspect $testContainer --format='{{.State.ExitCode}}')

# don't package if tests fail
if [ $exitcode -eq 0 ]; then
  echo "[INFO]: Tests and Linting Finished"
else
  echo "[INFO]: Tests and Linting Failed"; exit $exitcode;
fi

echo '[INFO]: Create build container'
docker rm -f $buildContainer

echo "[INFO]: Building code"
docker run --name $buildContainer $image

echo "[INFO]: Copy build output to host"
docker cp $buildContainer:/data/dist $(pwd)

echo "[INFO]: Copy deploy scripts to host"
docker cp $buildContainer:/data/scripts/deploy $(pwd)
