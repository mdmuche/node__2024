const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches);
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    launch.target
  ) {
    return res.status(400).json({ erro: "missing required launch propery" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  //if launch doesn't exists
  if (!existsLaunchWithId(launchId)) {
    res.status(404).json({
      error: "launch doesn't exists",
    });
  }

  //if launch exist
  res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
