const sodium = require('libsodium-wrappers')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app, { getRouter }) => {
  // Your code here
  
  const router = getRouter("/ghass");
  router.use(require("express").static("public"));
  router.use(require("express").json());


  router.post("/octokit", async (req, res) => {
    try {
      // Root installation ID is: 44652407
      const octokit = await app.auth(44652407)
      const { data } = await octokit.apps.getAuthenticated()

      res.json(data)
    } catch (error) {
      console.error(error)
      res.json({"message": "/dsync failed"})
    }
  });


  // UNSAFE!! Payload is not yet encrypted on POST. Need to encrypt it locally with Org Public Key
  router.post("/dsync", async (req, res) => {
    try {
      const octokit = await app.auth(44652407)
      const payload = req.body

      const owner = "flinnsolutions"
      const repo = "gha-secret-sync-test"
      const repoId = 726204636
      const env = "prod"

      const data = {
        "orgPublicKey": await octokit.rest.actions.getOrgPublicKey({org: owner}),
        "repoPublicKey": await octokit.rest.actions.getRepoPublicKey({owner: owner, repo: repo}),
        "envPublicKey": await octokit.rest.actions.getEnvironmentPublicKey({repository_id: repoId, environment_name: env})
      }

      res.json(data);
    } catch (error) {
      console.error(error)
      res.json({"message": "/dsync failed"})
    }
  });

  app.log.info("Yay, the app was loaded!");
};
