import fs from "fs"

let unstop = JSON.parse(fs.readFileSync("./unstop.json","utf-8"));
let devfolio = JSON.parse(fs.readFileSync("./devfolio.json","utf-8"));
let hacks = JSON.parse(fs.readFileSync("./hack.json","utf-8"));
let h2s = JSON.parse(fs.readFileSync("./h2s.json","utf-8"));

// console.log(unstop[0]["data"]["data"].length);

for(const evnt of unstop["data"]["data"]){
    let skills = [];
    if(evnt["required_skills"].length!=0){
        for(let  i = 0 ; i < evnt["required_skills"].length ; i++){
            skills.push(evnt["required_skills"][i]["skill"]);
        }
    }
    hacks.push({
        "evnt_name":evnt["title"],
        "reg_started":evnt["regnRequirements"]["start_regn_dt"],
        "reg_ended":evnt["regnRequirements"]["end_regn_dt"],
        "paid":evnt["isPaid"],
        "location":evnt["region"],
        "site":evnt["seo_url"],
        "logo_url":evnt["logoUrl2"],
        "visibility":evnt["visibility"],
        "skills":skills,
        "min_team_size":evnt["regnRequirements"]["min_team_size"],
        "max_team_size":evnt["regnRequirements"]["max_team_size"]
    })
    // console.log(hacks)
    // break;
}


// console.log(devfolio[0]["pageProps"]["dehydratedState"]["queries"][0]["state"]["data"]["open_hackathons"].length);

if (devfolio["pageProps"]!==undefined) { 
  for(const evnt of devfolio["pageProps"]?.["dehydratedState"]?.["queries"]?.[0]?.["state"]?.["data"]?.["open_hackathons"]){
      let skills = [];
      if(evnt["themes"].length!=0){
          for(let  i = 0 ; i < evnt["themes"].length ; i++){
              skills.push(evnt["themes"][i]["theme"]["name"]);
          }
      }
      hacks.push({
          "evnt_name":evnt["name"],
          "reg_started":evnt["settings"]["reg_ends_at"],
          "reg_ended":evnt["settings"]["reg_ends_at"],
          "paid":evnt["isPaid"],
          "location":evnt["is_online"] || "false",
          "site":evnt["settings"]["site"] || "https://devfolio.co/hackathons",
          "logo_url":evnt["settings"]["featured_cover_img"] ,
          "visibility":evnt["visibility"] || "true",
          "skills":skills,
          "min_team_size":evnt["regnRequirements"]?.["min_team_size"],
          "max_team_size":evnt["regnRequirements"]?.["max_team_size"]
      })
      // console.log(hacks2)
      // break;
  }
}

for(const evnt of h2s["data"]){
    let skills = [];
    hacks.push({
        "evnt_name":evnt["title"],
        "reg_started":evnt["registrationStart"],
        "reg_ended":evnt["registrationEnd"],
        "paid":evnt["ticket"],
        "location":evnt["mode"],
        "site":`https://hack2skill.com/event/${evnt["eventUrl"]}`,
        "logo_url":evnt["thumbnail"],
        "visibility":evnt["visibility"] || "true",
        "skills":skills,
        "min_team_size":evnt["participation"],
        "max_team_size":evnt["regnRequirements"]?.["max_team_size"]
    })
}


fs.writeFileSync("./hack.json",JSON.stringify(hacks))