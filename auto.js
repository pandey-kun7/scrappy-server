import child_process from "child_process"
import "dotenv/config"
import cron from "node-cron"

export function serverFlow() { 
  child_process.spawn("curl.exe", [`${process.env.UNSTOP_HACKATHONS_JSON_URL}`,"-o", "unstop.json"]);
  child_process.spawn("curl.exe", [`${process.env.DEVFOLIO_HACKATHONS_JSON_URL}`,"-o", "devfolio.json"]);
  child_process.spawn("curl.exe", [`${process.env.HACK2SKILL_HACKATHONS_JSON_URL}`,"-o", "h2s.json"]);
  child_process.spawn("node" ,["hacks.js"]);
}

// serverFlow();

export default function autoDataFill() { 
  try {
    cron.schedule("*/1 * * * *", () => { 
      console.log("Running scraper...");
      serverFlow();
    })
  } catch (err) { 
    console.log(`ERROR IN autoDataFill: ${err.message}`);
  }
}